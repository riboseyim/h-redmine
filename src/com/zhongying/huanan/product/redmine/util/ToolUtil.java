/*
 * ��������:ID738(Deploy-E8ҵ��ͨ-20080416),������ʷ���ݴ������:������
 * ��������:2008-02-25
 * ������:������
 * �ĵ���ţ�Deploy-E8ҵ��ͨ-20080416
 * �����/bug�ţ�ID738
 */

package com.zhongying.huanan.product.redmine.util;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.SimpleTimeZone;
import java.util.TimeZone;

public class ToolUtil {

	/**
	 * �������ܣ���ȡϵͳ��ǰʱ����Ϣ ��������: getAccurateTime()
	 * <p>
	 * 
	 * <pre>
	 * ��    �ͣ���������
	 * ���ݿ�� ��
	 * ��    �ģ�������
	 * �޸����ڣ� 2008-04-22
	 * �޸����ݣ� ID738(Deploy-E8ҵ��ͨ-20080416),������ʷ���ݴ������:������-��ȡϵͳ��ǰʱ����Ϣ
	 * </pre>
	 * 
	 * @return String
	 */
	public static String getAccurateTime() throws Exception {
		// ����ʱ����Ӧ ������
		String[] ids = TimeZone.getAvailableIDs(-8 * 60 * 60 * 1000);
		// if no ids were returned, something is wrong. get out.
		if (ids.length == 0)
			ids[0] = "EAT-8";

		// create a Pacific Standard Time time zone
		SimpleTimeZone pdt = new SimpleTimeZone(8 * 60 * 60 * 1000, ids[0]);

		GregorianCalendar sdate = new GregorianCalendar(pdt, new Locale("CHINESE ", "CHINA"));
		int year = sdate.get(Calendar.YEAR);
		int month = sdate.get(Calendar.MONTH) + 1;
		int date = sdate.get(Calendar.DATE);
		int hour = sdate.get(Calendar.HOUR_OF_DAY);
		int minute = sdate.get(Calendar.MINUTE);
		int second = sdate.get(Calendar.SECOND);
		StringBuffer sResult = new StringBuffer();
		sResult.append(year);
		sResult.append("-");
		if (month < 10) {
			sResult.append(0);
			sResult.append(month);
			sResult.append("-");
		} else {
			sResult.append(month);
			sResult.append("-");
		}
		if (date < 10) {
			sResult.append(0);
			sResult.append(date);
			sResult.append(" ");
		} else {
			sResult.append(date);
			sResult.append(" ");
		}
		if (hour < 10) {
			sResult.append(0);
			sResult.append(hour);
			sResult.append(":");
		} else {
			sResult.append(hour);
			sResult.append(":");
		}
		if (minute < 10) {
			sResult.append(0);
			sResult.append(minute);
			sResult.append(":");
		} else {
			sResult.append(minute);
			sResult.append(":");
		}
		if (second < 10) {
			sResult.append(0);
			sResult.append(second);
		} else {
			sResult.append(second);
		}
		return sResult.toString();
	}

	public static String getYYYYMMDD() {
		// ����ʱ����Ӧ ������
		String[] ids = TimeZone.getAvailableIDs(-8 * 60 * 60 * 1000);
		// if no ids were returned, something is wrong. get out.
		if (ids.length == 0)
			ids[0] = "Asia/Shanghai";
		// System.out.println("time zone="+TimeZone.getDefault());
		// create a Pacific Standard Time time zone
		SimpleTimeZone pdt = new SimpleTimeZone(8 * 60 * 60 * 1000, ids[0]);

		GregorianCalendar sdate = new GregorianCalendar(pdt, new Locale("CHINESE ", "CHINA"));

		int year = sdate.get(Calendar.YEAR);
		int month = sdate.get(Calendar.MONTH) + 1;
		int date = sdate.get(Calendar.DATE);
		String Result = new String();
		Result += year;
		if (month < 10) {
			Result += 0;
			Result += month;
		} else {
			Result += month;
		}
		if (date < 10) {
			Result += 0;
			Result += date;
		} else {
			Result += date;
		}
		return Result;
	}


}
