d3.json("data.json")
  .then(function(data_cases) {
    
    // Maintain the selected data-case index
    var currentIndex = 0
    
    // Get chart size attributes, based on its container card...
    var card = d3.select("#main-card")
    var cardHeight = parseInt(card.style("height"));
    var cardWidth = parseInt(card.style("width"));
    const cardSize = Math.min(cardHeight, cardWidth) * 0.9;
    const margin = {top: 10, right: 10, bottom: 50, left: 50},
        width = cardSize - margin.left - margin.right,
        height = cardSize - margin.top - margin.bottom;
    
    // ... and append the chart svg object to the card
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add a rect element as chart background for interactions
    svg.append("rect")
        .attr("class", "pop-element")
        .attr("x",0)
        .attr("y",0)
        .attr("height", height)
        .attr("width", height)
        .style("z-index", 1)
        .style("fill", "transparent")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
    
    // Get the max value in json data
    function getMax(data) {
      var maxX = d3.max(data, function(d) { return d.var1; });
      var maxY = d3.max(data, function(d) { return d.var2; });
    
      return Math.max(maxX, maxY)
    }
    
    // Add axis to the plane, using the max value to map the domain
    const max = getMax(data_cases)
    const xScale = d3.scaleLinear().domain([0, max + 2]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, max + 2]).range([height, 0]);
    
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(xScale)).select(".domain").remove();
    svg.append("g").call(d3.axisLeft(yScale)).select(".domain").remove();
    
    // Add axis labels:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left)
      .attr("y", height + margin.top + 30)
      .text("Var 1");
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -margin.top - height/2 + 20)
      .text("Var 2");
    
    // Add the mosquito svg to the chart using the first data-case as default coordinates
    const ratio = 633.6/53; // experimental value
    const mosqSize = height/ratio;
    var mosquito = svg.append("image")
      .attr("id", "mosquito")
      .attr("class", "pop-element")
      .attr("href", "./style/images/mosquito.svg")
      .attr("x", (xScale(data_cases[currentIndex].var1) - mosqSize/2))
      .attr("y", (yScale(data_cases[currentIndex].var2) - mosqSize/2))
      .attr("height", mosqSize + "px")
      .attr("width", mosqSize + "px")
      .style("z-index", 2)

    // Handle the switch toggle for enabling or disabling info popovers
    d3.select("#togglePopover").on("click", function() {
      var isChecked = d3.select(this).property("checked");
      if (isChecked) {
        // Enable popovers
        d3.select("#mosquito")
        .attr("data-bs-toggle", "popover")
        .attr("data-bs-trigger", "hover")
        .attr("data-bs-content", "Previous data-case");
        
        d3.select("rect")
        .attr("data-bs-toggle", "popover")
        .attr("data-bs-trigger", "hover")
        .attr("data-bs-content", "Next data-case");
      } else {
        // Disable popovers
        d3.selectAll(".pop-element").each(function() {
          var popover = bootstrap.Popover.getInstance(this);
          if (popover) {
            popover.dispose();
          }
          d3.select(this)
          .attr("data-bs-toggle", null)
          .attr("data-bs-trigger", null)
          .attr("data-bs-content", null);
        });
      }
      var popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
      var popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    });

    // Dynamic edit of data-cases' info text in the HTML
    function setText() {
      d3.select("#data-case-id").html("Current data-case: " + data_cases[currentIndex].id)
      d3.select("#data-case-var1").html("Var 1: " + data_cases[currentIndex].var1)
      d3.select("#data-case-var2").html("Var 2: " + data_cases[currentIndex].var2)
    }
    setText()
    
    // Add Mosquito click interaction
    mosquito.on("click", function() {
      if (currentIndex == 0) {
        currentIndex = data_cases.length - 1
      }
      else {
        --currentIndex;
      }
      d3.select(this)
        .transition()
        .duration(1600)
        .attr("x", (xScale(data_cases[currentIndex].var1) - mosqSize/2))
        .attr("y", (yScale(data_cases[currentIndex].var2) - mosqSize/2))
      setText()
    });
    
    // Add chart's background click interaction
    d3.select("rect").on("click", function() {
      if (currentIndex == data_cases.length - 1) {
        currentIndex = 0
      }
      else {
        ++currentIndex;
      }
      d3.select("#mosquito")
        .transition()
        .duration(1600)
        .attr("x", (xScale(data_cases[currentIndex].var1) - mosqSize/2))
        .attr("y", (yScale(data_cases[currentIndex].var2) - mosqSize/2))
      setText()
    });
  })



