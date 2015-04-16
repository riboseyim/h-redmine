
<#--- 
Redmine--概览视图
index-case-funnel-option.ftl
模板
create:2015-04-13
-->

function index_case_funnel_option(){
	
	var option = {
    color : [${index_case_funnel_rgbas}],
    title : {
        text: '漏斗图',
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    legend: {
        data : [${index_case_funnel_keys}]
    },
    calculable : true,
    series : [
        {
            name:'CASE来源',
            type:'funnel',
            x: '10%',
            width: '80%',
            itemStyle: {
                normal: {
                    label: {
                        formatter: '{b}CASE来源'
                    },
                    labelLine: {
                        show : false
                    }
                },
                emphasis: {
                    label: {
                        position:'inside',
                        formatter: '{b}CASE来源 : {c}%'
                    }
                }
            },
            data:[${index_case_funnel_keys}]
        }
    ]
};
                    	                    
	return option;
}


