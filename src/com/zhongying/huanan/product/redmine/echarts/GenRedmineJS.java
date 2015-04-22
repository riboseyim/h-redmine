package com.zhongying.huanan.product.redmine.echarts;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.zhongying.huanan.product.echarts.util.EChartsUtil;
import com.zhongying.huanan.product.redmine.util.DBConn;
import com.zhongying.huanan.product.redmine.util.ReadFile;
import com.zhongying.huanan.product.redmine.util.RedmineConfig;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class GenRedmineJS {
	public static void main(String[] args) {

		 UpdateRedmineIndexHTML_Month();

		// test();
	}

	public static void UpdateRedmineIndexHTML_Month() {
		ReadFile config = ReadFile.getInstance();
		Properties sysprop = config.getConfigFile(RedmineConfig.configFile);

		String beginDate = EChartsUtil.getMonthFirstDay();
		String endDate = EChartsUtil.getMonthLastDay();

		Properties prop = new Properties();
		prop.put("beginDate", beginDate);
		prop.put("endDate", endDate);
		prop.put("areaLimit", sysprop.get("areaLimitMonth"));

		UpdateRedmineIndexHTML(prop);

	}

	public static void UpdateRedmineIndexHTML(Properties prop) {

		Connection con = null;
		try {
			System.err.println("UpdateRedmineIndexHTML  begin ....");
			DBConn db = new DBConn();
			con = db.getDirectConn();
			System.err.println("UpdateRedmineIndexHTML  get db conn finished ....");

			String OutputDIR = RedmineConfig.EchartsAppDir;
			String TemplateDIR = OutputDIR + File.separator + "ftl";

			Map<String, Object> paramMap;

			// =================================================================================

			 paramMap = loadIndexProjectPie(prop, con);
			 buildStandCharts("index_project_pie","",paramMap);

			 paramMap = loadIndexProjectPieNums(prop, con);
			 paramMap.put("index_project_pie_name", "项目任务数");
			 buildStandCharts("index_project_pie_numbers","",paramMap);

			// =================================================================================
			 paramMap = loadIndexTracePie(prop, con);
			 buildStandCharts("index_trace_pie","", paramMap);

			// =================================================================================

			// ======================================人员分成功（取消）===========================================
			// paramMap = loadIndexUserTraceBar(prop, con);
			// buildStandCharts("index_user_trace_bar","", paramMap);

			// ========================================总量合格率(取消)=================================
			// paramMap = loadIndexUserTotalBar(prop, con);
			// buildStandCharts("index_user_total_bar","", paramMap);

			// ========================================总量成分堆积===============================
			 paramMap = loadIndexUserTotalBarItem(prop, con);
			 buildStandCharts("index_user_total_bar_item","", paramMap);
			
			GenRedmineService service = new GenRedmineService();

			String projectids=service.queryTopProjectIds(6, prop, con);
			
			Properties topProjectTrace=new Properties();
			topProjectTrace=(Properties) prop.clone();
			
			topProjectTrace.put("projectLimit", projectids);
			
			 paramMap = loadIndexProjectBarItem(prop, con);
			 buildStandCharts("index_project_trace_bar_item","", paramMap);
				
			 paramMap = loadIndexProjectUserBarItem(prop, con);
			 buildStandCharts("index_project_user_bar_item","", paramMap);
				
			
			 paramMap = loadIndexCaseFromReasonBarItem(topProjectTrace, con);
			 buildStandCharts("index_case_fromreason_bar_item","", paramMap);
			

			buildIndexMainJS(OutputDIR, TemplateDIR);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.releaseConnection(con);// /释放
		}
	}


	public static void buildIndexMainJS(String OutputDIR, String TemplateDIR) {
		String ChartName = "index_main";
		String TEMPLATENAME = ChartName + ".ftl";

		String filepath = OutputDIR + File.separator + ChartName + ".js";

		List chartsList = new ArrayList();

		chartsList.add("index_trace_pie");
		chartsList.add("index_project_pie");
		chartsList.add("index_project_pie_numbers");
		chartsList.add("index_project_trace_bar_item");
		chartsList.add("index_project_user_bar_item");
		
		chartsList.add("index_project_casefrom_bar_item");
		
		chartsList.add("index_case_fromreason_bar_item");
		
		chartsList.add("index_user_total_bar_item");

		//chartsList.add("index_user_trace_bar");
		//chartsList.add("index_user_total_bar");

		List<Map> connectList = new ArrayList<Map>();
		HashMap connect = new HashMap();
		connect.put("source", "index_trace_pie" + "_chart");
		connect.put("target", "index_user_total_bar_item" + "_chart");
		connectList.add(connect);

		connect = new HashMap();
		connect.put("source", "index_user_total_bar_item" + "_chart");
		connect.put("target", "index_trace_pie" + "_chart");

		//connectList.add(connect);

		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("chartsList", chartsList);
		paramMap.put("connectList", connectList);

		execTemplate(paramMap, TemplateDIR, TEMPLATENAME, filepath);
	}

	public static void buildStandCharts(String ChartName, String ChartIndex, Map<String, Object> paramMap) throws Exception {
		String OutputDIR = RedmineConfig.EchartsAppDir;

		String TemplateDIR = OutputDIR + File.separator + "ftl";

		String TEMPLATENAME = ChartName + ".ftl";

		String filepath = "";

		if (ChartIndex != null && "".equals(ChartIndex) == false) {
			filepath = OutputDIR + File.separator + ChartName + "_" + ChartIndex + ".js";
		} else {
			filepath = OutputDIR + File.separator + ChartName + ".js";
		}

		execTemplate(paramMap, TemplateDIR, TEMPLATENAME, filepath);
	}

	/**
	 * 加载数据loadIndexProjectPie
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexProjectPie(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_project_pie_name = "项目占比";
		String index_project_pie_keys = "";
		String index_project_pie_values = "";

		GenRedmineService service = new GenRedmineService();

		List<HashMap> projectHoursList = service.queryProjectHours(prop, con);

		for (int i = 0; i < projectHoursList.size(); i++) {
			HashMap obj = (HashMap) projectHoursList.get(i);

			index_project_pie_keys += "'" + obj.get("projectname") + "'";
			index_project_pie_values += "{value:" + obj.get("totalhours") + "," + "name:'" + obj.get("projectname") + "'" + "}";

			if (i < projectHoursList.size() - 1) {
				index_project_pie_keys += ",";
				index_project_pie_values += ",";
			}
		}

		paramMap.put("index_project_pie_name", index_project_pie_name);
		paramMap.put("index_project_pie_keys", index_project_pie_keys);
		paramMap.put("index_project_pie_values", index_project_pie_values);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexProjectPie
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexProjectPieNums(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_project_pie_keys = "";
		String index_project_pie_values = "";

		GenRedmineService service = new GenRedmineService();

		List<HashMap> projectHoursList = service.queryProjectHours(prop, con);

		for (int i = 0; i < projectHoursList.size(); i++) {
			HashMap obj = (HashMap) projectHoursList.get(i);

			index_project_pie_keys += "'" + obj.get("projectname") + "'";
			index_project_pie_values += "{value:" + obj.get("totalnums") + "," + "name:'" + obj.get("projectname") + "'" + "}";

			if (i < projectHoursList.size() - 1) {
				index_project_pie_keys += ",";
				index_project_pie_values += ",";
			}
		}

		paramMap.put("index_project_pie_keys", index_project_pie_keys);
		paramMap.put("index_project_pie_values", index_project_pie_values);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexProjectBarItem 
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexProjectBarItem(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_item_name = "项目成分";
		String index_user_bar_item_usernames = "";
		String index_user_bar_item_keys = "";
		String index_user_bar_item_data = "";
		String index_user_bar_item_yAxis = "";

		index_user_bar_item_yAxis += "{";
		index_user_bar_item_yAxis += "type : 'value',";
		index_user_bar_item_yAxis += "name : '总工时',";
		index_user_bar_item_yAxis += "axisLabel : {";
		index_user_bar_item_yAxis += "formatter : '{value} h'";
		index_user_bar_item_yAxis += "}";
		index_user_bar_item_yAxis += "}";

		System.out.println("loadIndexTopProjectBarItem  query data begin ....");

		GenRedmineService service = new GenRedmineService();

		HashMap userhoursMap = service.queryProjectTraceHours(prop, con);

		index_user_bar_item_keys = (String) userhoursMap.get("project_names");

		index_user_bar_item_usernames = (String) userhoursMap.get("trace_names");

		System.out.println("loadIndexTopProjectBarItem  query data finished ....");

		int rgba1 = 80;
		int rgba2 = 120;
		int rgba3 = 2;
		int rgba4 = 1;

		List<Map> lineList = new ArrayList<Map>();

		String[] projectList = index_user_bar_item_keys.replace("'","").split(",");
		String[] traceList = index_user_bar_item_usernames.replace("'","").split(",");

		for (int j = 0; j < traceList.length; j++) {

			String tracename = (String) traceList[j];

			index_user_bar_item_yAxis += ",{";
			index_user_bar_item_yAxis += "type : 'value',";
			index_user_bar_item_yAxis += "name : '数量',";
			index_user_bar_item_yAxis += "axisLabel : {";
			index_user_bar_item_yAxis += "formatter : '{value} 个'";
			index_user_bar_item_yAxis += "}";
			index_user_bar_item_yAxis += "}";

			String thisNodeData = "{ \n";
			thisNodeData += " name:'" + tracename + "',";
			thisNodeData += " type:'bar',";
			thisNodeData += "   tooltip : {trigger: 'item'},";
			thisNodeData += "    stack: '总工时',";
			thisNodeData += "itemStyle : {";
			thisNodeData += "	normal : {";
			thisNodeData += "		color : 'rgba(" + rgba1 + "," + rgba2 + "," + rgba3 + "," + rgba4 + ")',";
			thisNodeData += "		label : {";
			// thisNodeData += "			show : true,position:'inside',";
			thisNodeData += "			show : false,";

			thisNodeData += "			textStyle : {";
			thisNodeData += "				color : '#27727B'";
			thisNodeData += "			}";
			thisNodeData += "		}";
			thisNodeData += "	}";
			thisNodeData += "},";

			rgba1 += 100;
			rgba2 += 80;
			//rgba3 += 50;
			//rgba4 += 40;

			thisNodeData += "   \n data:[";

			String lineDataValues = "";

			for (int i = 0; i < projectList.length; i++) {
				String projectname = projectList[i];

				String hours = (String) userhoursMap.get( projectname+tracename + "totalhours");
				if (hours == null || "".equals(hours)) {
					hours = "0";
				}

				thisNodeData += hours;

				String nums = (String) userhoursMap.get( projectname+tracename + "totalnums");
				if (nums == null || "".equals(nums)) {
					nums = "0";
				}
				lineDataValues += nums;

				if (i < projectList.length - 1) {
					thisNodeData += ",";
					lineDataValues += ",";

				}

			}

			thisNodeData += "] \n";
			thisNodeData += "}  \n";

			String lineData = "{";
			lineData += " name:'" + tracename + "',";
			lineData += " type:'line',";
			lineData += "yAxisIndex: 1,";
			lineData += "data:[";
			lineData += lineDataValues;
			lineData += "]";
			lineData += "} \n";

			if (j < traceList.length - 1) {
				thisNodeData += ",";

				lineData += ",";
			} else {
				lineData = "," + lineData;
			}

			index_user_bar_item_data += thisNodeData;
			index_user_bar_item_data += lineData;

		}

		paramMap.put("index_user_total_bar_item_name", index_user_bar_item_name);
		paramMap.put("index_user_total_bar_item_keys", index_user_bar_item_keys);
		paramMap.put("index_user_total_bar_item_usernames", index_user_bar_item_usernames);

		paramMap.put("index_user_bar_item_yAxis", index_user_bar_item_yAxis);
		paramMap.put("index_user_total_bar_item_data", index_user_bar_item_data);

		return paramMap;
	}
	
	public static Map<String, Object> loadIndexProjectUserBarItem(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_item_name = "项目人员";
		String index_user_bar_item_usernames = "";
		String index_user_bar_item_keys = "";
		String index_user_bar_item_data = "";
		String index_user_bar_item_yAxis = "";

		index_user_bar_item_yAxis += "{";
		index_user_bar_item_yAxis += "type : 'value',";
		index_user_bar_item_yAxis += "name : '总工时',";
		index_user_bar_item_yAxis += "axisLabel : {";
		index_user_bar_item_yAxis += "formatter : '{value} h'";
		index_user_bar_item_yAxis += "}";
		index_user_bar_item_yAxis += "}";

		System.out.println("loadIndexTopProjectBarItem  query data begin ....");

		GenRedmineService service = new GenRedmineService();

		HashMap userhoursMap = service.queryProjectUserHours(prop, con);

		index_user_bar_item_keys = (String) userhoursMap.get("project_names");

		index_user_bar_item_usernames = (String) userhoursMap.get("user_names");

		System.out.println("loadIndexTopProjectBarItem  query data finished ....");

		int rgba1 = 80;
		int rgba2 = 80;
		int rgba3 = 2;
		int rgba4 = 1;

		List<Map> lineList = new ArrayList<Map>();

		String[] projectList = index_user_bar_item_keys.replace("'","").split(",");
		String[] traceList = index_user_bar_item_usernames.replace("'","").split(",");

		for (int j = 0; j < traceList.length; j++) {

			String tracename = (String) traceList[j];

			index_user_bar_item_yAxis += ",{";
			index_user_bar_item_yAxis += "type : 'value',";
			index_user_bar_item_yAxis += "name : '数量',";
			index_user_bar_item_yAxis += "axisLabel : {";
			index_user_bar_item_yAxis += "formatter : '{value} 个'";
			index_user_bar_item_yAxis += "}";
			index_user_bar_item_yAxis += "}";

			String thisNodeData = "{ \n";
			thisNodeData += " name:'" + tracename + "',";
			thisNodeData += " type:'bar',";
			thisNodeData += "   tooltip : {trigger: 'item'},";
			thisNodeData += "    stack: '总工时',";
			thisNodeData += "itemStyle : {";
			thisNodeData += "	normal : {";
			thisNodeData += "		color : 'rgba(" + rgba1 + "," + rgba2 + "," + rgba3 + "," + rgba4 + ")',";
			thisNodeData += "		label : {";
			// thisNodeData += "			show : true,position:'inside',";
			thisNodeData += "			show : false,";

			thisNodeData += "			textStyle : {";
			thisNodeData += "				color : '#27727B'";
			thisNodeData += "			}";
			thisNodeData += "		}";
			thisNodeData += "	}";
			thisNodeData += "},";

			rgba1 += 50;
			rgba2 += 40;
			rgba3 += 20;
			rgba4 += 10;

			thisNodeData += "   \n data:[";

			String lineDataValues = "";

			for (int i = 0; i < projectList.length; i++) {
				String projectname = projectList[i];

				String hours = (String) userhoursMap.get( projectname+tracename + "totalhours");
				if (hours == null || "".equals(hours)) {
					hours = "0";
				}

				thisNodeData += hours;

				String nums = (String) userhoursMap.get( projectname+tracename + "totalnums");
				if (nums == null || "".equals(nums)) {
					nums = "0";
				}
				lineDataValues += nums;

				if (i < projectList.length - 1) {
					thisNodeData += ",";
					lineDataValues += ",";

				}

			}

			thisNodeData += "] \n";
			thisNodeData += "}  \n";

			String lineData = "{";
			lineData += " name:'" + tracename + "',";
			lineData += " type:'line',";
			lineData += "yAxisIndex: 1,";
			lineData += "data:[";
			lineData += lineDataValues;
			lineData += "]";
			lineData += "} \n";

			if (j < traceList.length - 1) {
				thisNodeData += ",";

				lineData += ",";
			} else {
				lineData = "," + lineData;
			}

			index_user_bar_item_data += thisNodeData;
			index_user_bar_item_data += lineData;

		}

		paramMap.put("index_user_total_bar_item_name", index_user_bar_item_name);
		paramMap.put("index_user_total_bar_item_keys", index_user_bar_item_keys);
		paramMap.put("index_user_total_bar_item_usernames", index_user_bar_item_usernames);

		paramMap.put("index_user_bar_item_yAxis", index_user_bar_item_yAxis);
		paramMap.put("index_user_total_bar_item_data", index_user_bar_item_data);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexProjectCaseFromBarItem 
	 * 项目-CASE模块
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexProjectCaseFromBarItem(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_item_name = "";
		String index_user_bar_item_usernames = "";
		String index_user_bar_item_keys = "";
		String index_user_bar_item_data = "";
		String index_user_bar_item_yAxis = "";

		index_user_bar_item_yAxis += "{";
		index_user_bar_item_yAxis += "type : 'value',";
		index_user_bar_item_yAxis += "name : '总工时',";
		index_user_bar_item_yAxis += "axisLabel : {";
		index_user_bar_item_yAxis += "formatter : '{value} h'";
		index_user_bar_item_yAxis += "}";
		index_user_bar_item_yAxis += "}";

		System.out.println("loadIndexTopProjectBarItem  query data begin ....");

		GenRedmineService service = new GenRedmineService();

		HashMap userhoursMap = service.queryProjectCaseFrom(prop, con);

		index_user_bar_item_keys = (String) userhoursMap.get("project_names");

		index_user_bar_item_usernames = (String) userhoursMap.get("case_froms");

		System.out.println("loadIndexTopProjectBarItem  query data finished ....");

		int rgba1 = 40;
		int rgba2 = 80;
		int rgba3 = 2;
		int rgba4 = 1;

		List<Map> lineList = new ArrayList<Map>();

		String[] projectList = index_user_bar_item_keys.replace("'","").split(",");
		String[] traceList = index_user_bar_item_usernames.replace("'","").split(",");

		for (int j = 0; j < traceList.length; j++) {

			String tracename = (String) traceList[j];

			index_user_bar_item_yAxis += ",{";
			index_user_bar_item_yAxis += "type : 'value',";
			index_user_bar_item_yAxis += "name : '数量',";
			index_user_bar_item_yAxis += "axisLabel : {";
			index_user_bar_item_yAxis += "formatter : '{value} 个'";
			index_user_bar_item_yAxis += "}";
			index_user_bar_item_yAxis += "}";

			String thisNodeData = "{ \n";
			thisNodeData += " name:'" + tracename + "',";
			thisNodeData += " type:'bar',";
			thisNodeData += "   tooltip : {trigger: 'item'},";
			thisNodeData += "    stack: '总工时',";
			thisNodeData += "itemStyle : {";
			thisNodeData += "	normal : {";
			thisNodeData += "		color : 'rgba(" + rgba1 + "," + rgba2 + "," + rgba3 + "," + rgba4 + ")',";
			thisNodeData += "		label : {";
			// thisNodeData += "			show : true,position:'inside',";
			thisNodeData += "			show : false,";

			thisNodeData += "			textStyle : {";
			thisNodeData += "				color : '#27727B'";
			thisNodeData += "			}";
			thisNodeData += "		}";
			thisNodeData += "	}";
			thisNodeData += "},";

			rgba1 += 25;
			rgba2 += 40;
			rgba3 += 5;
			rgba4 += 4;

			thisNodeData += "   \n data:[";

			String lineDataValues = "";

			for (int i = 0; i < projectList.length; i++) {
				String projectname = projectList[i];

				String hours = (String) userhoursMap.get( projectname+tracename + "totalhours");
				if (hours == null || "".equals(hours)) {
					hours = "0";
				}

				thisNodeData += hours;

				String nums = (String) userhoursMap.get( projectname+tracename + "totalnums");
				if (nums == null || "".equals(nums)) {
					nums = "0";
				}
				lineDataValues += nums;

				if (i < projectList.length - 1) {
					thisNodeData += ",";
					lineDataValues += ",";

				}

			}

			thisNodeData += "] \n";
			thisNodeData += "}  \n";

			String lineData = "{";
			lineData += " name:'" + tracename + "',";
			lineData += " type:'line',";
			lineData += "yAxisIndex: 1,";
			lineData += "data:[";
			lineData += lineDataValues;
			lineData += "]";
			lineData += "} \n";

			if (j < traceList.length - 1) {
				thisNodeData += ",";

				lineData += ",";
			} else {
				lineData = "," + lineData;
			}

			index_user_bar_item_data += thisNodeData;
			index_user_bar_item_data += lineData;

		}

		paramMap.put("index_user_total_bar_item_name", index_user_bar_item_name);
		paramMap.put("index_user_total_bar_item_keys", index_user_bar_item_keys);
		paramMap.put("index_user_total_bar_item_usernames", index_user_bar_item_usernames);

		paramMap.put("index_user_bar_item_yAxis", index_user_bar_item_yAxis);
		paramMap.put("index_user_total_bar_item_data", index_user_bar_item_data);

		return paramMap;
	}

	
	/**
	 * 加载数据loadIndexProjectBarItem 
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexCaseFromReasonBarItem(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_item_name = "CASE原因";
		String index_user_bar_item_usernames = "";
		String index_user_bar_item_keys = "";
		String index_user_bar_item_data = "";
		String index_user_bar_item_yAxis = "";

		index_user_bar_item_yAxis += "{";
		index_user_bar_item_yAxis += "type : 'value',";
		index_user_bar_item_yAxis += "name : '总工时',";
		index_user_bar_item_yAxis += "axisLabel : {";
		index_user_bar_item_yAxis += "formatter : '{value} h'";
		index_user_bar_item_yAxis += "}";
		index_user_bar_item_yAxis += "}";

		System.out.println("loadIndexTopProjectBarItem  query data begin ....");

		GenRedmineService service = new GenRedmineService();

		HashMap userhoursMap = service.queryCaseFromReason(prop, con);

		index_user_bar_item_keys = (String) userhoursMap.get("case_froms");

		index_user_bar_item_usernames = (String) userhoursMap.get("case_reasons");

		System.out.println("loadIndexTopProjectBarItem  query data finished ....");

		int rgba1 = 40;
		int rgba2 = 80;
		int rgba3 = 2;
		int rgba4 = 1;

		List<Map> lineList = new ArrayList<Map>();

		String[] projectList = index_user_bar_item_keys.replace("'","").split(",");
		String[] traceList = index_user_bar_item_usernames.replace("'","").split(",");

		for (int j = 0; j < traceList.length; j++) {

			String tracename = (String) traceList[j];

			index_user_bar_item_yAxis += ",{";
			index_user_bar_item_yAxis += "type : 'value',";
			index_user_bar_item_yAxis += "name : '数量',";
			index_user_bar_item_yAxis += "axisLabel : {";
			index_user_bar_item_yAxis += "formatter : '{value} 个'";
			index_user_bar_item_yAxis += "}";
			index_user_bar_item_yAxis += "}";

			String thisNodeData = "{ \n";
			thisNodeData += " name:'" + tracename + "',";
			thisNodeData += " type:'bar',";
			thisNodeData += "   tooltip : {trigger: 'item'},";
			thisNodeData += "    stack: '总工时',";
			thisNodeData += "itemStyle : {";
			thisNodeData += "	normal : {";
			thisNodeData += "		color : 'rgba(" + rgba1 + "," + rgba2 + "," + rgba3 + "," + rgba4 + ")',";
			thisNodeData += "		label : {";
			// thisNodeData += "			show : true,position:'inside',";
			thisNodeData += "			show : false,";

			thisNodeData += "			textStyle : {";
			thisNodeData += "				color : '#27727B'";
			thisNodeData += "			}";
			thisNodeData += "		}";
			thisNodeData += "	}";
			thisNodeData += "},";

			rgba1 += 25;
			rgba2 += 40;
			rgba3 += 5;
			rgba4 += 4;

			thisNodeData += "   \n data:[";

			String lineDataValues = "";

			for (int i = 0; i < projectList.length; i++) {
				String projectname = projectList[i];

				String hours = (String) userhoursMap.get( projectname+tracename + "totalhours");
				if (hours == null || "".equals(hours)) {
					hours = "0";
				}

				thisNodeData += hours;

				String nums = (String) userhoursMap.get( projectname+tracename + "totalnums");
				if (nums == null || "".equals(nums)) {
					nums = "0";
				}
				lineDataValues += nums;

				if (i < projectList.length - 1) {
					thisNodeData += ",";
					lineDataValues += ",";

				}

			}

			thisNodeData += "] \n";
			thisNodeData += "}  \n";

			String lineData = "{";
			lineData += " name:'" + tracename + "',";
			lineData += " type:'line',";
			lineData += "yAxisIndex: 1,";
			lineData += "data:[";
			lineData += lineDataValues;
			lineData += "]";
			lineData += "} \n";

			if (j < traceList.length - 1) {
				thisNodeData += ",";

				lineData += ",";
			} else {
				lineData = "," + lineData;
			}

			index_user_bar_item_data += thisNodeData;
			index_user_bar_item_data += lineData;

		}

		paramMap.put("index_user_total_bar_item_name", index_user_bar_item_name);
		paramMap.put("index_user_total_bar_item_keys", index_user_bar_item_keys);
		paramMap.put("index_user_total_bar_item_usernames", index_user_bar_item_usernames);

		paramMap.put("index_user_bar_item_yAxis", index_user_bar_item_yAxis);
		paramMap.put("index_user_total_bar_item_data", index_user_bar_item_data);

		return paramMap;
	}

	
	/**
	 * 加载数据loadIndexTracetPie
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexTracePie(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_trace_pie_name = "内容占比";
		String index_trace_pie_keys = "";
		String index_trace_pie_values = "";

		GenRedmineService service = new GenRedmineService();

		List<HashMap> traceHoursList = service.queryTraceHours(prop, con);

		for (int i = 0; i < traceHoursList.size(); i++) {
			HashMap obj = (HashMap) traceHoursList.get(i);

			index_trace_pie_keys += "'" + obj.get("tracename") + "'";
			index_trace_pie_values += "{value:" + obj.get("totalhours") + "," + "name:'" + obj.get("tracename") + "'" + "}";

			if (i < traceHoursList.size() - 1) {
				index_trace_pie_keys += ",";
				index_trace_pie_values += ",";
			}
		}

		paramMap.put("index_trace_pie_name", index_trace_pie_name);
		paramMap.put("index_trace_pie_keys", index_trace_pie_keys);
		paramMap.put("index_trace_pie_values", index_trace_pie_values);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexProjectPie
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexCaseFunnel(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_project_pie_name = "";
		String index_project_pie_keys = "";
		String index_project_pie_values = "";

		GenRedmineService service = new GenRedmineService();

		List<HashMap> projectHoursList = service.queryProjectHours(prop, con);

		for (int i = 0; i < projectHoursList.size(); i++) {
			HashMap obj = (HashMap) projectHoursList.get(i);

			index_project_pie_keys += "'" + obj.get("projectname") + "'";
			index_project_pie_values += "{value:" + obj.get("totalhours") + "," + "name:'" + obj.get("projectname") + "'" + "}";

			if (i < projectHoursList.size() - 1) {
				index_project_pie_keys += ",";
				index_project_pie_values += ",";
			}
		}

		// 'rgba(255, 69, 0, 0.5)',
		// 'rgba(255, 150, 0, 0.5)',
		// 'rgba(255, 200, 0, 0.5)',
		// 'rgba(155, 200, 50, 0.5)',
		// 'rgba(55, 200, 100, 0.5)'

		paramMap.put("index_project_pie_name", index_project_pie_name);
		paramMap.put("index_project_pie_keys", index_project_pie_keys);
		paramMap.put("index_project_pie_values", index_project_pie_values);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexUserTotalBar 总量合格率
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexUserTotalBar(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_name = "总量合格率";
		String index_user_bar_usernames = "";
		String index_user_bar_keys = "";
		String index_user_bar_data = "";

		GenRedmineService service = new GenRedmineService();

		LinkedList userList = service.queryUserList(prop, con);
		index_user_bar_usernames = convertListToString(userList, "'");

		HashMap userhoursMap = service.queryUserHours(prop, con);

		String tracename = "总计";

		String thisNodeData = "{ \n";
		thisNodeData += "     name:'" + tracename + "',";

		thisNodeData += "type:'bar',";
		thisNodeData += "markPoint : {data : [{type : 'max', name: '最大值'}]},";
		thisNodeData += "markPoint : {data : [{type : 'min', name: '最小值'}]},";
		thisNodeData += "markLine : { data : [{type : 'average', name: '平均值'}]},";

		thisNodeData += "   \n data:[";

		for (int i = 0; i < userList.size(); i++) {
			String username = (String) userList.get(i);

			String hours = (String) userhoursMap.get(username + "totalhours");
			if (hours == null || "".equals(hours)) {
				hours = "0";
			}

			thisNodeData += hours;
			if (i < userList.size() - 1) {
				thisNodeData += ",";
			}

		}

		thisNodeData += "] \n";
		thisNodeData += "}  \n";

		index_user_bar_data += thisNodeData;

		paramMap.put("index_user_total_bar_name", index_user_bar_name);
		paramMap.put("index_user_total_bar_keys", index_user_bar_keys);
		paramMap.put("index_user_total_bar_usernames", index_user_bar_usernames);

		paramMap.put("index_user_total_bar_data", index_user_bar_data);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexUserTotalBar 总量合格率
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexUserTotalBarItem(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_item_name = "工作内容分布";
		String index_user_bar_item_usernames = "";
		String index_user_bar_item_keys = "";
		String index_user_bar_item_data = "";
		String index_user_bar_item_yAxis = "";

		index_user_bar_item_yAxis += "{";
		index_user_bar_item_yAxis += "type : 'value',";
		index_user_bar_item_yAxis += "name : '总工时',";
		index_user_bar_item_yAxis += "axisLabel : {";
		index_user_bar_item_yAxis += "formatter : '{value} h'";
		index_user_bar_item_yAxis += "}";
		index_user_bar_item_yAxis += "}";

		System.err.println("loadIndexUserTotalBarItem  query data begin ....");

		GenRedmineService service = new GenRedmineService();

		LinkedList traceList = service.queryTraceList(prop, con);
		index_user_bar_item_keys = convertListToString(traceList, "'");// trace

		LinkedList userList = service.queryUserList(prop, con);
		index_user_bar_item_usernames = convertListToString(userList, "'");

		HashMap userhoursMap = service.queryUserTraceHours(prop, con);

		System.err.println("loadIndexUserTotalBarItem  query data finished ....");

		int rgba1 = 80;
		int rgba2 = 120;
		int rgba3 = 52;
		int rgba4 = 1;

		List<Map> lineList = new ArrayList<Map>();

		for (int j = 0; j < traceList.size(); j++) {

			String tracename = (String) traceList.get(j);

			index_user_bar_item_yAxis += ",{";
			index_user_bar_item_yAxis += "type : 'value',";
			index_user_bar_item_yAxis += "name : '数量',";
			index_user_bar_item_yAxis += "axisLabel : {";
			index_user_bar_item_yAxis += "formatter : '{value} 个'";
			index_user_bar_item_yAxis += "}";
			index_user_bar_item_yAxis += "}";

			String thisNodeData = "{ \n";
			thisNodeData += " name:'" + tracename + "',";
			thisNodeData += " type:'bar',";
			thisNodeData += "   tooltip : {trigger: 'item'},";
			thisNodeData += "    stack: '总工时',";
			thisNodeData += "itemStyle : {";
			thisNodeData += "	normal : {";
			thisNodeData += "		color : 'rgba(" + rgba1 + "," + rgba2 + "," + rgba3 + "," + rgba4 + ")',";
			thisNodeData += "		label : {";
			// thisNodeData += "			show : true,position:'inside',";
			thisNodeData += "			show : false,";

			thisNodeData += "			textStyle : {";
			thisNodeData += "				color : '#27727B'";
			thisNodeData += "			}";
			thisNodeData += "		}";
			thisNodeData += "	}";
			thisNodeData += "},";

			rgba1 += 100;
			rgba2 += 80;
			rgba3 += 50;
			rgba4 += 40;

			thisNodeData += "   \n data:[";

			String lineDataValues = "";

			for (int i = 0; i < userList.size(); i++) {
				String username = (String) userList.get(i);

				String hours = (String) userhoursMap.get(username + tracename + "totalhours");
				if (hours == null || "".equals(hours)) {
					hours = "0";
				}

				thisNodeData += hours;

				String nums = (String) userhoursMap.get(username + tracename + "totalnums");
				if (nums == null || "".equals(nums)) {
					nums = "0";
				}
				lineDataValues += nums;

				if (i < userList.size() - 1) {
					thisNodeData += ",";
					lineDataValues += ",";

				}

			}

			thisNodeData += "] \n";
			thisNodeData += "}  \n";

			String lineData = "{";
			lineData += " name:'" + tracename + "',";
			lineData += " type:'line',";
			lineData += "yAxisIndex: 1,";
			lineData += "data:[";
			lineData += lineDataValues;
			lineData += "]";
			lineData += "} \n";

			if (j < traceList.size() - 1) {
				thisNodeData += ",";

				lineData += ",";
			} else {
				lineData = "," + lineData;
			}
			index_user_bar_item_data += thisNodeData;
			index_user_bar_item_data += lineData;

		}

		paramMap.put("index_user_total_bar_item_name", index_user_bar_item_name);
		paramMap.put("index_user_total_bar_item_keys", index_user_bar_item_keys);
		paramMap.put("index_user_total_bar_item_usernames", index_user_bar_item_usernames);

		paramMap.put("index_user_bar_item_yAxis", index_user_bar_item_yAxis);
		paramMap.put("index_user_total_bar_item_data", index_user_bar_item_data);

		return paramMap;
	}

	/**
	 * 加载数据loadIndexUserBar
	 * 
	 * @param beginDate
	 * @param endDate
	 * @param con
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> loadIndexUserTraceBar(Properties prop, Connection con) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();

		String index_user_bar_name = "人员工时分布";
		String index_user_bar_usernames = "";
		String index_user_bar_keys = "";
		String index_user_bar_data = "";

		GenRedmineService service = new GenRedmineService();

		LinkedList traceList = service.queryTraceList(prop, con);
		index_user_bar_keys = convertListToString(traceList, "'");// trace type

		LinkedList userList = service.queryUserList(prop, con);
		index_user_bar_usernames = convertListToString(userList, "'");// user
																		// names

		HashMap userhoursMap = service.queryUserTraceHours(prop, con);

		for (int j = 0; j < traceList.size(); j++) {

			String tracename = (String) traceList.get(j);

			String thisNodeData = "{ \n";
			thisNodeData += "     name:'" + tracename + "',";

			if ("CASE流程".equals(tracename)) {
				thisNodeData += "type:'line',";

				thisNodeData += "yAxisIndex: 1,";

				thisNodeData += "markPoint : {data : [{type : 'max', name: '最大值'}]},";
				// thisNodeData +=
				// "markLine : { data : [{type : 'average', name: '平均值'}]}";

			} else {
				thisNodeData += "type:'bar',";
			}

			thisNodeData += "   \n data:[";

			for (int i = 0; i < userList.size(); i++) {
				String username = (String) userList.get(i);

				String hours = (String) userhoursMap.get(username + tracename + "totalhours");
				if (hours == null || "".equals(hours)) {
					hours = "0";
				}

				thisNodeData += hours;
				if (i < userList.size() - 1) {
					thisNodeData += ",";
				}

			}

			thisNodeData += "] \n";
			thisNodeData += "}  \n";

			if (j < traceList.size() - 1) {
				thisNodeData += ",";
			}

			index_user_bar_data += thisNodeData;
		}

		paramMap.put("index_user_trace_bar_name", index_user_bar_name);
		paramMap.put("index_user_trace_bar_keys", index_user_bar_keys);
		paramMap.put("index_user_trace_bar_usernames", index_user_bar_usernames);

		paramMap.put("index_user_trace_bar_data", index_user_bar_data);

		return paramMap;
	}

	public static String convertListToString(List list, String fixstr) {
		String str = "";
		for (int i = 0; i < list.size(); i++) {
			str += fixstr + list.get(i) + fixstr;
			if (i < list.size() - 1) {
				str += ",";
			}

		}

		System.err.println("convertListToString:" + str);
		return str;
	}

	public static void execTemplate(Map<String, Object> paramMap, String templatedir, String templatename, String outpath) {
		Configuration cfg = Configuration.getDefaultConfiguration();
		try {

			// 从哪里加载模板文件
			cfg.setDirectoryForTemplateLoading(new File(templatedir));
			// 通过freemarker解释模板，首先需要获得Template对象
			Template template = cfg.getTemplate(templatename);

			// 定义模板解释完成之后的输出
			PrintWriter writer = new PrintWriter(new BufferedWriter(new FileWriter(outpath)));
			try {
				// 解释模板
				template.process(paramMap, writer);
				writer.flush();
			} catch (TemplateException e) {
				e.printStackTrace();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static int convertMapObj(Object obj) {
		if (obj != null) {
			return (Integer) obj;
		}
		return 0;
	}

}
