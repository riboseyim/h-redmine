
function index_project_pie_numbers_option(){
	
	var option  = {
		    title : {
		        text: '��Ŀ������',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'right',
		        data:['�㶫����IP����','��������PON����','��������IP����','���ϵ���IP����','��������IPRAN����','�㶫�ƶ�������ϵͳ','����������������ƽ̨','������ͨ����ƽ̨','Эͬƽ̨','������ͨIP����','�㶫��ͨIP����','������άר��','�������Ų���ƽ̨','�¼����о�̽��','�ڲ���ѵ&��Ƹ','�㶫����IDC����']
		    },
		    toolbox: {
		        show : true,
		        x:'left',
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
		            name:'��Ŀ������',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:67,name:'�㶫����IP����'},{value:33,name:'��������PON����'},{value:59,name:'��������IP����'},{value:32,name:'���ϵ���IP����'},{value:28,name:'��������IPRAN����'},{value:21,name:'�㶫�ƶ�������ϵͳ'},{value:19,name:'����������������ƽ̨'},{value:5,name:'������ͨ����ƽ̨'},{value:4,name:'Эͬƽ̨'},{value:8,name:'������ͨIP����'},{value:6,name:'�㶫��ͨIP����'},{value:2,name:'������άר��'},{value:1,name:'�������Ų���ƽ̨'},{value:1,name:'�¼����о�̽��'},{value:1,name:'�ڲ���ѵ&��Ƹ'},{value:1,name:'�㶫����IDC����'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


