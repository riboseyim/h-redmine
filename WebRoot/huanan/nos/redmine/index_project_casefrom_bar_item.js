


function index_project_casefrom_bar_item_option() {

	var option = {
		title : {
			text : 'CASE来源'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['IP地址管理','业务开通','设备通用配置下发','服务器硬件','故障管理','资源管理','操作系统','电子工单','维护作业计划','流量管理','AAA管理','数据库','系统管理','配置文件管理','其他','网管系统自身','报表管理','设备性能']
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
			data : ['云南电信IP网管','广东移动局数据系统','广东电信IP网管','广西电信IPRAN网管','广西电信IP网管','广西电信PON网管']
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
		yAxis : [{type : 'value',name : '总工时',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}},{type : 'value',name : '数量',axisLabel : {formatter : '{value} 个'}}],
		series : [{ 
 name:'IP地址管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(40,80,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,2.0,0] 
}  
,{ name:'IP地址管理', type:'line',yAxisIndex: 1,data:[0,0,0,0,1,0]} 
,{ 
 name:'业务开通', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(65,120,7,5)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,24.0,0,0,0] 
}  
,{ name:'业务开通', type:'line',yAxisIndex: 1,data:[0,0,5,0,0,0]} 
,{ 
 name:'设备通用配置下发', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(90,160,12,9)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,1.0,8.0,0,12.0] 
}  
,{ name:'设备通用配置下发', type:'line',yAxisIndex: 1,data:[0,0,1,4,0,4]} 
,{ 
 name:'服务器硬件', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(115,200,17,13)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,16.0] 
}  
,{ name:'服务器硬件', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,1]} 
,{ 
 name:'故障管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(140,240,22,17)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[2.0,0,8.5,6.0,3.0,0] 
}  
,{ name:'故障管理', type:'line',yAxisIndex: 1,data:[1,0,4,2,3,0]} 
,{ 
 name:'资源管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(165,280,27,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[8.0,0,4.5,8.0,2.0,0] 
}  
,{ name:'资源管理', type:'line',yAxisIndex: 1,data:[3,0,3,4,2,0]} 
,{ 
 name:'操作系统', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(190,320,32,25)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,13.0,0,0,0] 
}  
,{ name:'操作系统', type:'line',yAxisIndex: 1,data:[0,0,5,0,0,0]} 
,{ 
 name:'电子工单', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(215,360,37,29)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,1.0,0] 
}  
,{ name:'电子工单', type:'line',yAxisIndex: 1,data:[0,0,0,0,1,0]} 
,{ 
 name:'维护作业计划', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(240,400,42,33)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[1.5,0,0,0,0,15.0] 
}  
,{ name:'维护作业计划', type:'line',yAxisIndex: 1,data:[1,0,0,0,0,7]} 
,{ 
 name:'流量管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(265,440,47,37)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,3.0,0] 
}  
,{ name:'流量管理', type:'line',yAxisIndex: 1,data:[0,0,0,0,1,0]} 
,{ 
 name:'AAA管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(290,480,52,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,1.5,0,2.0,0] 
}  
,{ name:'AAA管理', type:'line',yAxisIndex: 1,data:[0,0,2,0,1,0]} 
,{ 
 name:'数据库', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(315,520,57,45)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,7.5,11.5] 
}  
,{ name:'数据库', type:'line',yAxisIndex: 1,data:[0,0,0,0,3,1]} 
,{ 
 name:'系统管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(340,560,62,49)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,11.0,0,0] 
}  
,{ name:'系统管理', type:'line',yAxisIndex: 1,data:[0,0,0,2,0,0]} 
,{ 
 name:'配置文件管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(365,600,67,53)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[1.5,0,0,0,0,0] 
}  
,{ name:'配置文件管理', type:'line',yAxisIndex: 1,data:[1,0,0,0,0,0]} 
,{ 
 name:'其他', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(390,640,72,57)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[5.0,2.5,6.0,0,7.5,0] 
}  
,{ name:'其他', type:'line',yAxisIndex: 1,data:[2,2,3,0,4,0]} 
,{ 
 name:'网管系统自身', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(415,680,77,61)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,4.0,1.0,0] 
}  
,{ name:'网管系统自身', type:'line',yAxisIndex: 1,data:[0,0,0,3,1,0]} 
,{ 
 name:'报表管理', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(440,720,82,65)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,7.5,0,0,0] 
}  
,{ name:'报表管理', type:'line',yAxisIndex: 1,data:[0,0,4,0,0,0]} 
,{ 
 name:'设备性能', type:'bar',   tooltip : {trigger: 'item'},    stack: '总工时',itemStyle : {	normal : {		color : 'rgba(465,760,87,69)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,3.0,0,0,0] 
}  
,{ name:'设备性能', type:'line',yAxisIndex: 1,data:[0,0,2,0,0,0]} 
]
	};

	return option;
}
