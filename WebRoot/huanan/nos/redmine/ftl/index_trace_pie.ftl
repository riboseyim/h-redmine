
<#--- 
Redmine--¸ÅÀÀÊÓÍ¼
index-trace-pie-option.ftl
Ä£°å
create:2015-04-16
-->

function index_trace_pie_option(){
	
	var option  = {
		    title : {
		        text: '${index_trace_pie_name}',
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
		        data:[${index_trace_pie_keys}]
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
		            name:'${index_trace_pie_name}',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[${index_trace_pie_values}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


