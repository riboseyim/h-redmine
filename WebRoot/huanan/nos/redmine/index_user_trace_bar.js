

function index_user_trace_bar_option(){
	
	var option = {
			title:{
				text:'人员工时分布'
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
		        data:['开发流程','CASE流程','实施流程','内部流程']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['严睿','聂树明','吕坚伟','张宁烽','黄彪','何广生','钟晓','刘本晖','滕承仁','杨济忠','林伟','李宇锋']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : '工时',
		            axisLabel : {
		                formatter: '{value} H'
		            }
		        },
		        {
		            type : 'value',
		            name : 'CASE处理',
		            axisLabel : {
		                formatter: '{value} H'
		            }
		        }
		    ],
		    series : [{ 
     name:'开发流程',type:'bar',   
 data:[47.5,63.0,52.0,34.0,56.0,4.0,0,40.0,0,39.5,0,3.0] 
}  
,{ 
     name:'CASE流程',type:'line',yAxisIndex: 1,markPoint : {data : [{type : 'max', name: '最大值'}]},   
 data:[19.5,4.0,3.0,11.0,15.0,51.0,58.0,0,35.0,14.5,20.5,27.5] 
}  
,{ 
     name:'实施流程',type:'bar',   
 data:[6.0,1.0,2.0,31.0,4.0,56.0,34.0,43.0,62.0,72.5,4.0,45.0] 
}  
,{ 
     name:'内部流程',type:'bar',   
 data:[10.5,0,0,0,0,0,0,0,0,0,0,0] 
}  
]
		};
		                    
	return option;
}


