function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        // console.log("Metadata: ", data)
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        // console.log("Data: ", data);

        var samples = data.samples;
        var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
        var result = resultArray[0];
        // console.log("Result: ", result);

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

        var trace2 = {

            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            }
        };

        var trace2data = [trace2]

        var layout2 = {
            title: "Belly Button Bacteria",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };
    

        Plotly.newPlot("bubble", trace2data, layout2);

    });
};

function init() {

    var selector = d3.select("#selDataset");
    // Build chart using the list of sample names
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // Build charts with the first sample
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
};

function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
};

// Initialize the dashboard
init();

