
function index_project_pie_option(){
	
	var option  = {
		    title : {
		        text: '项目工时分布',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['广西电信PON网管','广西电信IP网管','广东电信IP网管','广西电信IPRAN网管','广西电信智能提速平台','广东移动局数据系统','协同平台','广西联通测速平台','广西联通IP网管','云南电信IP网管','广东铁通IP网管','广西电信测速平台','新技术研究探索','内部培训&招聘']
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
		            name:'项目工时分布',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:144.5,name:'广西电信PON网管'},{value:121.5,name:'广西电信IP网管'},{value:111.0,name:'广东电信IP网管'},{value:88.5,name:'广西电信IPRAN网管'},{value:40.0,name:'广西电信智能提速平台'},{value:24.0,name:'广东移动局数据系统'},{value:18.5,name:'协同平台'},{value:12.0,name:'广西联通测速平台'},{value:9.0,name:'广西联通IP网管'},{value:8.0,name:'云南电信IP网管'},{value:7.5,name:'广东铁通IP网管'},{value:6.0,name:'广西电信测速平台'},{value:3.5,name:'新技术研究探索'},{value:3.0,name:'内部培训&招聘'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


