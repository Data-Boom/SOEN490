const obtainDataModel = require('../models/SelectQueryDatabase');


const retrieveData = async () => {

    let datasetReceived = 1;
    //let materialReceived = "Carbon, Graphite, Pressed Graphite";
    let materialReceived = "C";
    let firstNameReceived = "R.";
    let lastNameReceived = "Ackbar";
    let yearReceived = 1997;
    let categoryReceived = 2;
    let subcategoryReceived = 2;
    let setOfData = [];

    //setOfData = await obtainDataModel.getDataFromDataset(datasetReceived);
    //setOfData = await obtainDataModel.getDataFromMaterial(materialReceived);
    setOfData = await obtainDataModel.getDataFromAuthor(firstNameReceived, lastNameReceived);
    //setOfData = await obtainDataModel.getDataFromCategory(categoryReceived);
    //setOfData = await obtainDataModel.getDataFromSubcategory(categoryReceived, subcategoryReceived);
    //setOfData = await obtainDataModel.getDataFromYear(yearReceived);

    // Creates a 2D array of objects. Entries in order are: 
    // Publication info, author names, data set info, materials,
    // data points themselves, and data point comments
    // For example to get the compostion of a second material:
    // setOfData[3][1].composition_name
    return setOfData;
}

module.exports = { retrieveData };