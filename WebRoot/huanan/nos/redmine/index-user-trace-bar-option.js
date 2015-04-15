

function index_user_trace_bar_option(){
	
	var option = {
			title:{
				text:'��Ա��ʱ�ֲ�'
			},
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    grid:{
		    	x:40,
		    	y:45,
		    	x2:10,
		    	y2:5,
		    	width:700,
		    	height:300
		    },
		    calculable : true,
		    legend: {
		        data:['��������','CASE����','ʵʩ����','�ڲ�����']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['���','����ΰ','������','�ι���','����','������','������','�����','��ΰ','�����']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : '��ʱ',
		            axisLabel : {
		                formatter: '{value} H'
		            }
		        },
		        {
		            type : 'value',
		            name : 'CASE����',
		            axisLabel : {
		                formatter: '{value} H'
		            }
		        }
		    ],
		    series : [{ 
     name:'��������',type:'bar',   
 data:[38.5,39.5,4.0,4.0,0,15.0,0,35.0,0,3.0] 
}  
,{ 
     name:'CASE����',type:'line',yAxisIndex: 1,markPoint : {data : [{type : 'max', name: '���ֵ'}]},   
 data:[19.5,3.0,0,47.0,54.0,0,34.0,10.0,16.0,8.5] 
}  
,{ 
     name:'ʵʩ����',type:'bar',   
 data:[0,2.0,4.0,55.0,28.0,26.0,52.0,61.5,4.0,17.0] 
}  
,{ 
     name:'�ڲ�����',type:'bar',   
 data:[16.5,0,0,0,0,0,0,0,0,0] 
}  
]
		};
		                    
	return option;
}


