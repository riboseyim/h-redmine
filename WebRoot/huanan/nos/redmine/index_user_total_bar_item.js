


function index_user_total_bar_item_option() {

	var option = {
		title : {
			text : '�������ݷֲ�'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : ['��������','CASE����','ʵʩ����','�ڲ�����']
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
			data : ['���','������','����ΰ','������','�Ʊ�','�ι���','����','������','������','�����','��ΰ','��ΰ','�����']
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
		yAxis : [{type : 'value',name : '�ܹ�ʱ',axisLabel : {formatter : '{value} h'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}},{type : 'value',name : '����',axisLabel : {formatter : '{value} ��'}}],
		series : [{ 
 name:'��������', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(80,120,52,1)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[59.0,63.0,67.5,34.0,56.0,8.0,0,40.0,0,39.5,0,0,3.0] 
}  
,{ name:'��������', type:'line',yAxisIndex: 1,data:[9,14,9,3,23,2,0,9,0,15,0,0,1]} 
,{ 
 name:'CASE����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(180,200,102,41)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[19.5,4.0,20.5,11.0,15.0,67.0,60.0,0,37.0,14.5,33.5,12.0,27.5] 
}  
,{ name:'CASE����', type:'line',yAxisIndex: 1,data:[5,2,10,5,7,28,33,0,5,6,16,6,12]} 
,{ 
 name:'ʵʩ����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(280,280,152,81)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[7.5,1.0,5.0,31.0,4.0,56.0,37.0,43.0,82.0,72.5,52.0,7.0,58.5] 
}  
,{ name:'ʵʩ����', type:'line',yAxisIndex: 1,data:[3,1,3,10,2,13,18,1,17,22,10,2,20]} 
,{ 
 name:'�ڲ�����', type:'bar',   tooltip : {trigger: 'item'},    stack: '�ܹ�ʱ',itemStyle : {	normal : {		color : 'rgba(380,360,202,121)',		label : {			show : false,			textStyle : {				color : '#27727B'			}		}	}},   
 data:[13.5,0,3.0,0,0,0,0,0,0,0,0,0,0] 
}  
,{ name:'�ڲ�����', type:'line',yAxisIndex: 1,data:[4,0,1,0,0,0,0,0,0,0,0,0,0]} 
]
	};

	return option;
}
