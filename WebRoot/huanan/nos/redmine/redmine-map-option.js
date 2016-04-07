
function optionChinaMap(){
	// �Զ�����չͼ�����ͣ�mapType = ChinaNormal
	require('echarts/util/mapData/params').params.ChinaNormal = {
	    getGeoJson: function (callback) {
	        $.getJSON('../geoJson/china_geo.json',callback);
	    }
	}
	var option = {
		    title : {
		        text : 'RedmineӦ�÷ֲ�ͼ',
		        subtext: ''
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: '{b}<br/>{c} (��׼��ʱ)'
		    },
		    toolbox: {
		        show : false,
		        orient : 'vertical',
		        x: 'right',
		        y: 'center',
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    dataRange: {
		        min: 0,
		        max: 1200,
		        text:['High','Low'],
		        realtime: false,
		        calculable : true,
		        color: ['orangered','yellow','lightskyblue']
		    },
		    series : [
		        {
		            name: 'Redime',
		            type: 'map',
		            mapType: 'ChinaNormal', // �Զ�����չͼ������
		            //mapType:'china',
		            itemStyle:{
		                normal:{label:{show:true}},
		                emphasis:{label:{show:true}}
		            },
		            data:[
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 127},
		                {name: '����', value: 525.5},
		                {name: '����', value: 373.5},
		                {name: '�㶫', value: 336.5},
		                {name: '����', value: 910},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '�ӱ�', value: 0},
		                {name: '������', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 0},
		                {name: '���ɹ�', value: 0},
		                {name: '����', value: 49},
		                {name: '��ɳ', value: 0},
		                {name: '�ຣ', value: 0},
		                {name: 'ɽ��', value: 0},
		                {name: 'ɽ��', value: 0},
		                {name: '�Ϻ�', value: 0},
		                {name: '����', value: 137},
		                {name: '�Ĵ�', value: 32},
		                {name: '���', value: 0},
		                {name: '�½�', value: 0},
		                {name: '����', value: 0},
		                {name: '����', value: 223.5},
		                {name: '�㽭', value: 0}
		            ]
		        }
		    ]
		}
	return option;
}


