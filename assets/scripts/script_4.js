/* BARPLOT */

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 150},
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart1b")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")

// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("assets/data/eurostat-eu-population.csv", function(data) {
	  
	  // Sort the data object
	  if (selectedVar == "ASC") {data.sort(function(a,b) { return +a.VALUE - +b.VALUE })}
	  if (selectedVar == "DESC") {data.reverse(data.sort(function(a,b) { return +a.VALUE - +b.VALUE }))}
console.log(data);

    // X axis
    x.domain(data.map(function(d) { return d.GEO; }))
    xAxis.transition().duration(3000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d.VALUE }) ]);
    yAxis.transition().duration(3000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    var u = svg.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(2000)
        .attr("x", function(d) { return x(d.GEO); })
        .attr("y", function(d) { return y(d.VALUE); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.VALUE); })
        .attr("fill", "#FFA500")
  })

}

// Initialize plot
update('VALUE')

