import {
    getDataFromDataset, getDataFromMaterial, getDataFromMaterialYearAuthorSubcategory,
    getDataFromMaterialYearAuthorCategory, getDataFromMaterialYearAuthor, getDataFromMaterialYearSubcategory,
    getDataFromMaterialAuthorSubcategory, getDataFromMaterialYear, getDataFromMaterialSubcategory,
    getDataFromMaterialAuthor, getDataFromMaterialYearCategory, getDataFromMaterialAuthorCategory,
    getDataFromMaterialCategory, getDataFromYearCategory, getDataFromYearSubcategory, getDataFromYearAuthor,
    getDataFromYearAuthorCategory, getDataFromYearAuthorSubcategory, getDataFromYear,
    getDataFromAuthorSubcategory, getDataFromAuthorCategory, getDataFromAuthor,
    getDataFromSubcategory, getDataFromCategory
} from '../models/SelectQueryDatabase';

interface IDataRequestModel {
    datasetId: number
    material: string
    firstName: string
    lastName: string
    year: number
    categoryId: number
    subcategoryId: number
}

export const retrieveData = async (req) => {

    const request: IDataRequestModel = req.query
    let datasetReceived = request.datasetId;
    let materialReceived = request.material;
    let firstNameReceived = request.firstName;
    let lastNameReceived = request.lastName;
    let yearReceived = request.year;
    let categoryReceived = request.categoryId;
    let subcategoryReceived = request.subcategoryId;
    let setOfData;


    // To avoid checks for both first and last name, make a bool for author being entered
    let authorEntered = false
    if (firstNameReceived != undefined && lastNameReceived != undefined) {
        authorEntered = true
    }

    //As subcategory requires an accompanying category, make a bool for
    //Both category and subcategory being entered
    let subcategoryEntered = false
    if (categoryReceived != undefined && subcategoryReceived != undefined) {
        subcategoryEntered = true
    }
    //Subcategory queries must always be listed above category queries, 
    //as a subcategory query contains both a category and subcategory entry
    if (datasetReceived != undefined) {
        setOfData = await getDataFromDataset(datasetReceived);
    }
    else if (materialReceived != undefined) {
        if (yearReceived != undefined && authorEntered && subcategoryEntered) {
            setOfData = await getDataFromMaterialYearAuthorSubcategory(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived);
        }
        else if (yearReceived != undefined && authorEntered && categoryReceived != undefined) {
            setOfData = await getDataFromMaterialYearAuthorCategory(materialReceived, yearReceived, firstNameReceived, lastNameReceived, categoryReceived);
        }
        else if (yearReceived != undefined && authorEntered) {
            setOfData = await getDataFromMaterialYearAuthor(materialReceived, yearReceived, firstNameReceived, lastNameReceived);
        }
        else if (yearReceived != undefined && subcategoryEntered) {
            setOfData = await getDataFromMaterialYearSubcategory(materialReceived, yearReceived, categoryReceived, subcategoryReceived);
        }
        else if (yearReceived != undefined && categoryReceived != undefined) {
            setOfData = await getDataFromMaterialYearCategory(materialReceived, yearReceived, categoryReceived);
        }
        else if (yearReceived != undefined) {
            setOfData = await getDataFromMaterialYear(materialReceived, yearReceived);
        }
        else if (authorEntered && subcategoryEntered) {
            setOfData = await getDataFromMaterialAuthorSubcategory(materialReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived);
        }
        else if (authorEntered && categoryReceived != undefined) {
            setOfData = await getDataFromMaterialAuthorCategory(materialReceived, firstNameReceived, lastNameReceived, categoryReceived);
        }
        else if (authorEntered) {
            setOfData = await getDataFromMaterialAuthor(materialReceived, firstNameReceived, lastNameReceived);
        }
        else if (subcategoryEntered) {
            setOfData = await getDataFromMaterialSubcategory(materialReceived, categoryReceived, subcategoryReceived);
        }
        else if (categoryReceived != undefined) {
            setOfData = await getDataFromMaterialCategory(materialReceived, categoryReceived);
        }
        else {
            setOfData = await getDataFromMaterial(materialReceived);
        }
    }
    else if (yearReceived != undefined) {
        if (authorEntered && subcategoryEntered) {
            setOfData = await getDataFromYearAuthorSubcategory(yearReceived, firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived);
        }
        else if (authorEntered && categoryReceived != undefined) {
            setOfData = await getDataFromYearAuthorCategory(yearReceived, firstNameReceived, lastNameReceived, categoryReceived);
        }
        else if (authorEntered) {
            setOfData = await getDataFromYearAuthor(yearReceived, firstNameReceived, lastNameReceived);
        }
        else if (subcategoryEntered) {
            setOfData = await getDataFromYearSubcategory(yearReceived, categoryReceived, subcategoryReceived);
        }
        else if (categoryReceived != undefined) {
            setOfData = await getDataFromYearCategory(yearReceived, categoryReceived);
        }
        else {
            setOfData = await getDataFromYear(yearReceived);
        }
    }
    else if (authorEntered) {
        if (subcategoryEntered) {
            setOfData = await getDataFromAuthorSubcategory(firstNameReceived, lastNameReceived, categoryReceived, subcategoryReceived);
        }
        else if (categoryReceived != undefined) {
            setOfData = await getDataFromAuthorCategory(firstNameReceived, lastNameReceived, categoryReceived);
        }
        else {
            setOfData = await getDataFromAuthor(firstNameReceived, lastNameReceived);
        }
    }
    else if (subcategoryEntered) {
        setOfData = await getDataFromSubcategory(categoryReceived, subcategoryReceived);
    }
    else if (categoryReceived != undefined) {
        setOfData = await getDataFromCategory(categoryReceived);
    }
    return setOfData;
}
