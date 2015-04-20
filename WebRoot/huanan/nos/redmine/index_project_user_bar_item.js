


function index_project_user_bar_item_option() {

	var option = {
		title : {
			text : '��Ŀ��Ա'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['������','���','����','����ΰ','�Ʊ�']
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
			data : ['���ϵ���IP����','�㶫�ƶ�������ϵͳ','�㶫����IP����','��������IP����','��������PON����']
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
		yAxis : [{type : 'value',name : '�ܹ�ʱ',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}}],
		series : [{ 
 name:'������', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(80,80,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,0,135.0] 
}  
,{ name:'������', type:'line',yAxisIndex: 1,data:[0,0,0,0,23]} 
,{ 
 name:'���', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(130,120,22,11)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,64.0,69.0,0,0] 
}  
,{ name:'���', type:'line',yAxisIndex: 1,data:[0,17,29,0,0]} 
,{ 
 name:'����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(180,160,42,21)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,77.0,0] 
}  
,{ name:'����', type:'line',yAxisIndex: 1,data:[0,0,0,25,0]} 
,{ 
 name:'����ΰ', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(230,200,62,31)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,119.0,0,0] 
}  
,{ name:'����ΰ', type:'line',yAxisIndex: 1,data:[0,0,23,0,0]} 
,{ 
 name:'�Ʊ�', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(280,240,82,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[67.0,0,0,0,0] 
}  
,{ name:'�Ʊ�', type:'line',yAxisIndex: 1,data:[12,0,0,0,0]} 
]
	};

	return option;
}
