


$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container1',
                type: 'line'
            },
			credits:{
				enabled:false
			},
            title: {
                text: 'Chômage dans la zone euro',
				style:{
					color: '#999',
					fontSize: '13px'
				}
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['jan. 2009', 'fév. 2009', 'mars 2009', 'avr. 2009', 'mai 2009', 'juin 2009', 'juil. 2009', 'août 2009', 'sept. 2009', 'oct. 2009', 'nov. 2009', 'déc. 2009','jan. 2010', 'fév. 2010', 'mars 2010', 'avr. 2010', 'mai 2010', 'juin 2010', 'juil. 2010', 'août 2010', 'sept. 2010', 'oct. 2010', 'nov. 2010', 'déc. 2010','jan. 2011', 'fév. 2011', 'mars 2011', 'avr. 2011', 'mai 2011', 'juin 2011', 'juil. 2011', 'août 2011', 'sept. 2011', 'oct. 2011', 'nov. 2011', 'déc. 2011','jan. 2012', 'fév. 2012', 'mars 2012', 'avr. 2012', 'mai 2012', 'juin 2012', 'juil. 2012', 'août 2012', 'sept. 2012', 'oct. 2012', 'nov. 2012', 'déc. 2012'],
				labels:{
					formatter: function() {
						val = this.value.split(" ")
						if (val[0] == "jan."){
							return val[1];
						}
					}
				}
            },
            yAxis: {
				min	:8,
				max:12,
				tickInterval:1,
				startOnTick:false,
                title: {
                    text: 'en %',
					style: {
						fontWeight: 'bold',
						fontSize:12
					}
                }
            },
			legend:{
				enabled:false
			},
            tooltip: {
                enabled: true,
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                       this.x+ " : "+ this.y +' %';
                }
            },
    
            series: [{
                name: 'Zone euro',
				color:"#8CB1DE",
				marker:{
					enabled:true,
					radius:2
				},
                data: [8.7,9.0,9.3,9.4,9.5,9.6,9.8,9.8,9.9,10.0,10.0,10.1,10.1,10.1,10.2,10.2,10.2,10.1,10.1,10.1,10.1,10.2,10.1,10.1,10.0,9.9,9.9,9.9,9.9,10.0,10.1,10.2,10.3,10.4,10.6,10.7,10.8,10.9,11.0,11.2,11.3,11.4,11.4,11.5,11.6,11.7,11.7, {
					marker:{
						radius:5,
						fillColor:"#AA2C30",
						lineColor:"#FFF",
						lineWidth:4
					},
					dataLabels: {
						enabled: true,
						align: 'middle',
						crop: false,
						style: {
							fontWeight: 'bold'
						},
						x: -20,
						y:-15,
						verticalAlign: 'middle'
					},
					y: 11.7
				}]
            }]
        });
    });
    
});



$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container2',
                type: 'column'
            },
            title: {
                text: 'Croissance du PIB de la zone euro',
				style:{
					color: '#999',
					fontSize: '13px'
				}
            },
            subtitle: {
                text: ''
            },
			credits:{
				enabled:false
			},
            xAxis: {
                categories: [
                    'T1 2009',
                    'T2 2009',
                    'T3 2009',
                    'T4 2009',
                    'T1 2010',
                    'T2 2010',
                    'T3 2010',
                    'T4 2010',
                    'T1 2011',
                    'T2 2011',
                    'T3 2011',
                    'T4 2011',
					'T1 2012',
                    'T2 2012',
                    'T3 2012',
                    'T4 2012'
                ],
				labels:{
					formatter: function() {
						val = this.value.split(" ")
						if (val[0] == "T1"){
							return this.value;
						}
					}
				}
            },
			legend:{
				enabled:false
			},
            yAxis: {
				min	:-3,
				max:2,
				tickInterval:1,
				startOnTick:false,
                title: {
                    text: 'en % du PIB'
                }
            },
            tooltip: {
                formatter: function() {
                    return ''+"<b>"+this.series.name+"</b><br/>"+
                        this.x +' : '+ this.y +' %';
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
                series: [{
                name: 'Zone euro',
				color:"#8CB1DE",
                data: [-2.8,-0.3,0.4,0.4,0.5,1.0,0.4,0.3,0.6,0.2,0.1,-0.3,0.0,-0.2,-0.1,{
					
					dataLabels: {
						enabled: true,
						align: 'middle',
						crop: false,
						style: {
							fontWeight: 'bold'
						},
						x: -16,
						y:9,
						verticalAlign: 'middle'
					},
					y: -0.6
				}]
    
            }]
        });
    });
    
});


