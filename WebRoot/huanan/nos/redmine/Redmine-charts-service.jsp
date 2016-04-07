<%@ page language="java" contentType="text/html; charset=GB2312" pageEncoding="GB2312" %>
<%@ page import="java.util.*,java.lang.reflect.*,javax.servlet.http.*" %>
<%@ page import="com.zhongying.huanan.product.redmine.echarts.GenRedmineChartsClient" %>
<%@ page import="com.zhongying.huanan.product.redmine.util.*" %>
<%@ page import="java.io.File" %>


<%
  String methodName = request.getParameter("methodName");
  try{
      Class[] argsClass = new Class[2]; 
      argsClass[0] = HttpServletRequest.class;
      argsClass[1] = HttpServletResponse.class;
      Class cls = this.getClass();   
      Method method = cls.getMethod(methodName, argsClass);   
      Object[] args = new Object[2];
      args[0] = request;
      args[1] = response;   
      BeforeInvoke(methodName);
      method.invoke(this, args);
      AfterInvoke(methodName);
  } catch(Exception e){
      response.reset();
      response.getWriter().write(e.getMessage());
  } finally{
      AfterInvoke(methodName);
  }
%>

<%!

protected void BeforeInvoke(String methodName){
  //System.out.println(methodName+" is called!");
}

protected void AfterInvoke(String methodName){
  //System.out.println(methodName+" is ended!");
}

public void UpdateRedmineIndexHTML(HttpServletRequest request,HttpServletResponse response) throws Exception{
    String beginDate = request.getParameter("beginDate");
    String endDate = request.getParameter("endDate");
    
    System.err.println(beginDate);
    
    GenRedmineChartsClient client = new GenRedmineChartsClient();
    String result = client.UpdateRedmineIndexHTML_Month();
    //System.out.println(result);
    response.getWriter().write(result);
}


public void saveEChartsImage(HttpServletRequest request,HttpServletResponse response) throws Exception{
    String imageName = request.getParameter("imageName");
    String imageData = request.getParameter("imageData");
    
    //System.err.println(imageData);
    
    imageData=imageData.substring(imageData.indexOf(",")+1,imageData.length());
    
    System.err.println(new Date()+"--\n"+imageData);
    
    String imgFilePath=findProperties("EchartsImagePath")+File.separator+imageName;
    
    GenRedmineChartsClient client = new GenRedmineChartsClient();
    String result = client.saveChartsImage(imgFilePath, imageData);
    //System.out.println(result);
    response.getWriter().write(result);
}


public String findProperties(String propName){
 		ReadFile config = ReadFile.getInstance();

		Properties prop = config.getConfigFile(RedmineConfig.configFile);

		String propValue = prop.getProperty(propName);

		
		System.err.println(propName+"----"+propValue);
		
		return propValue;
}

%>