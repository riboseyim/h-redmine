function index_project_pie_option() {

	var option = {
		title : {
			text : '��Ŀ��ʱ�ֲ�',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			data : [ '�㶫����IP����', '��������PON����', '��������IP����', '���ϵ���IP����',
					'��������IPRAN����', '�㶫�ƶ�������ϵͳ', '����������������ƽ̨', '������ͨ����ƽ̨',
					'Эͬƽ̨', '������ͨIP����', '�㶫��ͨIP����', '�������Ų���ƽ̨', '������άר��',
					'�¼����о�̽��', '�ڲ���ѵ&��Ƹ', '�㶫����IDC����' ]
		},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : false
				},
				dataView : {
					show : false,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'pie', 'funnel' ],
					option : {
						funnel : {
							x : '25%',
							width : '50%',
							funnelAlign : 'left',
							max : 1548
						}
					}
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : true,
		series : [ {
			name : '��Ŀ��ʱ�ֲ�',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : [ {
				value : 228.0,
				name : '�㶫����IP����'
			}, {
				value : 177.5,
				name : '��������PON����'
			}, {
				value : 156.5,
				name : '��������IP����'
			}, {
				value : 120.0,
				name : '���ϵ���IP����'
			}, {
				value : 93.5,
				name : '��������IPRAN����'
			}, {
				value : 73.5,
				name : '�㶫�ƶ�������ϵͳ'
			}, {
				value : 42.0,
				name : '����������������ƽ̨'
			}, {
				value : 23.0,
				name : '������ͨ����ƽ̨'
			}, {
				value : 14.5,
				name : 'Эͬƽ̨'
			}, {
				value : 11.0,
				name : '������ͨIP����'
			}, {
				value : 9.0,
				name : '�㶫��ͨIP����'
			}, {
				value : 6.0,
				name : '�������Ų���ƽ̨'
			}, {
				value : 6.0,
				name : '������άר��'
			}, {
				value : 3.5,
				name : '�¼����о�̽��'
			}, {
				value : 3.0,
				name : '�ڲ���ѵ&��Ƹ'
			}, {
				value : 2.0,
				name : '�㶫����IDC����'
			} ]
		} ]
	};

	return option;
}
