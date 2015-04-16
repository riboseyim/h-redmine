
<#--- 
Redmine--¸ÅÀÀÊÓÍ¼
index-project-pie-option.ftl
Ä£°å
create:2015-04-13
-->

function index_project_pie_${ChartsIndex}_option(){
	
	var option  = {
		    title : {
		        //text: '${index_project_pie_name}',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:[${index_project_pie_keys}]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: false},
		            dataView : {show: false, readOnly: false},
		            magicType : {
		                show: true, 
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
		            name:'${index_project_pie_name}',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[${index_project_pie_values}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


