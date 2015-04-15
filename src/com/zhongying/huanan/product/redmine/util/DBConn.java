package com.zhongying.huanan.product.redmine.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class DBConn {
	private ReadFile config = ReadFile.getInstance();

	private String DBClassName = "";
	private String DBUrl = "";
	private String DBUser = "";
	private String DBPass = "";

	public DBConn() {
		Properties prop = config.getConfigFile(RedmineConfig.configFile);

		// ����mysql��jdbc����
		DBClassName = prop.getProperty("DBClassName");

		DBUrl = prop.getProperty("DBUrl");
		DBUser = prop.getProperty("DBUser");
		DBPass = prop.getProperty("DBPass");
		
		//System.err.println( prop.getProperty("DBPass"));

		// System.out.println("DBClassName:" + DBClassName);
		// System.out.println("DBUrl:" + DBUrl);
		// System.out.println("DBUser:" + DBUser);
		// System.out.println("DBPass:" + DBPass);

	}

	public static void main(String[] args) {
		DBConn db = new DBConn();
		Connection conn = null;
		try {
			db.getDirectConn();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			releaseConnection(conn);
		}
	}

	public Connection getDirectConn() throws Exception {
		Connection conn = null;
		try {
			Class.forName(DBClassName);
			conn = DriverManager.getConnection(DBUrl, DBUser, DBPass);
		} catch (Exception e) {
			System.out.println("connnection faild :" + e);
			throw e;
		}
		return conn;
	}

	public Connection getSSHDirectConn() throws Exception {

		Connection conn = null;
		try {
			Class.forName(DBClassName);
			conn = DriverManager.getConnection(DBUrl, DBUser, DBPass);
		} catch (Exception e) {
			System.out.println("connnection faild :" + e);
			throw e;
		}
		return conn;
	}

	public static void releaseConnection(Connection conn) {
		try {
			// �ر�Connection����
			if (conn != null)
				conn.close();
		} catch (Exception e) {
			System.out.println("connection close faild :" + e);
		}
	}

	public static void clearRs(ResultSet rs) {
		try {
			// �ر�ResultSet����
			if (rs != null)
				rs.close();
		} catch (Exception e) {
			System.out.println("�رս����ʧ��:" + e);
		}
	}

	public static void cleanStmt(Statement stmt) {
		try {
			// �ر�Statement����
			if (stmt != null)
				stmt.close();
		} catch (Exception e) {
			System.out.println("�ر���伯ʧ��:" + e);
		}
	}

	public static void cleanPre(PreparedStatement ps) {
		try {
			// �ر�PrepareStatement����
			if (ps != null)
				ps.close();
		} catch (Exception e) {
			System.out.println("�ر�Ԥ����ʧ��:" + e);
		}
	}

	public static void commit(Connection con) {
		if (con != null) {
			try {
				// �����ύ
				con.commit();
			} catch (SQLException e) {
				System.out.println("�ύʧ��:" + e);
			}
		}
	}

	public String readToString(String filepath, String encoding) {
		File file = new File(filepath);

		Long filelength = file.length();
		byte[] filecontent = new byte[filelength.intValue()];
		try {
			FileInputStream in = new FileInputStream(file);
			in.read(filecontent);
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		try {
			return new String(filecontent, encoding);
		} catch (UnsupportedEncodingException e) {
			System.err.println("The OS does not support " + encoding);
			e.printStackTrace();
			return null;
		}
	}
}
