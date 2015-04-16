package com.zhongying.huanan.product.redmine.echarts;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import com.zhongying.huanan.product.redmine.util.DBConn;

public class GenRedmineService {

	public LinkedList<HashMap> queryProjectHours(Properties prop, Connection con) {
		LinkedList<HashMap> mapList = new LinkedList<HashMap>();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select * from (";
		sql += " select p.`name` as 'projectname',sum(t.hours) as 'totalhours' ";
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

		sql += " group by p.id";
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
				String projectname = rs.getString("projectname");
				String totalhours = rs.getString("totalhours");

				HashMap map = new HashMap();
				map.put("projectname", projectname);
				map.put("totalhours", totalhours + "");

				System.err.println(projectname + "--" + totalhours);

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

	public LinkedList<HashMap> queryProjectTraceHours(Properties prop, Connection con) {
		LinkedList<HashMap> mapList = new LinkedList<HashMap>();

		String beginDate = prop.getProperty("beginDate");
		String endDate = prop.getProperty("endDate");
		String areaLimit = prop.getProperty("areaLimit");

		String sql = "select * from (";
		sql += " select p.`name` as 'projectname',tr.name as 'tracename',sum(t.hours) as 'totalhours' ";
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
		sql += " group by p.id,tracker_id";
		sql += " order by p.id,tr.id";
		sql += " ) M  where 1=1 ";
		sql += " order by M.totalhours desc";

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
				String tracename = rs.getString("tracename");
				String totalhours = rs.getString("totalhours");

				HashMap map = new HashMap();
				map.put("projectname", projectname);
				map.put("tracename", tracename);
				map.put("totalhours", totalhours);

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
				String totalnums=rs.getString("totalnums");

				map.put(username + tracename+"totalhours", totalhours);
				map.put(username+tracename+"totalnums", totalnums);

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
				

				map.put(username+"totalhours", totalhours);
				map.put(username+"totalnums", totalnums);

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

	public List test(String sql, Connection con) {
		List list = new ArrayList();

		PreparedStatement psd = null;
		ResultSet rs = null;
		try {

			psd = con.prepareStatement(sql);
			rs = psd.executeQuery();

			while (rs.next()) {
				HashMap map = new HashMap();
				String login = rs.getString("login");

				System.out.println(login);

				// list.add();
			}
			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConn.cleanPre(psd);
		}

		return list;
	}
}
