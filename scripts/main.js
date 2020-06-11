// data = [];

// Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-capitals.json', function (json) {
//   json.forEach(function (p) {
//     p.z = p.population;
//     data.push(p);
//   });
// })

// data.push({
//     abbrev: "NA",
//     capital: "Random",
//     lat: 32.710915,
//     lon: -117.168167,
//     parentState: "NA",
//     population: 205764,
//     z: 205764
// })

// load data
var viewershipData = [{
    "name": "Counter-Strike: Global Offensive",
    "y": 23.7,
    img_path: "images/CSGO-Logo.png", 
    color: "#ccba7c"
}, {
    "name": "Dota 2",
    "y": 11.9,
    img_path: "images/Dota-2-Logo.png", 
    color: "#F04C36"
}, {
    "name": "League of Legends",
    "y": 9.6,
    img_path: "images/LoL.png", 
    color: "#1C828D"
}, {
    "name": "Others",
    "y": 6,
    img_path: "", 
    color: "#727272"
}]

var viewershipData2019 = [{
    "name": "Counter-Strike: Global Offensive",
    "y": 98,
    img_path: "images/CSGO-Logo.png", 
    color: "#ccba7c"
}, {
    "name": "Dota 2",
    "y": 88,
    img_path: "images/Dota-2-Logo.png", 
    color: "#F04C36"
}, {
    "name": "League of Legends",
    "y": 180,
    img_path: "images/LoL.png", 
    color: "#1C828D"
}]

function plotViewership() {
    let mayChart = Highcharts.chart('viewership-may', {
        chart: {
            type: "pie",
            backgroundColor: '#de9b35'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    connectorPadding: -15,
                    connectorWidth: 0,
                    enabled: true,
                    useHTML: true,
                    y: -20,
                    formatter: function() {
                        if (this.point.name != "Others") {
                            return `<img src=${this.point.img_path} width="60px" height="60px" style="margin=auto;"></img>`
                        } else {
                            return `<br>${this.point.name}`
                        }
                    },
                    style: {
                        fontFamily: 'Roboto',
                        fontSize: "18px",
                        fontWeight: "normal"
                    }
                }
            }
        },
        legend: {
            enabled: true
        },
        title: {
            text: "Hours of Tournaments Watched",
            style: {
                fontFamily: 'Roboto',
                fontSize: "24px"
            }
        },
        subtitle: {
            text: 'May, 2020',
            style: {
                fontFamily: 'Roboto',
                fontSize: "16px"
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}M</b>',
            useHTML: true,
            followPointer: false
        },
        series: [{
            name: "Hours watched",
            colorByPoint: true,
            data: viewershipData
        }],
        credits: {
            enabled: true,
            href: 'https://newzoo.com/insights/rankings/top-games-twitch/',
            text: 'Source',
            style: {
                color: '#d0d0d0'
            }
        }
    })
    
    // select CS:GO 
    let pointMay = mayChart.series[0].data[0]; //Or any other point
    pointMay.select();

    let _2019Chart = Highcharts.chart('viewership-2019', {
        chart: {
            type: "pie",
            backgroundColor: '#de9b35'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    connectorPadding: -15,
                    connectorWidth: 0,
                    enabled: true,
                    useHTML: true,
                    y: -30,
                    x: 5,
                    formatter: function() {
                        if (this.point.name != "Others") {
                            return `<img src=${this.point.img_path} width="60px" height="60px" style="margin=auto;"></img>`
                        } else {
                            return `<br>${this.point.name}`
                        }
                    },
                    style: {
                        fontFamily: 'Roboto',
                        fontSize: "18px",
                        fontWeight: "normal"
                    }
                }
            }
        },
        legend: {
            enabled: true
        },
        title: {
            text: "Hours of Tournaments Streamed",
            style: {
                fontFamily: 'Roboto',
                fontSize: "24px"
            }
        },
        subtitle: {
            text: '2019 Majors',
            style: {
                fontFamily: 'Roboto',
                fontSize: "16px"
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}M</b>',
            useHTML: true,
            followPointer: false
        },
        series: [{
            name: "Hours Watched",
            colorByPoint: true,
            data: viewershipData2019
        }],
        credits: {
            enabled: true,
            href: 'https://www.ggrecon.com/articles/the-biggest-esports-of-2019-by-game-and-hours-watched',
            text: 'Source',
            style: {
                color: '#d0d0d0'
            }
        }
    })
    
    // select CS:GO 
    let point2019 = _2019Chart.series[0].data[0]; //Or any other point
    point2019.select();
}

function plotMap() {
    // parse data
    date = parseFloat(document.getElementById('dateRange').value)
    data = []
    for (key of Object.keys(serverData[date])) {
        if ((key != 'lat') || (key != 'long')) {
            data.push({
                name: key,
                z: serverData[date][key],
                lat: serverData['lat'][key],
                lon: serverData['long'][key]
            })
        }
    }
    const mapData = Highcharts.geojson(Highcharts.maps['custom/world-continents']);
	map = Highcharts.mapChart('map-chart', {
		chart: {
			map: 'custom/world-continents',
            backgroundColor: '#ab7729',
            borderColor:"white",
            borderWidth: 1
		},
		// colors: [mapColors.default],
		title: {
            text: "Matchmaking Server Usage by Region",
            style: {
                fontFamily: 'Roboto',
                fontSize: "24px",
                color: '#d0d0d0'
            }
		},
		// tooltip: {
		// 	formatter: function () {
		// 		return this.key;
		// 	}
        // },
        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true,
            enableMouseWheelZoom: false
          },
        plotOptions: {
            mapbubble: {
                zMax: 549287
            }
        },
		series: [{
            name: 'Basemap',
            mapData: Highcharts.maps['custom/world-continents'],
            borderColor: '#606060',
            nullColor: 'rgba(200, 200, 200)',
            showInLegend: false
          }, {
            type: 'mapbubble',
            dataLabels: {
              enabled: true,
              format: '{point.name}',
            },
            name: 'Region',
            data: data,
            maxSize: '50%',
            // color: H.getOptions().colors[0]
          }],
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		}
	});
}

