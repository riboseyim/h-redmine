
function index_project_pie_option(){
	
	var option  = {
		    title : {
		        text: '��Ŀ��ʱ�ֲ�',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['��������PON����','��������IP����','�㶫����IP����','��������IPRAN����','����������������ƽ̨','�㶫�ƶ�������ϵͳ','Эͬƽ̨','������ͨ����ƽ̨','������ͨIP����','���ϵ���IP����','�㶫��ͨIP����','�������Ų���ƽ̨','�¼����о�̽��','�ڲ���ѵ&��Ƹ']
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
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
		            name:'��Ŀ��ʱ�ֲ�',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:144.5,name:'��������PON����'},{value:121.5,name:'��������IP����'},{value:111.0,name:'�㶫����IP����'},{value:88.5,name:'��������IPRAN����'},{value:40.0,name:'����������������ƽ̨'},{value:24.0,name:'�㶫�ƶ�������ϵͳ'},{value:18.5,name:'Эͬƽ̨'},{value:12.0,name:'������ͨ����ƽ̨'},{value:9.0,name:'������ͨIP����'},{value:8.0,name:'���ϵ���IP����'},{value:7.5,name:'�㶫��ͨIP����'},{value:6.0,name:'�������Ų���ƽ̨'},{value:3.5,name:'�¼����о�̽��'},{value:3.0,name:'�ڲ���ѵ&��Ƹ'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


