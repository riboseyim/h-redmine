
function index_project_pie_option(){
	
	var option  = {
		    title : {
		        //text: '项目占比',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:['广东电信IP网管','广西电信PON网管','广西电信IP网管','云南电信IP网管','广西电信IPRAN网管','福建电信IP网管','广东移动局数据系统','广西电信智能提速平台','协同平台','广西联通测速平台','福建电信IPRAN网管','广西联通IP网管','福建电信IDC网管','广东铁通IP网管','内部培训&招聘','广西电信测速平台','集中运维专项','新技术研究探索','广东电信IDC网管']
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
		            name:'项目占比',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[{value:246.0,name:'广东电信IP网管'},{value:203.5,name:'广西电信PON网管'},{value:164.5,name:'广西电信IP网管'},{value:120.0,name:'云南电信IP网管'},{value:105.5,name:'广西电信IPRAN网管'},{value:85.0,name:'福建电信IP网管'},{value:78.5,name:'广东移动局数据系统'},{value:42.0,name:'广西电信智能提速平台'},{value:25.0,name:'协同平台'},{value:24.0,name:'广西联通测速平台'},{value:18.0,name:'福建电信IPRAN网管'},{value:11.0,name:'广西联通IP网管'},{value:11.0,name:'福建电信IDC网管'},{value:9.0,name:'广东铁通IP网管'},{value:6.0,name:'内部培训&招聘'},{value:6.0,name:'广西电信测速平台'},{value:6.0,name:'集中运维专项'},{value:3.5,name:'新技术研究探索'},{value:2.0,name:'广东电信IDC网管'}
		            ]
		        }
		    ]
		};
		                    
		                    
	return option;
}


