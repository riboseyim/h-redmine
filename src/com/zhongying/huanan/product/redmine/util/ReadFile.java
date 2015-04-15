package com.zhongying.huanan.product.redmine.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class ReadFile {

	private ReadFile() {
	}

	public static ReadFile getInstance() {
		return new ReadFile();
	}

	public Properties getConfigFile(String FileName) {
		Properties config = new Properties();
		java.io.InputStream is = null;
		try {
			// 本地测试用
			// is=new FileInputStream("./" + FileName);
			is = new FileInputStream(FileName);
			config.load(is);
			is.close();
			is = null;
		} catch (IOException e) {
			System.out.println("getConfigFile出错:" + e.getMessage());
			e.printStackTrace();
		}
		return config;
	}

}
