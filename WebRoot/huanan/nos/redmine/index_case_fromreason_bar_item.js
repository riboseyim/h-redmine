


function index_case_fromreason_bar_item_option() {

	var option = {
		title : {
			text : 'CASE原因'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['系统可靠性','程序bug','数据核查','待确定','易用性不足','人为误操作','无','第三方问题','配置核查']
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
			data : ['IP地址管理','业务开通','设备通用配置下发','服务器硬件','故障管理','资源管理','操作系统','电子工单','维护作业计划','流量管理','AAA管理','数据库','系统管理','配置文件管理','其他','网管系统自身','报表管理','设备性能']
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
		yAxis : [{type : 'value',name : '总工时',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}}],
		series : [{ 
 name:'系统可靠性', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(40,80,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,0,0,0,0,0,0,0,11.0,0,0,0,0,0] 
}  
,{ name:'系统可靠性', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0]} 
,{ 
 name:'程序bug', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(65,120,7,5)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,3.0,0,0,0,0,3.0,0,0,0,1.5,6.0,1.0,0,0] 
}  
,{ name:'程序bug', type:'line',yAxisIndex: 1,data:[0,0,0,0,3,0,0,0,0,1,0,0,0,1,3,1,0,0]} 
,{ 
 name:'数据核查', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(90,160,12,9)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,8.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
}  
,{ name:'数据核查', type:'line',yAxisIndex: 1,data:[0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]} 
,{ 
 name:'待确定', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(115,200,17,13)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,16.0,0,0,0,0,0,0,0,7.5,0,0,0,0,0,0] 
}  
,{ name:'待确定', type:'line',yAxisIndex: 1,data:[0,0,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0]} 
,{ 
 name:'易用性不足', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(140,240,22,17)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,24.0,12.0,0,6.0,2.0,0,0,15.0,0,1.5,0,0,0,0,0,0,0] 
}  
,{ name:'易用性不足', type:'line',yAxisIndex: 1,data:[0,5,4,0,2,2,0,0,7,0,2,0,0,0,0,0,0,0]} 
,{ 
 name:'人为误操作', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(165,280,27,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,0,13.0,0,0,0,0,0,0,0,0,0,0,3.0] 
}  
,{ name:'人为误操作', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,2]} 
,{ 
 name:'无', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(190,320,32,25)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,1.0,0,0,4.5,0,0,0,0,0,0,0,0,5.0,4.0,7.5,0] 
}  
,{ name:'无', type:'line',yAxisIndex: 1,data:[0,0,1,0,0,3,0,0,0,0,0,0,0,0,2,3,4,0]} 
,{ 
 name:'第三方问题', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(215,360,37,29)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,0,0,1.0,0,0,0,0,0,0,2.5,0,0,0] 
}  
,{ name:'第三方问题', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0]} 
,{ 
 name:'配置核查', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(240,400,42,33)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[2.0,0,0,0,2.0,8.0,0,0,1.5,0,2.0,0,0,0,0,0,0,0] 
}  
,{ name:'配置核查', type:'line',yAxisIndex: 1,data:[1,0,0,0,1,4,0,0,1,0,1,0,0,0,0,0,0,0]} 
]
	};

	return option;
}
