<#--- 
Redmine--������ͼ
index-user-tobar-option.ftl
ģ��
create:2015-04-13
-->


function index_user_total_bar_option(){
	
	var option = {
			title:{
				text:'${index_user_total_bar_name}'
			},
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    grid:{
		    		x:40,
		    	y:45,
		    	x2:30,
		    	y2:30
		    },
		    calculable : true,
		    legend: {
		        data:[${index_user_total_bar_keys}]
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [${index_user_total_bar_usernames}]
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : '��ʱ',
		            axisLabel : {
		                formatter: '{value} H'
		            }
		        },
		        {
		            type : 'value',
		            name : 'CASE����',
		            axisLabel : {
		                formatter: '{value} H'
		            }
		        }
		    ],
		    series : [${index_user_total_bar_data}]
		};
		                    
	return option;
}


