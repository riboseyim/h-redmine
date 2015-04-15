package com.zhongying.huanan.product.redmine.util;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

public class SSHTunnelUtil {
	

	private ReadFile config = ReadFile.getInstance();
	
	private String DBSSHost = "";
	private String DBSSHUser = "";
	private String DBSSHUserPass = "";

	private String DBPort="";
	

	public SSHTunnelUtil() {

		DBSSHost = config.getConfigFile(RedmineConfig.configFile).getProperty("DBSSHost");

		DBPort = config.getConfigFile(RedmineConfig.configFile).getProperty("DBPort");
		
		
		DBSSHUser = config.getConfigFile(RedmineConfig.configFile).getProperty("DBSSHUser");
		
		DBSSHUserPass = config.getConfigFile(RedmineConfig.configFile).getProperty("DBSSHUserPass");

		
		System.out.println("DBSSHUser:" + DBSSHUser);
		System.out.println("DBSSHUserPass:" + DBSSHUserPass);
		System.out.println("DBSSHost:" + DBSSHost);

	

	}
	
	public Session sshTunnel() {
		Session ssh=null;
		try {
			JSch jsch = new JSch();

			String pubfile = "E:\\ServRoot\\zyuc";
			// System.out.println(pubkey);

			jsch.addIdentity(pubfile);

			ssh= jsch.getSession(DBSSHUser, DBSSHost, 22);
			// session.setPassword(DBSSHUserPass);// SSH连接密码

			java.util.Properties config = new java.util.Properties();
			config.put("StrictHostKeyChecking", "no");
			ssh.setConfig(config);

			ssh.connect();
			System.out.println("ssh session version:" + ssh.getServerVersion());// 这里打印SSH服务器版本信息


			int tport=Integer.parseInt(DBPort);
			int assinged_port = ssh.setPortForwardingL(3310, DBSSHost, tport);
			System.out.println("localhost:" + assinged_port + " -> " + DBSSHost + ":" + assinged_port);
			//System.out.println("server version:"+ssh.getServerVersion()+"--"+ssh.getUserInfo());

		} catch (Exception e) {
			e.printStackTrace();
			if(ssh!=null){
				ssh.disconnect();
			}
		} finally {

		}
		
		return ssh;
	}

}
