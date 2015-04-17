
function index_project_pie_numbers_option(){
	
	var option  = {
		    title : {
		        text: '项目任务数',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'right',
		        data:['广东电信IP网管','广西电信PON网管','广西电信IP网管','云南电信IP网管','广西电信IPRAN网管','广东移动局数据系统','广西电信智能提速平台','广西联通测速平台','协同平台','广西联通IP网管','广东铁通IP网管','集中运维专项','广西电信测速平台','新技术研究探索','内部培训&招聘','广东电信IDC网管']
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
		            name:'项目任务数',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:67,name:'广东电信IP网管'},{value:33,name:'广西电信PON网管'},{value:59,name:'广西电信IP网管'},{value:32,name:'云南电信IP网管'},{value:28,name:'广西电信IPRAN网管'},{value:21,name:'广东移动局数据系统'},{value:19,name:'广西电信智能提速平台'},{value:5,name:'广西联通测速平台'},{value:4,name:'协同平台'},{value:8,name:'广西联通IP网管'},{value:6,name:'广东铁通IP网管'},{value:2,name:'集中运维专项'},{value:1,name:'广西电信测速平台'},{value:1,name:'新技术研究探索'},{value:1,name:'内部培训&招聘'},{value:1,name:'广东电信IDC网管'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


