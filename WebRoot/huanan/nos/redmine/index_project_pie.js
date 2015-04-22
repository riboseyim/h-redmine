
function index_project_pie_option(){
	
	var option  = {
		    title : {
		        //text: '��Ŀռ��',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['�㶫����IP����','��������PON����','��������IP����','���ϵ���IP����','��������IPRAN����','��������IP����','�㶫�ƶ�������ϵͳ','����������������ƽ̨','Эͬƽ̨','������ͨ����ƽ̨','��������IPRAN����','������ͨIP����','��������IDC����','�㶫��ͨIP����','�ڲ���ѵ&��Ƹ','�������Ų���ƽ̨','������άר��','�¼����о�̽��','�㶫����IDC����']
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
		            name:'��Ŀռ��',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:246.0,name:'�㶫����IP����'},{value:203.5,name:'��������PON����'},{value:164.5,name:'��������IP����'},{value:120.0,name:'���ϵ���IP����'},{value:105.5,name:'��������IPRAN����'},{value:85.0,name:'��������IP����'},{value:78.5,name:'�㶫�ƶ�������ϵͳ'},{value:42.0,name:'����������������ƽ̨'},{value:25.0,name:'Эͬƽ̨'},{value:24.0,name:'������ͨ����ƽ̨'},{value:18.0,name:'��������IPRAN����'},{value:11.0,name:'������ͨIP����'},{value:11.0,name:'��������IDC����'},{value:9.0,name:'�㶫��ͨIP����'},{value:6.0,name:'�ڲ���ѵ&��Ƹ'},{value:6.0,name:'�������Ų���ƽ̨'},{value:6.0,name:'������άר��'},{value:3.5,name:'�¼����о�̽��'},{value:2.0,name:'�㶫����IDC����'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


