package com.zhongying.huanan.product.echarts.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Iterator;

public class EChartsUtil {
	public static void main(String[] args) {
		System.out.println(getMonthFirstDay());
		System.out.println(getMonthLastDay());
	}
	
	public static void testSet() {

		HashSet set = new HashSet();

		set.add("��������");
		set.add("��������");
		set.add("ʵʩ����");

		System.out.println(convertSetString(set,"'"));

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
	


	public static String convertSetString(HashSet set,String segChar) {
		String str = "";
		if (set != null) {
			int i = 0;
			for (Iterator iterator = set.iterator(); iterator.hasNext();) {
				String object = (String) iterator.next();
			//	System.out.println(object);
				
				if(segChar!=null&&"".equals(segChar)==false){
					str += segChar + object + segChar;
				}else{
					str +=  object ;
				}
				
				
				if (i < set.size() - 1) {
					str += ",";
				}
				i++;
			}
		}
		return str;
	}
}
