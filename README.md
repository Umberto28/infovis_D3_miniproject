## Interactive Mosquito

This project aims to create an interactive visualization using D3.js to represent a mosquito moving across a chart. This represents bivariate data, where each data point (data-case) consists of two quantitative and positive variables.

#### Functionality Overview:

- **Data Visualization:** The project generates a simple chart on an HTML page using D3.js. A little mosquito is positioned on the chart according to the first data-case's variables.
  
- **Interaction:** Each time the user clicks on the chart background, the mosquito moves to the next data-case's coordinates. Users can interact with the mosquito too by clicking on it. When clicked, the mosquito returns to the previous data-case's coordinates in the sequence.

#### Technologies Used:

- **D3.js:** Utilized for data visualization and dynamic manipulation of SVG elements.
  
- **Bootstrap:** Employed for styling the HTML page.

#### Project Structure:

- **index.html:** The main HTML file containing the visualization elements and user interface controls.
  
- **script.js:** JavaScript file containing the D3.js code for data visualization, interaction handling, and animation.

- **style.css:** CSS file for styling the HTML elements and enhancing the visual appearance.

- **data.json:** JSON file containing the multivariate data used for generating the scatter plot.

#### Demo

- [Interactive Mosquito](https://umberto28.github.io/infovis_D3_miniproject/)
