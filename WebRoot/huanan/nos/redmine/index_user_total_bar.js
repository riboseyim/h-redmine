

function index_user_total_bar_option(){
	
	var option = {
			title:{
				text:'总量合格率'
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
		        data:[]
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
     name:'总计',type:'bar',markPoint : {data : [{type : 'max', name: '最大值'}]},markPoint : {data : [{type : 'min', name: '最小值'}]},markLine : { data : [{type : 'average', name: '平均值'}]},   
 data:[83.5,68.0,57.0,76.0,75.0,111.0,92.0,83.0,97.0,126.5,24.5,75.5] 
}  
]
		};
		                    
	return option;
}


