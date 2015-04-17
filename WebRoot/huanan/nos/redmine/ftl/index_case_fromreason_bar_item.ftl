<#--- 
Redmine--¸ÅÀÀÊÓÍ¼
index-user-total-bar-item-option.ftl
Ä£°å
create:2015-04-13
-->



function index_case_fromreason_bar_item_option() {

	var option = {
		title : {
			text : '${index_user_total_bar_item_name}'
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : [${index_user_total_bar_item_usernames}]
		},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
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
		grid : {
			x:40,
		    	y:45,
		    	x2:40,
		    	y2:40
		},
		xAxis : [ {
			type : 'category',
			data : [${index_user_total_bar_item_keys}]
		}, {
			type : 'category',
			axisLine : {
				show : false
			},
			axisTick : {
				show : false
			},
			axisLabel : {
				show : false
			},
			splitArea : {
				show : false
			},
			splitLine : {
				show : false
			},
			data : [ 'Line', 'Bar', 'Scatter', 'K', 'Map' ]
		} ],
		yAxis : [${index_user_bar_item_yAxis}],
		series : [${index_user_total_bar_item_data}]
	};

	return option;
}
