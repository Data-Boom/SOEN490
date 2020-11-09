const obtainDataModel = require('../models/SelectQueryDatabase');


const retrieveData = async () => {

    let datasetReceived = 1;
    let dataset2 = 2;
    let setOfDataPoints = [];

    setOfDataPoints = await obtainDataModel.getDataSet(datasetReceived, dataset2);

    return "Success";
}

module.exports = { retrieveData };