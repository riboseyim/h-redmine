package com.zhongying.huanan.product.redmine.echarts;

import java.text.DecimalFormat;

import com.zhongying.huanan.product.echarts.util.Base64Image;

/**
 * 
 * @author 严睿
 * @since 2015-04
 * 
 * */

public class GenRedmineChartsClient {
	public static void main(String[] args) {
		GenRedmineJS.UpdateRedmineIndexHTML_Month();
	}
	
	public String UpdateRedmineIndexHTML_Month(){
		
		GenRedmineJS.UpdateRedmineIndexHTML_Month();
		
		return "SUCCESS";
	}
	
	
	/**
	 * HTML统计图表自动保存
	 * */
	public String saveChartsImage(String imgFilePath, String imageData){
		Base64Image.ConvertEChartsImage(imageData, imgFilePath);
		return "SUCCESS";
	}
	
	public static String getSqlStrOfArray(String array[]) {
		if (array.length == 0)
			return "";
		String str = "";
		for (int i = 0; i < array.length; i++){
			if (i == array.length - 1){
				str = (new StringBuilder(String.valueOf(str))).append(array[i])
				.toString();
			}else{
				str = (new StringBuilder(String.valueOf(str))).append(array[i]).append(",").toString();
			}			
		}
		return str;
	}

	
	 /**
     * 格式化json字符串
     * @param str
     * @return
     */
    public String formatJSONStr(String str){
        return str.replaceAll(":", "：").replaceAll("\\s"," ");
    }
    /**
     * 格式化数字
     * @param d
     * @return
     */
    public String formatDouble(Double d){
        String result = "";
        DecimalFormat df=new DecimalFormat("0.00");
        if(null==d){
            result = "null";
        }else{
            result = df.format(d);  
        }
        return result;
    }

	


}
