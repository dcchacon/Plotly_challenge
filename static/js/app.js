// D3 library to read from json file
d3.json("Data/samples.json").then((data)=>{
    // use sample_values as the values for the bar chart
    console.log(data)
    // var sample_values = {

        
    // }
// use otu_ids as the labels for the bar chart

// use otu_labels as the hovertext for the chart

}).catch(err => console.log(err));





//Create a buble chart that displays each sample

//Use otu_ids for the x values

//Use sample_values for the y values

//Use sample_values for the marker size

// Use otu_ids for the marker colors

//Use otu_labels for the text values


//Display the sample metadata, i.e. an individual's demographic information

//Display each key-value pair from the metadata JSON object somewhere on the page

//Update all of the plots any time that a new sample is selected