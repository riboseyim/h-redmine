package com.zhongying.huanan.product.echarts.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class EChartsDateUtil {
	public static void main(String[] args) {
		System.out.println(getMonthFirstDay());
		System.out.println(getMonthLastDay());
	}
	/**  
	 * �õ����µĵ�һ��  
	 * @return  
	 */  
	public static String getMonthFirstDay() {   
	    Calendar calendar = Calendar.getInstance();   
	    calendar.set(Calendar.DAY_OF_MONTH, calendar   
	            .getActualMinimum(Calendar.DAY_OF_MONTH));   
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	    String str=df.format(calendar.getTime());
	  
	    return str;
	}   
	  
	/**  
	 * �õ����µ����һ��  
	 *   
	 * @return  
	 */  
	public static String getMonthLastDay() {   
	    Calendar calendar = Calendar.getInstance();   
	    calendar.set(Calendar.DAY_OF_MONTH, calendar   
	            .getActualMaximum(Calendar.DAY_OF_MONTH));   
	    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	    String str=df.format(calendar.getTime());
	  
	    return str;  
	}   
}
