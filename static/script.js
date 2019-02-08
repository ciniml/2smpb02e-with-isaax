Highcharts.chart('chart', {
    chart: {
      type: 'area',
      animation: Highcharts.svg,
      marginRight: 10,
      events: {
        load: function() {
          const request = window.superagent;
                series = this.series;
  
          setInterval(function () {
            request
              .get('/sensor')
              .end(function(err, res){
                let x = (new Date()).getTime(),
                    py = res.body.pressure,
                    ty = res.body.temperature;
                
                if (py < series[0].yAxis.oldMin | !series[0].yAxis.oldMin) {
                    series[0].yAxis.update({min: py});
                }
                series[0].addPoint([x, py], true, true);
                if (py < series[1].yAxis.oldMin | !series[1].yAxis.oldMin) {
                  series[1].yAxis.update({min: py});
                }
                series[1].addPoint([x, ty], true, true);
              });
          }, 500);
        } 
      }
    },
    title: {
      text: 'Pressure'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: [{
      title: {
        text: 'hPa' 
      }
    },
    {
      title: {
        text: 'Celsius' 
      },
      opposite: true
    }],
    series: [{
      yAxis: 0,
      name: 'Pressure',
      data: (function () {
        let data = [],
            time = (new Date()).getTime(),
            i;
  
        for (i=-99; i<=0; i+=1) {
          data.push({
            x: time + i * 1000,
            y: undefined
          });
        }
        return data;
      }())
    },
    {
      yAxis: 1,
      name: 'Temperature',
      data: (function () {
        let data = [],
            time = (new Date()).getTime(),
            i;
  
        for (i=-99; i<=0; i+=1) {
          data.push({
            x: time + i * 1000,
            y: undefined
          });
        }
        return data;
      }())
    }]
  });
  