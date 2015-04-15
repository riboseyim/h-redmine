


function index_user_total_bar_item_option() {

	var option = {
		title : {
			text : '工作内容分布比例'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['开发流程','CASE流程','实施流程','内部流程']
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
		    	x2:30,
		    	y2:40
		},
		xAxis : [ {
			type : 'category',
			data : ['严睿','吕坚伟','张宁烽','何广生','钟晓','刘本晖','滕承仁','杨济忠','林伟','李宇锋']
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
		yAxis : [{type : 'value',name : '总工时',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}}],
		series : [{ 
 name:'开发流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(121,195,52,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[38.5,39.5,4.0,4.0,0,15.0,0,35.0,0,3.0] 
}  
,{ name:'开发流程', type:'line',yAxisIndex: 1,data:[9,4,1,1,0,7,0,14,0,1]} 
,{ 
 name:'CASE流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(171,215,72,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[19.5,3.0,0,47.0,54.0,0,34.0,10.0,16.0,8.5] 
}  
,{ name:'CASE流程', type:'line',yAxisIndex: 1,data:[5,3,0,19,31,0,4,3,10,5]} 
,{ 
 name:'实施流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(221,235,92,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,2.0,4.0,55.0,28.0,26.0,52.0,61.5,4.0,17.0] 
}  
,{ name:'实施流程', type:'line',yAxisIndex: 1,data:[0,1,1,12,13,1,8,18,2,5]} 
,{ 
 name:'内部流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(271,255,112,61)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[16.5,0,0,0,0,0,0,0,0,0] 
}  
,{ name:'内部流程', type:'line',yAxisIndex: 1,data:[6,0,0,0,0,0,0,0,0,0]} 
]
	};

	return option;
}
