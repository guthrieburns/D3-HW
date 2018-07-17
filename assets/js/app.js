
var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 800 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("cleaneddata.csv", function(error, data) {


    if (error) return console.warn(error);
  
    console.log(data);
  

    data.forEach(function(d) {
      d.smokes = +d.smokes;
      d.obesity = +d.obesity;
    }); 

  x.domain(d3.extent(data, function(d) { return d.smokes; }));
  y.domain([0, d3.max(data, function(d) { return d.obesity; })]);

  svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 10)
      .attr("cx", function(d) { return x(d.smokes); })
      .attr("cy", function(d) { return y(d.obesity); });

  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function(d){ return d.abbr; })
      .attr("x", function(d) { return x(d.smokes)-9; }) 
      .attr("y", function(d) { return y(d.obesity)+6; })
      .attr("font-size", "14px")  
      .attr("fill", "black");   


  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  svg.append("text")             
      .attr("transform",
          "translate(" + (width/2) + " ," + 
                         (height + margin.top +20) + ")")
      .style("text-anchor", "middle")
      .text("% who smoke")
      .attr("font-size", "18px");


  svg.append("g")
      .call(d3.axisLeft(y));
  
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("% who are obese")
      .attr("font-size", "18px"); 

});

