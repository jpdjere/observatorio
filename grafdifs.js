
var createGraph = function(){


  var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
    
// Adds the svg canvas
var svg = d3.select("#container")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

/*
  var data = function() {
    var sin = [],
        cos = [];

    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});

    }

    return [
      {
        values: sin,
        key: 'Sine Wave',
        color: '#ff7f0e'
      }
    ];
  }



    nv.addGraph(function() {
      var chart = nv.models.lineChart()
        .useInteractiveGuideline(true);

      chart.xAxis
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));

      chart.yAxis
        .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));

      d3.select('#container svg')
        .datum(data())
        .transition().duration(500)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
    */
}