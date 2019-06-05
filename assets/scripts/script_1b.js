// Bubbles 

// set the dimensions and margins of the graph
var width = 560
var height = 560
// Script 1b
// Data Visualization III - Bubbles Chart

// append the svg object to the body of the page
var svg = d3.select("#chart1")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

// Read tsv data
d3.tsv("assets/data/species.tsv", function(error, data) {
	if (error) throw error;
  // Filter a bit the data -> more than 1 million inhabitants
  //REMOVE data = data.filter(function(d){ return d.value>1 })
  
console.log(data);
  // Color palette for continents?
  var color = d3.scaleOrdinal()
    .domain(["Nursery", "Kindergarten", "Elementary: 1-4", "Elementary: 5-8", "High School: 9-12", "Undergraduate", "Graduate"])
    .range(d3.schemeSet2);

  // Size scale for countries
  var size = d3.scaleLinear()
    .domain([0, 100])
    .range([25,125])  // circle diameter range in px

  // create a tooltip
  var Tooltip = d3.select("#chart1")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html('<u>' + d['Education Level'] + '</u>' + "<br>" + 100*d.Percent + " %")
      .style("left", (d3.mouse(this)[0]+40) + "px")
      .style("top", (d3.mouse(this)[1]+170) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
	  .text(function(d) { return d.Percent})	
      .attr("class", "node")
      .attr("r", function(d){ return size(100*d.Percent)})
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", function(d){ return color(d['Education Level'])})
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .on("mouseover", mouseover) // What to do when hovered
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .call(d3.drag() // call specific function when circle is dragged
           .on("start", dragstarted)
           .on("drag", dragged)
           .on("end", dragended));

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(100*d.Percent)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      });

  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

})

