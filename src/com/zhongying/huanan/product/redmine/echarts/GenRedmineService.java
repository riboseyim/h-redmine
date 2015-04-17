package com.zhongying.huanan.product.redmine.echarts;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import com.zhongying.huanan.product.echarts.util.EChartsUtil;
import com.zhongying.huanan.product.redmine.util.DBConn;

public class GenRedmineService {

	public String queryTopProjectIds(int topIndex, Properties prop, Connection con) {

		prop.put("listLimit", "0," + topIndex);

		LinkedList<HashMap> topProjectList = queryProjectHours(prop, con);

		String projectids = "";

		for (int i = 0; i < topProjectList.size(); i++) {
			HashMap map = topProjectList.get(i);
			String projectid = (String) map.get("projectid");

			projectids += "'" + projectid + "'";
			if (i < topProjectList.size() - 1) {
				projectids += ",";
			}
		}
		return projectids;
	}

	public LinkedList<HashMap> queryProjectHours(Properties prop, Connection con) {
		LinkedList<HashMap> mapList = new LinkedList<HashMap>();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String projectLimit = prop.getProperty("projectLimit");
		String listLimit = prop.getProperty("listLimit");

		String sql = "select * from (";
		sql += " select p.`id` as 'projectid',p.`name` as 'projectname',sum(t.hours) as 'totalhours' ";
		sql += " ,count(distinct i.id) as 'totalnums' ";

		sql += " from issues i ,time_entries t,projects p ";
		sql += " where i.id=t.issue_id and t.project_id=p.id ";

		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}

		if (projectLimit != null && "".equals(projectLimit) == false) {
			sql += " and p.id in(" + projectLimit + ") ";// /====
		}

		sql += " group by p.id";
		sql += " order by totalhours desc";
		sql += " ) M  where 1=1 ";
		if (listLimit != null && "".equals(listLimit) == false) {
			sql += " limit " + listLimit;// /====
		}
		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			while (rs.next()) {
				String projectname = rs.getString("projectname");
				String projectid = rs.getString("projectid");

				String totalhours = rs.getString("totalhours");
				String totalnums = rs.getString("totalnums");

				HashMap map = new HashMap();
				map.put("projectid", projectid);

				map.put("projectname", projectname);

				map.put("totalhours", totalhours + "");
				map.put("totalnums", totalnums + "");

				// System.err.println(projectname + "--" +
				// totalhours+"--"+totalnums);

				mapList.add(map);

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return mapList;
	}

	public LinkedList<HashMap> queryTraceHours(Properties prop, Connection con) {
		LinkedList<HashMap> mapList = new LinkedList<HashMap>();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select * from (";
		sql += " select tr.name as 'tracename',sum(t.hours) as 'totalhours' ";
		sql += " from issues i ,time_entries t,trackers tr,projects p ";
		sql += " where i.id=t.issue_id  and i.tracker_id=tr.id and t.project_id=p.id ";

		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}

		sql += " group by tr.id";
		sql += " order by totalhours desc";
		sql += " ) M  where 1=1 ";

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			while (rs.next()) {
				String tracename = rs.getString("tracename");
				String totalhours = rs.getString("totalhours");

				HashMap map = new HashMap();
				map.put("tracename", tracename);
				map.put("totalhours", totalhours + "");

				System.err.println(tracename + "--" + totalhours);

				mapList.add(map);

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return mapList;
	}

	public HashMap queryProjectTraceHours(Properties prop, Connection con) {

		HashMap map = new HashMap();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");
		String projectLimit = prop.getProperty("projectLimit");
		String listLimit = prop.getProperty("listLimit");

		String sql = "select * from (";
		sql += " select p.`id` as 'projectid' ,p.`name` as 'projectname',tr.name as 'tracename',sum(t.hours) as 'totalhours' ";
		sql += " ,count(distinct i.id) as 'totalnums' ";

		sql += " from issues i ,time_entries t,projects p,trackers tr";
		sql += " where i.id=t.issue_id and t.project_id=p.id and i.tracker_id=tr.id";
		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}

		if (projectLimit != null && "".equals(projectLimit) == false) {
			sql += " and p.id in(" + projectLimit + ") ";// /====
		}

		sql += " group by p.id,tracker_id";
		sql += " order by p.id,tr.id";
		sql += " ) M  where 1=1 ";
		sql += " order by M.totalhours desc";

		if (listLimit != null && "".equals(listLimit) == false) {
			sql += " limit " + listLimit;// /====
		}

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			HashSet projectNameSet = new HashSet();
			HashSet projectIdSet = new HashSet();

			HashSet traceSet = new HashSet();

			while (rs.next()) {
				String projectname = rs.getString("projectname");
				String projectid = rs.getString("projectid");

				String tracename = rs.getString("tracename");
				String totalhours = rs.getString("totalhours");
				String totalnums = rs.getString("totalnums");

				map.put(projectname + tracename + "totalhours", totalhours);
				map.put(projectname + tracename + "totalnums", totalnums);

				projectNameSet.add(projectname);
				projectIdSet.add(projectid);
				traceSet.add(tracename);

			}
			rs.close();

			String project_names = EChartsUtil.convertSetString(projectNameSet, "'");
			String project_ids = EChartsUtil.convertSetString(projectIdSet, "'");

			String trace_names = EChartsUtil.convertSetString(traceSet, "'");
			map.put("project_names", project_names);
			map.put("project_ids", project_ids);

			map.put("trace_names", trace_names);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return map;
	}
	
