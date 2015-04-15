

function optionTrackBar(){
	
	var option = {
			title:{
				text:'ר���Զ�ʩ���ɹ���'
			},
		    tooltip : {
		        trigger: 'axis'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    grid:{
		    	x:30,
		    	y:45,
		    	x2:10,
		    	y2:5,
		    	width:650,
		    	height:200
		    },
		    calculable : true,
		    legend: {
		        data:['��װ','ͣ��','����','���˵�']
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['0318','0319','0320','0321','0322','0323','0324','0325','0326','0327','0328','0329','0330','0331','0401','0402']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name : 'ר��',
		            axisLabel : {
		                formatter: '{value} ��'
		            }
		        },
		        {
		            type : 'value',
		            name : '���˵�',
		            axisLabel : {
		                formatter: '{value} ��'
		            }
		        }
		    ],
		    series : [

		        {
		            name:'��װ',
		            type:'bar',
		            data:[10,0,0,0,0,0,0,0,0,0,0,0,20,12,19,10]
		        },
		        {
		            name:'ͣ��',
		            type:'bar',
		            data:[4,2,6,1,3,10,2,2,5,6,0,4,19,8,4,0]
		        },
		        {
		            name:'����',
		            type:'bar',
		            data:[5,6,8,0,2,18,3,9,6,7,1,3,14,12,6,2]
		        },
		        {
		            name:'���˵�',
		            type:'line',
		            yAxisIndex: 1,
		            data:[1,2,3,0,1,2,0,1,0,1,0,0,1,4,1,4]
		        }
		    ]
		};
		                    
	return option;
}


