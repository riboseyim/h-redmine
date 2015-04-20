
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
		        data:['�㶫����IP����','��������PON����','��������IP����','���ϵ���IP����','��������IPRAN����','��������IP����','�㶫�ƶ�������ϵͳ','����������������ƽ̨','Эͬƽ̨','������ͨ����ƽ̨','��������IPRAN����','��������IDC����','������ͨIP����','�㶫��ͨIP����','�ڲ���ѵ&��Ƹ','�������Ų���ƽ̨','������άר��','�¼����о�̽��','�㶫����IDC����']
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
		            data:[{value:76,name:'�㶫����IP����'},{value:41,name:'��������PON����'},{value:61,name:'��������IP����'},{value:32,name:'���ϵ���IP����'},{value:33,name:'��������IPRAN����'},{value:20,name:'��������IP����'},{value:22,name:'�㶫�ƶ�������ϵͳ'},{value:19,name:'����������������ƽ̨'},{value:4,name:'Эͬƽ̨'},{value:6,name:'������ͨ����ƽ̨'},{value:6,name:'��������IPRAN����'},{value:4,name:'��������IDC����'},{value:8,name:'������ͨIP����'},{value:6,name:'�㶫��ͨIP����'},{value:1,name:'�ڲ���ѵ&��Ƹ'},{value:1,name:'�������Ų���ƽ̨'},{value:2,name:'������άר��'},{value:1,name:'�¼����о�̽��'},{value:1,name:'�㶫����IDC����'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


