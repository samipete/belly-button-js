// Get the end point
const bellyButton = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

jsonData = d3.json(bellyButton)
// initialize dashboard 
function init(){
    // Fetch the JSON data and console log it
    jsonData.then(function(data) {
        console.log(data);
        // dropdown menu to display the top 10 OTUs found in that individual.
        const dropDown = d3.select("#selDataset");
        const names = data.names;
        let nameOption;
        names.forEach((subjectId) => { 
            nameOption = dropDown.append('option');
            nameOption.text(subjectId);
            nameOption.property('value', subjectId);        
        });
        // create charts for initial value in dropdown
        let valueOne = names[0];
        buildCharts(valueOne, data)
    });
 }

// define a function that updates info based dropdown selection 
function optionChanged(value){
    console.log(value)
    jsonData.then(function(data) {  
        buildCharts(value,data)      

    })};
// define a function to build charts and demographic info
function buildCharts(value, data){
    console.log('data is ', data.metadata);
    const sampleData = data.samples.find(sample=> sample.id.toString() === value)
    const metaData = data.metadata.find(sample=> sample.id.toString() === value)
    barChart(sampleData)
    // !! add func for bubble and demo info!!
    console.log(sampleData)
    console.log(metaData)
}
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function barChart (data){
    // declare varaibles 
     let  ids = data.otu_ids;
     let labels = data.otu_labels.slice(0, 10).reverse();
     let values = data.sample_values.slice(0,10).reverse();
     // create y labels 
     let yData = ids.slice(0,10);
     let yLabels = [];
     yData.forEach(function(ylabel){
         yLabels.push(`OTU ${ylabel.toString()}`);
     });
 
     // create trace for bar chart
     let traceOne = {
        x: values,
        y: yLabels,
        text: labels,
        type: "bar",
        orientation: "h"
    };
       
      // create layout for  bar chart. 
      let barLayout = {
       width: 500,
       height: 600,
       margin: {
        l: 100,
        r: 100,
        t: 0,
        b: 100
      }
       };
      // Plotly to plot the traceOne with the layout. 
      Plotly.newPlot("bar", [traceOne], barLayout);
  
}

// define funtion for bubble chart (add to build charts )
// let bubbleLabels = data.otu_labels;
// let bubbleValues = data.sample_values;


// define function for demographics tables





// Initialize data and chart building
init()