import { IDatasetResponseModel } from "../models/interfaces/DatasetResponseModelInterface";
import {
    getDatasetIDFromMaterial, getDatasetIDFromAuthor, getDatasetIDFromCategory,
    getDatasetIDFromSubcategory, getDatasetIDFromYear, getAllData
} from "../models/SelectQueryModel";

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
    let selectedDatasetIds;
    let setOfData;

    if (datasetReceived != undefined) {
        selectedDatasetIds = [datasetReceived];
    }
    else {
        let materialRawData;
        let yearRawData;
        let authorRawData;
        let categoryRawData;
        let duplicateCheck = 0;
        let materialDatasetIds = [];
        let yearDatasetIds = [];
        let authorDatasetIds = [];
        let categoryDatasetIds = [];

        // Check which variables were received and the data sets IDs linked to each variable
        if (materialReceived != undefined) {
            duplicateCheck++
            materialRawData = await getDatasetIDFromMaterial(materialReceived);
            for (let index = 0; index < materialRawData.length; index++) {
                materialDatasetIds[index] = materialRawData[index].dataset_id;
            }
        }
        if (yearReceived != undefined) {
            duplicateCheck++
            yearRawData = await getDatasetIDFromYear(yearReceived);
            for (let index = 0; index < yearRawData.length; index++) {
                yearDatasetIds[index] = yearRawData[index].dataset_id;
            }
        }
        if (firstNameReceived != undefined && lastNameReceived != undefined) {
            duplicateCheck++
            authorRawData = await getDatasetIDFromAuthor(firstNameReceived, lastNameReceived);
            for (let index = 0; index < authorRawData.length; index++) {
                authorDatasetIds[index] = authorRawData[index].dataset_id;
            }
        }
        if (categoryReceived != undefined) {
            duplicateCheck++
            if (subcategoryReceived != undefined) {
                categoryRawData = await getDatasetIDFromSubcategory(categoryReceived, subcategoryReceived);
            }
            else {
                categoryRawData = await getDatasetIDFromCategory(categoryReceived);
            }
            for (let index = 0; index < categoryRawData.length; index++) {
                categoryDatasetIds[index] = categoryRawData[index].dataset_id;
            }
        }

        selectedDatasetIds = await selectDatasetIds(duplicateCheck, materialDatasetIds, yearDatasetIds, authorDatasetIds, categoryDatasetIds)
    }
    setOfData = getDataFromDatasetIds(selectedDatasetIds)
    return setOfData;
}

export const selectDatasetIds = async (duplicateCheck: number, materialDatasetIds: any[], yearDatasetIds: any[], authorDatasetIds: any[], categoryDatasetIds: any[]) => {
    let selectedDatasetIds = []
    // Find the intersection of data sets IDs among all the different variables
    let allDatasetIds = materialDatasetIds.concat(yearDatasetIds).concat(authorDatasetIds).concat(categoryDatasetIds)
    let count: number
    let currentDatasetId: number
    for (let i = 0; i < allDatasetIds.length; i++) {
        count = 1;
        currentDatasetId = allDatasetIds[i]
        for (let j = i + 1; j < allDatasetIds.length; j++) {
            if (currentDatasetId == allDatasetIds[j]) {
                count++
            }
        }
        if (count == duplicateCheck) {
            selectedDatasetIds.push(currentDatasetId);
        }
    }
    return selectedDatasetIds;
}

export const getDataFromDatasetIds = async (selectedDatasetIds: any[]) => {
    // Query each data set ID to get its information and add to array of data
    let setOfData: Array<IDatasetResponseModel> = []
    for (let i = 0; i < selectedDatasetIds.length; i++) {
        setOfData.push(await getAllData(selectedDatasetIds[i]));
    }
    return setOfData
}