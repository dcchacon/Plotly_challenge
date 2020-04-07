function buildMetadata(sample) {
    // add here
};

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        console.log("Data: ", data)

        var samples = data.samples
        var resultArray = samples.filter(sampleObject => sampleObject.id == sample)
        var result = resultArray[0]
        console.log("Result: ", result)


        // use otu_ids as the labels for the bar chart
        // use otu_labels as the hovertext for the chart
        // var otu_ids = result.id.slice(0, 10).reverse();
        // var otu_labels = result.otu_labels.slice(0, 10).reverse();
        // var sample_values = result.sample_values.slice(0, 10).reverse();
        // var labels = otu_ids.map(IDstring => `OTU ${IDstring}`)

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {

                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                labels: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ]

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

    });
};

function init() {

    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // Use the first sample from the list to build the initial plots
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        //  buildMetadata(firstSample);
    });
};

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
};


// Initialize the dashboard
init();

