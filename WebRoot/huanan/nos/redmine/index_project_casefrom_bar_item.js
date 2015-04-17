


function index_project_casefrom_bar_item_option() {

	var option = {
		title : {
			text : 'CASE��Դ'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['IP��ַ����','ҵ��ͨ','�豸ͨ�������·�','������Ӳ��','���Ϲ���','��Դ����','����ϵͳ','���ӹ���','ά����ҵ�ƻ�','��������','AAA����','���ݿ�','ϵͳ����','�����ļ�����','����','����ϵͳ����','�������','�豸����']
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
			data : ['���ϵ���IP����','�㶫�ƶ�������ϵͳ','�㶫����IP����','��������IPRAN����','��������IP����','��������PON����']
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
		yAxis : [{type : 'value',name : '�ܹ�ʱ',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}}],
		series : [{ 
 name:'IP��ַ����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(40,80,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,2.0,0] 
}  
,{ name:'IP��ַ����', type:'line',yAxisIndex: 1,data:[0,0,0,0,1,0]} 
,{ 
 name:'ҵ��ͨ', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(65,120,7,5)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,24.0,0,0,0] 
}  
,{ name:'ҵ��ͨ', type:'line',yAxisIndex: 1,data:[0,0,5,0,0,0]} 
,{ 
 name:'�豸ͨ�������·�', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(90,160,12,9)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,1.0,8.0,0,12.0] 
}  
,{ name:'�豸ͨ�������·�', type:'line',yAxisIndex: 1,data:[0,0,1,4,0,4]} 
,{ 
 name:'������Ӳ��', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(115,200,17,13)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,16.0] 
}  
,{ name:'������Ӳ��', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,1]} 
,{ 
 name:'���Ϲ���', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(140,240,22,17)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[2.0,0,8.5,6.0,3.0,0] 
}  
,{ name:'���Ϲ���', type:'line',yAxisIndex: 1,data:[1,0,4,2,3,0]} 
,{ 
 name:'��Դ����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(165,280,27,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[8.0,0,4.5,8.0,2.0,0] 
}  
,{ name:'��Դ����', type:'line',yAxisIndex: 1,data:[3,0,3,4,2,0]} 
,{ 
 name:'����ϵͳ', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(190,320,32,25)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,13.0,0,0,0] 
}  
,{ name:'����ϵͳ', type:'line',yAxisIndex: 1,data:[0,0,5,0,0,0]} 
,{ 
 name:'���ӹ���', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(215,360,37,29)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,1.0,0] 
}  
,{ name:'���ӹ���', type:'line',yAxisIndex: 1,data:[0,0,0,0,1,0]} 
,{ 
 name:'ά����ҵ�ƻ�', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(240,400,42,33)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[1.5,0,0,0,0,15.0] 
}  
,{ name:'ά����ҵ�ƻ�', type:'line',yAxisIndex: 1,data:[1,0,0,0,0,7]} 
,{ 
 name:'��������', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(265,440,47,37)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,3.0,0] 
}  
,{ name:'��������', type:'line',yAxisIndex: 1,data:[0,0,0,0,1,0]} 
,{ 
 name:'AAA����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(290,480,52,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,1.5,0,2.0,0] 
}  
,{ name:'AAA����', type:'line',yAxisIndex: 1,data:[0,0,2,0,1,0]} 
,{ 
 name:'���ݿ�', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(315,520,57,45)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,7.5,11.5] 
}  
,{ name:'���ݿ�', type:'line',yAxisIndex: 1,data:[0,0,0,0,3,1]} 
,{ 
 name:'ϵͳ����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(340,560,62,49)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,11.0,0,0] 
}  
,{ name:'ϵͳ����', type:'line',yAxisIndex: 1,data:[0,0,0,2,0,0]} 
,{ 
 name:'�����ļ�����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(365,600,67,53)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[1.5,0,0,0,0,0] 
}  
,{ name:'�����ļ�����', type:'line',yAxisIndex: 1,data:[1,0,0,0,0,0]} 
,{ 
 name:'����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(390,640,72,57)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[5.0,2.5,6.0,0,7.5,0] 
}  
,{ name:'����', type:'line',yAxisIndex: 1,data:[2,2,3,0,4,0]} 
,{ 
 name:'����ϵͳ����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(415,680,77,61)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,4.0,1.0,0] 
}  
,{ name:'����ϵͳ����', type:'line',yAxisIndex: 1,data:[0,0,0,3,1,0]} 
,{ 
 name:'�������', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(440,720,82,65)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,7.5,0,0,0] 
}  
,{ name:'�������', type:'line',yAxisIndex: 1,data:[0,0,4,0,0,0]} 
,{ 
 name:'�豸����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(465,760,87,69)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,3.0,0,0,0] 
}  
,{ name:'�豸����', type:'line',yAxisIndex: 1,data:[0,0,2,0,0,0]} 
]
	};

	return option;
}
