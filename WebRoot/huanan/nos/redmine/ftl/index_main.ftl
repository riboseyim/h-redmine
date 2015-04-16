<#--- 
首页-主控函数-模板
create:2015-04-16
author:yanrui
-->

<#list chartsList as chartName> 
	var ${chartName}_chart;
</#list>	

function requireCallback(ec, defaultTheme) {
	curTheme = themeSelector ? defaultTheme : {};
	echarts = ec;
	refresh();
}

function refresh(isBtnRefresh) {
	if (isBtnRefresh) {
		needRefresh = true;
		focusGraphic();
		return;
	}
	
	needRefresh = false;

	<#list chartsList as chartName> 
		var ${chartName}_div = document.getElementById("${chartName}_div");
		
		if (${chartName}_chart && ${chartName}_chart.dispose) {
			${chartName}_chart.dispose();
		}
		
		${chartName}_chart = echarts.init(${chartName}_div, curTheme);
	
		${chartName}_chart.setOption(${chartName}_option());
	</#list>	
	
	
	<#list connectList as connect> 
		${connect["source"]}.connect(${connect["target"]});
	</#list>
}


function loadChartObj(chartid) {
	var div = chartid + "_div";
	var char = chartid + "_chart";
	var div = document.getElementById(div);
	if (char && char.dispose) {
		char.dispose();
	}
	char = echarts.init(div, curTheme);

	char.setOption(eval(chartid + "_option()"));

}

function saveChartImage(chartid,imagename) {
	var chart = index_project_pie_chart;
	
	var chartsdata = index_project_pie_chart.getDataURL("jpeg");
	var url = "Redmine-charts-service.jsp";
	$.ajax({
		type : "POST",
		url : url,
		data : {
			methodName : "saveEChartsImage",
			imageName : imagename+".jpeg",
			imageData : chartsdata,
			rand : Math.random()
		},
		datatype : "text",
		success : function(data) {
			// alert("success data:"+data);
		}
	});
}

var domCode = document.getElementById('sidebar-code');
var domGraphic = document.getElementById('graphic');
var domMessage = document.getElementById('wrong-message');
var iconResize = document.getElementById('icon-resize');
var needRefresh = false;

var enVersion = location.hash.indexOf('-en') != -1;
var hash = location.hash.replace('-en', '');
hash = hash.replace('#', '') || (needMap() ? 'default' : 'macarons');
hash += enVersion ? '-en' : '';

var curTheme;

function needMap() {
	var href = location.href;
	return href.indexOf('map') != -1 || href.indexOf('Map') != -1
			|| href.indexOf('mix3') != -1 || href.indexOf('mix5') != -1
			|| href.indexOf('dataRange') != -1;

}

var echarts;
var developMode = false;

if (developMode) {
	// for develop
	require.config({
		packages : [ {
			name : 'echarts',
			location : '../../src',
			main : 'echarts'
		}, {
			name : 'zrender',
			// location: 'http://ecomfe.github.io/zrender/src',
			location : '../../../zrender/src',
			main : 'zrender'
		} ]
	});
} else {
	// for echarts online home page
	require.config({
		paths : {
			echarts : './www/js'
		}
	});
}

require([ 'echarts', 'theme/' + hash.replace('-en', ''),
// 'echarts/chart/map',
'echarts/chart/line', 'echarts/chart/bar',
// 'echarts/chart/scatter',
// 'echarts/chart/k',
'echarts/chart/pie',
// 'echarts/chart/radar',
], requireCallback);

var themeSelector = $('#theme-select');
if (themeSelector) {
	themeSelector
			.html('<option selected="true" name="macarons">macarons</option>'
					+ '<option name="infographic">infographic</option>'
					+ '<option name="shine">shine</option>'
					+ '<option name="dark">dark</option>'
					+ '<option name="blue">blue</option>'
					+ '<option name="green">green</option>'
					+ '<option name="red">red</option>'
					+ '<option name="gray">gray</option>'
					+ '<option name="helianthus">helianthus</option>'
					+ '<option name="default">default</option>');

	$(themeSelector).on('change', function() {
		selectChange($(this).val());
	});

	function selectChange(value) {
		var theme = value;

		myChinaMapChart.showLoading();

		$(themeSelector).val(theme);
		if (theme != 'default') {
			window.location.hash = value + (enVersion ? '-en' : '');
			require([ 'theme/' + theme ], function(tarTheme) {
				curTheme = tarTheme;
				setTimeout(refreshTheme, 500);
			})
		} else {
			window.location.hash = enVersion ? '-en' : '';
			curTheme = {};
			setTimeout(refreshTheme, 500);
		}
	}

	function refreshTheme() {

		myChinaMapChart.hideLoading();
		myChinaMapChart.setTheme(curTheme);
	}

	if ($(themeSelector).val(hash.replace('-en', '')).val() != hash.replace(
			'-en', '')) {
		$(themeSelector).val('macarons');
		hash = 'macarons' + enVersion ? '-en' : '';
		window.location.hash = hash;
	}
}


