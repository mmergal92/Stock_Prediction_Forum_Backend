//Algorithm for prediction of stock (basic)
const sampleData = ([
    {
    symbol: "AMZN",
    date: "2021-06-11",
    open: 3349.65, 
    close: 3346.83,
    changeActual: -2.82,
    changePercent: -0.084,
    volume: "2775089",
    vwap: 3348.95333,
    label: "June 11, 21"
},
{
    symbol: "AMZN",
    date: "2021-06-10",
    open: 3282.01,
    close: 3349.65,
    changeActual: 67.64,
    changePercent: 2.061,
    volume: "3303100",
    vwap: 3327.26667,
    label: "June 10, 21"
},
{
    symbol: "AMZN",
    date: "2021-06-09",
    open: 3272.87, 
    close: 3281.15,
    changeActual: 8.28,
    changePercent: 0.253,
    volume: "2442220",
    vwap: 3283.14333,
    label: "June 09, 21"
}
]);
//create EMPTY arrays to push into []
// const stockchange = [];

const prediction = () => {
    if ((sampleData[0].changePercent > 0) && (sampleData[1].changePercent > 0) && (sampleData[2].changePercent > 0)){
        console.log("stock will go up tomorrow")
    }else if (sampleData[0].changePercent > 0){
        console.log("stock might go up tomorrow too")
    }else if (sampleData[0].changePercent < 0){
        console.log("stock went down today and probably will go down tomorrow too")
    }
} 
prediction();
