


function index_case_fromreason_bar_item_option() {

	var option = {
		title : {
			text : 'CASEԭ��'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['ϵͳ�ɿ���','����bug','���ݺ˲�','��ȷ��','�����Բ���','��Ϊ�����','��','����������','���ú˲�']
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
			data : ['IP��ַ����','ҵ��ͨ','�豸ͨ�������·�','������Ӳ��','���Ϲ���','��Դ����','����ϵͳ','���ӹ���','ά����ҵ�ƻ�','��������','AAA����','���ݿ�','ϵͳ����','�����ļ�����','����','����ϵͳ����','�������','�豸����']
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
		yAxis : [{type : 'value',name : '�ܹ�ʱ',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}}],
		series : [{ 
 name:'ϵͳ�ɿ���', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(40,80,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,0,0,0,0,0,0,0,11.0,0,0,0,0,0] 
}  
,{ name:'ϵͳ�ɿ���', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0]} 
,{ 
 name:'����bug', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(65,120,7,5)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,3.0,0,0,0,0,3.0,0,0,0,1.5,6.0,1.0,0,0] 
}  
,{ name:'����bug', type:'line',yAxisIndex: 1,data:[0,0,0,0,3,0,0,0,0,1,0,0,0,1,3,1,0,0]} 
,{ 
 name:'���ݺ˲�', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(90,160,12,9)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,8.0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
}  
,{ name:'���ݺ˲�', type:'line',yAxisIndex: 1,data:[0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]} 
,{ 
 name:'��ȷ��', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(115,200,17,13)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,16.0,0,0,0,0,0,0,0,7.5,0,0,0,0,0,0] 
}  
,{ name:'��ȷ��', type:'line',yAxisIndex: 1,data:[0,0,0,1,0,0,0,0,0,0,0,3,0,0,0,0,0,0]} 
,{ 
 name:'�����Բ���', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(140,240,22,17)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,24.0,12.0,0,6.0,2.0,0,0,15.0,0,1.5,0,0,0,0,0,0,0] 
}  
,{ name:'�����Բ���', type:'line',yAxisIndex: 1,data:[0,5,4,0,2,2,0,0,7,0,2,0,0,0,0,0,0,0]} 
,{ 
 name:'��Ϊ�����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(165,280,27,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,0,13.0,0,0,0,0,0,0,0,0,0,0,3.0] 
}  
,{ name:'��Ϊ�����', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,2]} 
,{ 
 name:'��', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(190,320,32,25)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,1.0,0,0,4.5,0,0,0,0,0,0,0,0,5.0,4.0,7.5,0] 
}  
,{ name:'��', type:'line',yAxisIndex: 1,data:[0,0,1,0,0,3,0,0,0,0,0,0,0,0,2,3,4,0]} 
,{ 
 name:'����������', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(215,360,37,29)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,0,0,0,1.0,0,0,0,0,0,0,2.5,0,0,0] 
}  
,{ name:'����������', type:'line',yAxisIndex: 1,data:[0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0]} 
,{ 
 name:'���ú˲�', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(240,400,42,33)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[2.0,0,0,0,2.0,8.0,0,0,1.5,0,2.0,0,0,0,0,0,0,0] 
}  
,{ name:'���ú˲�', type:'line',yAxisIndex: 1,data:[1,0,0,0,1,4,0,0,1,0,1,0,0,0,0,0,0,0]} 
]
	};

	return option;
}
