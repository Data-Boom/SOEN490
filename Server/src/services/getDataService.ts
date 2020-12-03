const obtainDataModel = require('../models/SelectQueryDatabase');

interface IDataRequestModel {
    datasetId: number
    material: string
    firstName: string
    lastName: string
    year: number
    categoryId: number
    subcategoryId: number
}

const retrieveData = async (req) => {

    const request: IDataRequestModel = req.query
    let datasetReceived = request.datasetId;
    let materialReceived = request.material;
    let firstNameReceived = request.firstName;
    let lastNameReceived = request.lastName;
    let yearReceived = request.year;
    let categoryReceived = request.categoryId;
    let subcategoryReceived = request.subcategoryId;
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