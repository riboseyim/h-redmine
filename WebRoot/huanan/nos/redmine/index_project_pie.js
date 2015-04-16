function index_project_pie_option() {

	var option = {
		title : {
			text : '项目工时分布',
			x : 'center'
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			data : [ '广东电信IP网管', '广西电信PON网管', '广西电信IP网管', '云南电信IP网管',
					'广西电信IPRAN网管', '广东移动局数据系统', '广西电信智能提速平台', '广西联通测速平台',
					'协同平台', '广西联通IP网管', '广东铁通IP网管', '广西电信测速平台', '集中运维专项',
					'新技术研究探索', '内部培训&招聘', '广东电信IDC网管' ]
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
			name : '项目工时分布',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : [ {
				value : 228.0,
				name : '广东电信IP网管'
			}, {
				value : 177.5,
				name : '广西电信PON网管'
			}, {
				value : 156.5,
				name : '广西电信IP网管'
			}, {
				value : 120.0,
				name : '云南电信IP网管'
			}, {
				value : 93.5,
				name : '广西电信IPRAN网管'
			}, {
				value : 73.5,
				name : '广东移动局数据系统'
			}, {
				value : 42.0,
				name : '广西电信智能提速平台'
			}, {
				value : 23.0,
				name : '广西联通测速平台'
			}, {
				value : 14.5,
				name : '协同平台'
			}, {
				value : 11.0,
				name : '广西联通IP网管'
			}, {
				value : 9.0,
				name : '广东铁通IP网管'
			}, {
				value : 6.0,
				name : '广西电信测速平台'
			}, {
				value : 6.0,
				name : '集中运维专项'
			}, {
				value : 3.5,
				name : '新技术研究探索'
			}, {
				value : 3.0,
				name : '内部培训&招聘'
			}, {
				value : 2.0,
				name : '广东电信IDC网管'
			} ]
		} ]
	};

	return option;
}
