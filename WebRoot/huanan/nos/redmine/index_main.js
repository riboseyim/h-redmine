
	var index_trace_pie_chart;
	var index_project_pie_chart;
	var index_project_pie_numbers_chart;
	var index_project_trace_bar_item_chart;
	var index_project_user_bar_item_chart;
	var index_project_casefrom_bar_item_chart;
	var index_case_fromreason_bar_item_chart;
	var index_user_total_bar_item_chart;

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

		var index_trace_pie_div = document.getElementById("index_trace_pie_div");
		
		if (index_trace_pie_chart && index_trace_pie_chart.dispose) {
			index_trace_pie_chart.dispose();
		}
		
		index_trace_pie_chart = echarts.init(index_trace_pie_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_project_pie_div = document.getElementById("index_project_pie_div");
		
		if (index_project_pie_chart && index_project_pie_chart.dispose) {
			index_project_pie_chart.dispose();
		}
		
		index_project_pie_chart = echarts.init(index_project_pie_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_project_pie_numbers_div = document.getElementById("index_project_pie_numbers_div");
		
		if (index_project_pie_numbers_chart && index_project_pie_numbers_chart.dispose) {
			index_project_pie_numbers_chart.dispose();
		}
		
		index_project_pie_numbers_chart = echarts.init(index_project_pie_numbers_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_project_trace_bar_item_div = document.getElementById("index_project_trace_bar_item_div");
		
		if (index_project_trace_bar_item_chart && index_project_trace_bar_item_chart.dispose) {
			index_project_trace_bar_item_chart.dispose();
		}
		
		index_project_trace_bar_item_chart = echarts.init(index_project_trace_bar_item_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_project_user_bar_item_div = document.getElementById("index_project_user_bar_item_div");
		
		if (index_project_user_bar_item_chart && index_project_user_bar_item_chart.dispose) {
			index_project_user_bar_item_chart.dispose();
		}
		
		index_project_user_bar_item_chart = echarts.init(index_project_user_bar_item_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_project_casefrom_bar_item_div = document.getElementById("index_project_casefrom_bar_item_div");
		
		if (index_project_casefrom_bar_item_chart && index_project_casefrom_bar_item_chart.dispose) {
			index_project_casefrom_bar_item_chart.dispose();
		}
		
		index_project_casefrom_bar_item_chart = echarts.init(index_project_casefrom_bar_item_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_case_fromreason_bar_item_div = document.getElementById("index_case_fromreason_bar_item_div");
		
		if (index_case_fromreason_bar_item_chart && index_case_fromreason_bar_item_chart.dispose) {
			index_case_fromreason_bar_item_chart.dispose();
		}
		
		index_case_fromreason_bar_item_chart = echarts.init(index_case_fromreason_bar_item_div, curTheme).showLoading({effect:'bubble'});;
	
		var index_user_total_bar_item_div = document.getElementById("index_user_total_bar_item_div");
		
		if (index_user_total_bar_item_chart && index_user_total_bar_item_chart.dispose) {
			index_user_total_bar_item_chart.dispose();
		}
		
		index_user_total_bar_item_chart = echarts.init(index_user_total_bar_item_div, curTheme).showLoading({effect:'bubble'});;
	
	
	
		index_trace_pie_chart.setOption(index_trace_pie_option());
		index_project_pie_chart.setOption(index_project_pie_option());
		index_project_pie_numbers_chart.setOption(index_project_pie_numbers_option());
		index_project_trace_bar_item_chart.setOption(index_project_trace_bar_item_option());
		index_project_user_bar_item_chart.setOption(index_project_user_bar_item_option());
		index_project_casefrom_bar_item_chart.setOption(index_project_casefrom_bar_item_option());
		index_case_fromreason_bar_item_chart.setOption(index_case_fromreason_bar_item_option());
		index_user_total_bar_item_chart.setOption(index_user_total_bar_item_option());
	
		index_trace_pie_chart.hideLoading();
		index_project_pie_chart.hideLoading();
		index_project_pie_numbers_chart.hideLoading();
		index_project_trace_bar_item_chart.hideLoading();
		index_project_user_bar_item_chart.hideLoading();
		index_project_casefrom_bar_item_chart.hideLoading();
		index_case_fromreason_bar_item_chart.hideLoading();
		index_user_total_bar_item_chart.hideLoading();
	
		index_trace_pie_chart.connect(index_user_total_bar_item_chart);
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