function plotTimeline() {
    var timeline = Highcharts.chart('history-chart', {
        chart: {
            zoomType: 'x',
            type: 'timeline',
            backgroundColor: '#ab7729',
        },
        xAxis: {
            type: 'datetime',
            visible: true,
            labels: {
                style: {
                    color: '#d3d3d3'
                }
            }
        },
        yAxis: {
            gridLineWidth: 1,
            title: null,
            labels: {
                enabled: false,
            }   
        },
        legend: {
            enable: false
        },
        title: {
            text: null
        },
        tooltip: {
            style: {
              width: 300
            }
        },
        colors: ["#5d79ae", '#0c0f12', 'red', '#413a27', '#ccba7c'],
        series: [{
            dataLabels: {
                allowOverlap: false,
                format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
                  '{point.x:%d %b %Y}</span><br/>{point.label}'
            },
            marker: {
                symbol: 'circle'
            },
            data: timelineData
        }],
        credits: {
            enabled: false
        }
    })
}

function plotLineChart() {
    // parse data
    let peaks = []
    let avgs = []
    let approvals = []

    for (date of Object.keys(playerApprovalData)) {
        // console.log(date)
        newDate = parseFloat(date) //* Math.pow(10, 6)
        peak = {
            x: newDate,
            y: playerApprovalData[date]["Peak Players"]
        }

        avg = {
            x: newDate,
            y: playerApprovalData[date]["Avg. Players"]
        }

        approval = {
            x: newDate,
            y: playerApprovalData[date]["scaledRate"],
            value: playerApprovalData[date]["approvalRate"]
        }

        peaks.push(peak)
        avgs.push(avg)
        approvals.push(approval)
    }

    playerApprovalChart = Highcharts.chart('playerApproval-chart', {
		chart: {
            zoomType: 'x',
            backgroundColor: '#ab7729'
		},
		title: {
			text: 'CS:GO Players and Sentiment Over Time',
			style: {
                fontWeight: 'bold',
                color: "#d0d0d0"
			}
		},
		// subtitle: {
		// 	text: "Number of Players and Approval Since Release",
		// 	style: {
		// 		fontWeight: 'bold'
		// 	}
		// },
		xAxis: {
			title: {
                text: 'Date',
                style: {
                    color: "#d0d0d0"
                }
			},
			type: 'datetime',
			labels: {
                format: '{value:%m/%d/%y}',
                style: {
                    color: '#d0d0d0'
                }
			},
			// crosshair: {
			// 	labels: {
			// 		enabled: true,
			// 		format: '{value:%m/%d/%y}'
			// 	}
			// }
		},
		yAxis: {
			title: {
                text: 'Number of Players',
                style: {
                    color: "#d0d0d0"
                }
            },
            labels: {
				style: {
                    color: '#d0d0d0'
                }
			},
			// crosshair: {
			// 	label: {
			// 		enabled: true,
			// 		// format: '{value}'
			// 	}
            // },
            min: 0
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			area: {
				// fillColor: {
				// 	linearGradient: {
				// 		x1: 0,
				// 		y1: 0,
				// 		x2: 0,
				// 		y2: 1
				// 	},
				// 	stops: [
				// 		[0, Highcharts.getOptions().colors[0]],
				// 		[1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
				// 	]
                // },
                pointStart: 1341100800000,
				fillOpacity: 0.45,
				marker: {
					radius: 3
				},
				lineWidth: 2,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},
		series: [{
			type: 'area',
			name: 'Peak Players',
            data: peaks,
            marker:{
                symbol: 'circle'
            }
			// color: '#29A2CC'
		}, {
			type: 'line',
			name: 'Approval Rate (%)',
			data: approvals,
            marker:{
                symbol: 'circle'
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.value:.2f}</b><br/>'
            }
        }, {
			type: 'area',
			name: 'Average Players',
			data: avgs,
            marker:{
                symbol: 'circle'
            }
			// color: '#29A2CC'
		}],
		credits: {
			enabled: false
        },
        legend: {
            enabled: true
        }
	});
}

var map;
var playerApprovalChart;

function setDateLabel() {
    slider = document.getElementById('dateRange')
    val = slider.value;

    // width = document.getElementById('dateRange').getBoundingClientRect().width - 15;

    // // Calculate percentage
    // min = slider.min;
    // max = slider.max;
    // percent = (val - min) / (max - min);

    // offset = -10;

    // // the position of the output
    // newPosition = width * percent + offset;

    label = document.getElementById('setyear')
    // label.style.left = newPosition

    var today = new Date(val / Math.pow(10, 6));
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'/'+dd+'/'+yyyy;
    label.innerText = "Usage on: " + today
}

function init() {
    setDateLabel();
    plotViewership();
    plotMap();
    plotTimeline();
    plotLineChart();
    
    document.getElementById('dateRange').addEventListener('change', function() {
        setDateLabel()

        date = parseFloat(document.getElementById('dateRange').value)
        data = []
        for (key of Object.keys(serverData[date])) {
            if ((key != 'lat') || (key != 'long')) {
                data.push({
                    name: key,
                    z: serverData[date][key],
                    lat: serverData['lat'][key],
                    lon: serverData['long'][key]
                })
            }
        }
        map.series[1].setData(data);
    })
    // $('#slider').bind('input', function() {
    //     chart.series[0].setData(dataSets[+this.value].data);
    //   });
}

document.addEventListener('DOMContentLoaded', init, false)