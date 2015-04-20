


function index_project_trace_bar_item_option() {

	var option = {
		title : {
			text : '��Ŀ�ɷ�'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['ʵʩ����','CASE����','��������']
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
		yAxis : [{type : 'value',name : '�ܹ�ʱ',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}}],
		series : [{ 
 name:'ʵʩ����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(80,120,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,0,77.0,135.0] 
}  
,{ name:'ʵʩ����', type:'line',yAxisIndex: 1,data:[0,0,0,25,23]} 
,{ 
 name:'CASE����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(180,200,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[0,0,69.0,0,0] 
}  
,{ name:'CASE����', type:'line',yAxisIndex: 1,data:[0,0,29,0,0]} 
,{ 
 name:'��������', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(280,280,2,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[67.0,64.0,119.0,0,0] 
}  
,{ name:'��������', type:'line',yAxisIndex: 1,data:[12,17,23,0,0]} 
]
	};

	return option;
}
