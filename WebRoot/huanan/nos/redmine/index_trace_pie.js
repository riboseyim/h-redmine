
function index_trace_pie_option(){
	
	var option  = {
		    title : {
		        text: '内容占比',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		       //orient : 'vertical',
			orient:'horizontal',
			x : 'center',
		        data:['实施流程','开发流程','CASE流程','内部流程']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: false},
		            dataView : {show: false, readOnly: false},
		            magicType : {
		                show: false, 
		                type: ['pie', 'funnel'],
		                option: {
		                    funnel: {
		                        x: '25%',
		                        width: '50%',
		                        funnelAlign: 'left',
		                        max: 1548
		                    }
		                }
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'内容占比',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:360.5,name:'实施流程'},{value:315.0,name:'开发流程'},{value:259.0,name:'CASE流程'},{value:10.5,name:'内部流程'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


