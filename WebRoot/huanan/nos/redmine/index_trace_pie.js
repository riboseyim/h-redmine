
function index_trace_pie_option(){
	
	var option  = {
		    title : {
		        text: '����ռ��',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        x:'left',
		        y:'bottom',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		       //orient : 'vertical',
			orient:'horizontal',
			x : 'center',
		        data:['ʵʩ����','��������','CASE����','�ڲ�����']
		    },
		    toolbox: {
		        show : true,
		        x:'left',
		        y:'bottom',
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
		            name:'����ռ��',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:456.5,name:'ʵʩ����'},{value:370.0,name:'��������'},{value:321.5,name:'CASE����'},{value:16.5,name:'�ڲ�����'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


