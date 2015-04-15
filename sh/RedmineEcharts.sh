#!/bin/sh
#AUTHOR:YANRUI
#CREATE:2015-04-01
#Echarts统计图表更新

os=`uname`

echo os;

	ps -auxww |grep com.zhongying.huanan.product.redmine.echarts.GenRedmineChartsClient|grep -v grep|grep java|cut -b10-14 >pnum1
	while read id
	do
	    echo exit 1
	        echo com.zhongying.huanan.product.redmine.echarts.GenRedmineChartsClient is running >> /slview/nms/service/GDAdslLan/running.txt
	        exit 1
	done < pnum1
	rm pnum1



SERVICE_HOME=/slview/redmine2/apps/report/

CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar

cd ${SERVICE_HOME}

LIBHOME="${SERVICE_HOME}/lib/*.jar"

for jarfile in ${LIBHOME}

do 

        CLASSPATH=$CLASSPATH:"${jarfile}"

done

echo CLASSPATH=$CLASSPATH

export CLASSPATH

echo now dir:`pwd`

#cd lib
LANG=zh_CN.gb2312
echo '-------------1'
export LANG

echo '-------------2'
# ${JAVA_HOME}/bin/java com.zhongying.huanan.product.redmine.echarts.GenRedmineChartsClient 

java com.zhongying.huanan.product.redmine.echarts.GenRedmineChartsClient 
 
echo '-------------3'
