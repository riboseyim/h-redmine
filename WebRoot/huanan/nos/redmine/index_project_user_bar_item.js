


function index_project_user_bar_item_option() {

	var option = {
		title : {
			text : '项目人员'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['滕承仁','严睿','钟晓','吕坚伟','黄彪']
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
		yAxis : [{type : 'value',name : '总工时',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}}],
		series : [{ 
 name:'滕承仁', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(80,80,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,135.0] 
}  
,{ name:'滕承仁', type:'line',yAxisIndex: 1,data:[0,0,0,0,23]} 
,{ 
 name:'严睿', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(130,120,22,11)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,64.0,69.0,0,0] 
}  
,{ name:'严睿', type:'line',yAxisIndex: 1,data:[0,17,29,0,0]} 
,{ 
 name:'钟晓', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(180,160,42,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,77.0,0] 
}  
,{ name:'钟晓', type:'line',yAxisIndex: 1,data:[0,0,0,25,0]} 
,{ 
 name:'吕坚伟', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(230,200,62,31)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,119.0,0,0] 
}  
,{ name:'吕坚伟', type:'line',yAxisIndex: 1,data:[0,0,23,0,0]} 
,{ 
 name:'黄彪', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(280,240,82,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[67.0,0,0,0,0] 
}  
,{ name:'黄彪', type:'line',yAxisIndex: 1,data:[12,0,0,0,0]} 
]
	};

	return option;
}
