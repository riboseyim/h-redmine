


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
		    	x2:40,
		    	y2:40
		},
		xAxis : [ {
			type : 'category',
			data : ['严睿','聂树明','吕坚伟','张宁烽','黄彪','何广生','钟晓','刘本晖','滕承仁','杨济忠','林伟','李宇锋']
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
 data:[47.5,39.0,52.0,34.0,56.0,4.0,0,40.0,0,39.5,0,3.0] 
}  
,{ name:'开发流程', type:'line',yAxisIndex: 1,data:[9,11,6,3,23,1,0,9,0,15,0,1]} 
,{ 
 name:'CASE流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(171,215,72,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[19.5,4.0,3.0,11.0,15.0,51.0,58.0,0,35.0,14.5,20.5,27.5] 
}  
,{ name:'CASE流程', type:'line',yAxisIndex: 1,data:[5,2,3,5,7,21,32,0,5,6,12,12]} 
,{ 
 name:'实施流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(221,235,92,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[6.0,1.0,2.0,31.0,4.0,56.0,34.0,43.0,62.0,72.5,4.0,45.0] 
}  
,{ name:'实施流程', type:'line',yAxisIndex: 1,data:[2,1,1,10,2,13,17,1,11,22,2,13]} 
,{ 
 name:'内部流程', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(271,255,112,61)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[10.5,0,0,0,0,0,0,0,0,0,0,0] 
}  
,{ name:'内部流程', type:'line',yAxisIndex: 1,data:[4,0,0,0,0,0,0,0,0,0,0,0]} 
]
	};

	return option;
}