	public HashMap queryProjectUserHours(Properties prop, Connection con) {

		HashMap map = new HashMap();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");
		String projectLimit = prop.getProperty("projectLimit");
		String listLimit = prop.getProperty("listLimit");

		String sql = "select * from (";
		sql += " select p.`id` as 'projectid' ,p.`name` as 'projectname',concat(u.lastname,u.firstname) as 'username',sum(t.hours) as 'totalhours' ";
		sql += " ,count(distinct i.id) as 'totalnums' ";

		sql += " from issues i ,time_entries t,projects p,users u";
		sql += " where i.id=t.issue_id and t.project_id=p.id and t.user_id=u.id";
		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}

		if (projectLimit != null && "".equals(projectLimit) == false) {
			sql += " and p.id in(" + projectLimit + ") ";// /====
		}

		sql += " group by p.id,tracker_id";
		sql += " order by p.id,u.id";
		sql += " ) M  where 1=1 ";
		sql += " order by M.totalhours desc";

		if (listLimit != null && "".equals(listLimit) == false) {
			sql += " limit " + listLimit;// /====
		}

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			HashSet projectNameSet = new HashSet();
			HashSet projectIdSet = new HashSet();

			HashSet userSet = new HashSet();

			while (rs.next()) {
				String projectname = rs.getString("projectname");
				String projectid = rs.getString("projectid");

				String username = rs.getString("username");
				String totalhours = rs.getString("totalhours");
				String totalnums = rs.getString("totalnums");

				map.put(projectname + username + "totalhours", totalhours);
				map.put(projectname + username + "totalnums", totalnums);

				projectNameSet.add(projectname);
				projectIdSet.add(projectid);
				userSet.add(username);

			}
			rs.close();

			String project_names = EChartsUtil.convertSetString(projectNameSet, "'");
			String project_ids = EChartsUtil.convertSetString(projectIdSet, "'");

			String user_names = EChartsUtil.convertSetString(userSet, "'");
			map.put("project_names", project_names);
			map.put("project_ids", project_ids);

