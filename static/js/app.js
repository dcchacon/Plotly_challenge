// D3 library to read from json file

function buildChart(sample) {
    d3.json("samples.json").then((data) => {
        // const sample = "940"
        // use sample_values as the values for the bar chart
        // console.log(data)
        const samples = data.samples
        var resultArray = samples.filter(sampleObject => sampleObject.id === sample)
        var result = resultArray[0]


        // use otu_ids as the labels for the bar chart
        // use otu_labels as the hovertext for the chart
        var otu_ids = result.otu_ids.slice(0, 10).reverse();
        var otu_labels = result.otu_labels.slice(0, 10).reverse();
        var sample_values = result.sample_values.slice(0, 10).reverse();
        var labels = otu_ids.map(IDstring => `OTU ${IDstring}`)

        //Graph
        var trace1 = {
            y: labels,
            x: sample_values,
            type: "bar",
            orientation: "h"

        };

        // Create a data array for the plot
        var trace1data = [trace1]

        Plotly.newPlot("bar", trace1data);

    })//.catch(err => console.log(err));
// };
}

// function buildBubbleChart(samples) {
    d3.json("samples.json").then((trace2data) => {
        console.log(trace2data)

        var x_axis = trace2data.otu_ids;
        //var otu_labels = trace2data.otu_labels;
        var y_axis = trace2data.sample_values;
        

        //Create a buble chart that displays each sample
        var trace2 = [{

        //Use otu_ids for the x values
            x: x_axis,
        //Use sample_values for the y values
            y: y_axis,
        //Create the mode 
            mode: "markers",
        //Create properties for the markers
            marker: {
                size:y_axis,
                color:x_axis
            }
        }];

    var trace2data = [trace2]
    
    var layout2 = {
        title: "Belly Button Bacteria",
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        margin: {t:30}
    };
        //Use otu_labels for the text values

    Plotly.newPlot("bubble", trace2data, layout2);
    
    })//.catch(err => console.log(err));
//}
    

//Display the sample metadata, i.e. an individual's demographic information

// Function that Builds the Metadata Panel
function buildMetadata(sample) {
 
 
    // Use `d3.json` to Fetch the Metadata for a Sample
    //   d3.json(`/metadata/${sample}`).then((data) => {
        d3.json(`metadata.${sample}.json`).then((data) => {  
            console.log(data)        
          // Use d3 to Select the Panel with id of `#sample-metadata`
          var PANEL = d3.select("#sample-metadata");
          // Clear any Existing Metadata
          PANEL.html("");
          // Use `Object.entries` to Add Each Key & Value Pair to the Panel
          // Hint: Inside the Loop, Use d3 to Append New Tags for Each Key-Value in the Metadata
          Object.entries(data).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}:${value}`);
          })
      });  
    }

//Display each key-value pair from the metadata JSON object somewhere on the page

//Update all of the plots any time that a new sample is selected

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#sample-metadata").on("change", updatePlotly);
    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select( "#se1Dataset" );
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu .property( "value");
}