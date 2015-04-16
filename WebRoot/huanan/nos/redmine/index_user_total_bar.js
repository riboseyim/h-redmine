

function index_user_total_bar_option(){
	
	var option = {
			title:{
				text:'�����ϸ���'
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
		    	x2:30,
		    	y2:30
		    },
		    calculable : true,
		    legend: {
		        data:[]
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['���','������','����ΰ','������','�Ʊ�','�ι���','����','������','������','�����','��ΰ','�����']
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
     name:'�ܼ�',type:'bar',markPoint : {data : [{type : 'max', name: '���ֵ'}]},markPoint : {data : [{type : 'min', name: '��Сֵ'}]},markLine : { data : [{type : 'average', name: 'ƽ��ֵ'}]},   
 data:[83.5,68.0,57.0,76.0,75.0,111.0,92.0,83.0,97.0,126.5,24.5,75.5] 
}  
]
		};
		                    
	return option;
}


