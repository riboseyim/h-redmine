


function index_project_trace_bar_item_option() {

	var option = {
		title : {
			text : '项目成分'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['实施流程','CASE流程','开发流程']
		},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : true,
		grid : {
			x:40,
		    	y:45,
		    	x2:40,
		    	y2:40
		},
		xAxis : [ {
			type : 'category',
			data : ['云南电信IP网管','广东移动局数据系统','广东电信IP网管','广西电信IP网管','广西电信PON网管']
		}, {
			type : 'category',
			axisLine : {
				show : false
			},
			axisTick : {
				show : false
			},
			axisLabel : {
				show : false
			},
			splitArea : {
				show : false
			},
			splitLine : {
				show : false
			},
			data : [ 'Line', 'Bar', 'Scatter', 'K', 'Map' ]
		} ],
		yAxis : [{type : 'value',name : '总工时',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}}],
		series : [{ 
 name:'实施流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(80,120,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,77.0,135.0] 
}  
,{ name:'实施流程', type:'line',yAxisIndex: 1,data:[0,0,0,25,23]} 
,{ 
 name:'CASE流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(180,200,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,69.0,0,0] 
}  
,{ name:'CASE流程', type:'line',yAxisIndex: 1,data:[0,0,29,0,0]} 
,{ 
 name:'开发流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(280,280,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[67.0,64.0,119.0,0,0] 
}  
,{ name:'开发流程', type:'line',yAxisIndex: 1,data:[12,17,23,0,0]} 
]
	};

	return option;
}