			map.put("user_names", user_names);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return map;
	}

	public HashMap queryUserTraceHours(Properties prop, Connection con) {
		HashMap map = new HashMap();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select concat(u.lastname,'',u.firstname) as 'username',";
		sql += " tr.name as 'tracename',sum(t.hours) as 'totalhours',count(distinct i.id) as 'totalnums' ";
		sql += " from issues i ,time_entries t,users u,trackers tr,projects p";
		sql += "  where i.id=t.issue_id and t.user_id=u.id and i.tracker_id=tr.id and i.project_id=p.id";
		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}
		sql += " group by u.id,tracker_id";
		sql += " order by u.id,tr.id";

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			while (rs.next()) {
				String username = rs.getString("username");
				String tracename = rs.getString("tracename");
				String totalhours = rs.getString("totalhours");
				String totalnums = rs.getString("totalnums");

				map.put(username + tracename + "totalhours", totalhours);
				map.put(username + tracename + "totalnums", totalnums);

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return map;
	}

	public HashMap queryUserHours(Properties prop, Connection con) {
		HashMap map = new HashMap();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select concat(u.lastname,'',u.firstname) as 'username',";
		sql += " sum(t.hours) as 'totalhours',count(distinct i.id) as 'totalnums' ";
		sql += " from issues i ,time_entries t,users u,trackers tr,projects p";
		sql += "  where i.id=t.issue_id and t.user_id=u.id and i.tracker_id=tr.id and i.project_id=p.id";
		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}
		sql += " group by u.id";
		sql += " order by u.id";

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			while (rs.next()) {
				String username = rs.getString("username");
				String totalhours = rs.getString("totalhours");
				String totalnums = rs.getString("totalnums");

				map.put(username + "totalhours", totalhours);
				map.put(username + "totalnums", totalnums);

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return map;
	}

	public LinkedList queryTraceList(Properties prop, Connection con) {
		LinkedList list = new LinkedList<String>();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select distinct tr.name as 'tracename' ";
		sql += " from issues i ,time_entries t,users u,trackers tr,projects p";
		sql += "  where i.id=t.issue_id and t.user_id=u.id and i.tracker_id=tr.id and i.project_id=p.id";
		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";// /====
		}
		sql += " order by tr.id";

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			while (rs.next()) {
				String tracename = rs.getString("tracename");

				list.add(tracename);

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return list;
	}

	public LinkedList queryUserList(Properties prop, Connection con) {
		LinkedList list = new LinkedList<String>();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select distinct concat(u.lastname,'',u.firstname) as 'username'";
		sql += " from issues i ,time_entries t,users u,trackers tr,projects p";
		sql += "  where i.id=t.issue_id and t.user_id=u.id and i.tracker_id=tr.id and i.project_id=p.id";

		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		if (areaLimit != null && "".equals(areaLimit) == false) {
			sql += " and p.parent_id in(" + areaLimit + ") ";
		}
		sql += " group by u.id,tracker_id";
		sql += " order by u.id,tr.id";

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);
			psd.setString(1, beginDate);
			psd.setString(2, endDate);

			rs = psd.executeQuery();

			while (rs.next()) {
				String username = rs.getString("username");

				list.add(username);

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return list;
	}
	

	public HashMap queryCaseFromReason(Properties prop, Connection con) {

		List paraList = new ArrayList();
		List resultList = new ArrayList();

		String sql = "select case_from,case_reason,sum(worktime) as 'totalhours',count(distinct issue_id) as 'totalnums' from ( ";

		sql += buildQueryCASESQL(prop);

		sql += " ) aa ";
		sql += " group by project_name,case_from ";
		sql += " order by totalhours desc ";

		resultList.add("project_name");
		resultList.add("case_from");
		resultList.add("totalhours");
		resultList.add("totalnums");

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String projectLimit = prop.getProperty("projectLimit");
		String listLimit = prop.getProperty("listLimit");

		if (beginDate != null && "".equals(beginDate) == false) {
			paraList.add(beginDate);
		}
		if (endDate != null && "".equals(endDate) == false) {
			paraList.add(endDate);
		}
		if (areaLimit != null && "".equals(areaLimit) == false) {
			String[] tmp=areaLimit.split(",");
			for (int i = 0; i < tmp.length; i++) {
				paraList.add(tmp[i].replace("'",""));
			}
			
		}

		if (projectLimit != null && "".equals(projectLimit) == false) {
			String[] tmp=projectLimit.split(",");
			for (int i = 0; i < tmp.length; i++) {
				paraList.add(tmp[i].replace("'", ""));
			}
		}
		if (listLimit != null && "".equals(listLimit) == false) {
			//paraList.add(listLimit);
		}
		
		System.out.println(sql);
		System.out.println(paraList);

		return queryCASEHours(sql, paraList, "case_from", "case_reason", con);
	}

	public HashMap queryProjectCaseFrom(Properties prop, Connection con) {

		List paraList = new ArrayList();
		List resultList = new ArrayList();

		String sql = "select project_name,case_from,sum(worktime) as 'totalhours',count(distinct issue_id) as 'totalnums' from ( ";

		sql += buildQueryCASESQL(prop);

		sql += " ) aa ";
		sql += " group by project_name,case_from ";
		sql += " order by totalhours desc ";

		resultList.add("project_name");
		resultList.add("case_from");
		resultList.add("totalhours");
		resultList.add("totalnums");

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String projectLimit = prop.getProperty("projectLimit");
		String listLimit = prop.getProperty("listLimit");

		if (beginDate != null && "".equals(beginDate) == false) {
			paraList.add(beginDate);
		}
		if (endDate != null && "".equals(endDate) == false) {
			paraList.add(endDate);
		}
		if (areaLimit != null && "".equals(areaLimit) == false) {
			String[] tmp=areaLimit.split(",");
			for (int i = 0; i < tmp.length; i++) {
				paraList.add(tmp[i].replace("'",""));
			}
			
		}

		if (projectLimit != null && "".equals(projectLimit) == false) {
			String[] tmp=projectLimit.split(",");
			for (int i = 0; i < tmp.length; i++) {
				paraList.add(tmp[i].replace("'", ""));
			}
		}
		if (listLimit != null && "".equals(listLimit) == false) {
			//paraList.add(listLimit);
		}
		
		System.out.println(sql);
		System.out.println(paraList);

		return queryCASEHours(sql, paraList, "project_name", "case_from", con);
	}

	public String buildQueryCASESQL(Properties prop) {

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String projectLimit = prop.getProperty("projectLimit");

		String sql = "";
		sql += "select ";
		sql += "i.id as issue_id, ";
		sql += "concat(u.lastname,u.firstname) as person_name, ";
		sql += "date_format(t.spent_on,'%Y-%m-%d') as log_date, ";
		sql += "concat(p.name) as project_name, ";
		sql += "concat(e.name) as log_attr, ";
		sql += "concat(f.value) as case_from, ";
		sql += "concat(r.value) as case_reason, ";

		sql += "t.hours as worktime ";
		sql += "from time_entries t ";
		sql += "left join projects p on p.id=t.project_id ";
		sql += "left join issues i on i.id=t.issue_id ";
		sql += "left join users u on u.id=t.user_id ";
		sql += "left join trackers tr on tr.id=i.tracker_id ";
		sql += "left join enumerations e on e.id=t.activity_id and e.active=1 ";
		sql += "left join issue_statuses ist on ist.id=i.status_id ";
		sql += "left join ( ";
		sql += "select i.id,i.subject,cf.name,cv.value from custom_fields cf ";
		sql += "left join custom_values cv on cv.custom_field_id=cf.id ";
		sql += "left join issues i on i.id=cv.customized_id ";
		sql += "where cf.type='IssueCustomField' and cf.name='CASE来源' ";
		sql += ") f on f.id=i.id ";
		sql += "left join ( ";
		sql += "select i.id,i.subject,cf.name,cv.value from custom_fields cf ";
		sql += "left join custom_values cv on cv.custom_field_id=cf.id ";
		sql += "left join issues i on i.id=cv.customized_id ";
		sql += "where cf.type='IssueCustomField' and cf.name='原因归类' ";
		sql += ") r on r.id=i.id ";
		sql += "where  1=1 ";

		if (beginDate != null && "".equals(beginDate) == false) {
			sql += " and t.spent_on>=? ";
		}
		if (endDate != null && "".equals(endDate) == false) {
			sql += " and t.spent_on<=? ";
		}

		sql += " and i.tracker_id='12' ";

		if (areaLimit != null && "".equals(areaLimit) == false) {
			String[] tmp=areaLimit.split(",");
			sql += " and p.parent_id in(";
			for (int i = 0; i < tmp.length; i++) {
				sql += "?";
				if(i<tmp.length-1){
					sql += ",";
				}
			}
			sql += " ) ";// /====
		}

		if (projectLimit != null && "".equals(projectLimit) == false) {
			String[] tmp=projectLimit.split(",");
			sql += " and p.id in(";
			for (int i = 0; i < tmp.length; i++) {
				sql += "?";
				if(i<tmp.length-1){
					sql += ",";
				}
			}
			sql += " ) ";// /====
		}

		sql+=" and t.hours >0 ";
		
		System.out.println("buildQueryCASESQL:\n"+sql);

		return sql;

	}

	public LinkedList<HashMap> queryCASEHours(String sql, List paraList, List resultList, Connection con) {

		LinkedList<HashMap> mapList = new LinkedList<HashMap>();
		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);

			for (int i = 0; i < paraList.size(); i++) {
				//System.out.println((i+1)+"--"+paraList.get(i));
				psd.setString(i + 1, (String) paraList.get(i));
			}

			rs = psd.executeQuery();

			while (rs.next()) {
				HashMap map = new HashMap();
				for (int i = 0; i < resultList.size(); i++) {
					String resultCode = (String) resultList.get(i);
					String resultValue = rs.getString(resultCode);
					map.put(resultCode, resultValue);

					mapList.add(map);
				}

			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}
		return mapList;
	}

	public HashMap queryCASEHours(String sql, List paraList, String xName, String yName, Connection con) {

		HashMap map = new HashMap();
		PreparedStatement psd = null;
		ResultSet rs = null;
		try {
			DBConn db = new DBConn();
			con = db.getDirectConn();

			psd = con.prepareStatement(sql);

			for (int i = 0; i < paraList.size(); i++) {
				//System.out.println((i+1)+"--"+paraList.get(i));
				psd.setString(i + 1, (String) paraList.get(i));
			}

			rs = psd.executeQuery();
			int i=0;
			
			HashSet xSet=new HashSet();
			HashSet ySet=new HashSet();
			
			while (rs.next()) {

				String xNameValue = rs.getString(xName);
				String yNameValue = rs.getString(yName);
				String totalhours = rs.getString("totalhours");
				String totalnums = rs.getString("totalnums");

				map.put(xNameValue + yNameValue + "totalhours", totalhours);
				map.put(xNameValue + yNameValue + "totalnums", totalnums);
				
				
				xSet.add(xNameValue);
				ySet.add(yNameValue);
				
				
				i++;
			}
			System.out.println(" query result:"+i);
			 
			 
			map.put(xName+"s", EChartsUtil.convertSetString(xSet, "'"));
			map.put(yName+"s", EChartsUtil.convertSetString(ySet, "'"));
			
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}
		return map;
	}
}
