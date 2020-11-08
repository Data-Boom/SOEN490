import { getRepository, getConnection } from "typeorm";

import { Authors } from './entities/Authors';
import { Publications } from './entities/Publications';
import { Publisher } from './entities/Publisher';
import { Publicationtype } from './entities/Publicationtype';
import { Composition } from './entities/Composition';
import { Datasetdatatype } from './entities/Datasetdatatype';
import { Dataset } from './entities/Dataset';
import { Category } from './entities/Category';
import { Subcategory } from './entities/Subcategory';
import { Datapoints } from './entities/Datapoints';
import { Units } from './entities/Units';
import { Material } from './entities/Material';
import { Datapointcomments } from './entities/Datapointcomments';
import { Representations } from './entities/Representations';


const insertPreferenceType = async (preferenceType) => {

    const connection = getConnection();
    let book = new Publicationtype();
    book.id;
    book.name = preferenceType;
    await connection.manager.save(book);
    return book.id;
}

const insertPublisher = async (publisher) => {

    const connection = getConnection();
    let publisherName = new Publisher();
    publisherName.id;
    publisherName.name = publisher;
    await connection.manager.save(publisherName);
    return publisherName.id;
}

const insertAuthors = async (storeAuthors) => {

    const connection = getConnection();

    for (var i = 0; i < storeAuthors; i++) {
        let author = new Authors();
        author.id = 0;
        author.firstName = storeAuthors[i].firstname;
        author.lastName = storeAuthors[i].lastname;
        author.middleName = storeAuthors[i].middlename;
        await connection.manager.save(author);
    }
}

const insertPublication = async (referenceTitle, referencePages, preferenceTypeID, publisherNameId, referenceYear, referenceVolume, referenceAuthors) => {

    const connection = getConnection();

    let publication = new Publications();
    publication.id;
    publication.name = referenceTitle;
    publication.doi;
    publication.pages = referencePages;
    publication.publicationtypeId = preferenceTypeID;
    publication.publisherId = publisherNameId;
    publication.year = referenceYear;
    publication.volume = referenceVolume;
    publication.datePublished;
    publication.dateAccessed;
    publication.authors = referenceAuthors;
    await connection.manager.save(publication);
    console.log("publication saved.");
    return publication.id;
}

const insertMaterial = async (material) => {

    const connection = getConnection();

    for (var i = 0; i < material.length; i++) {
        let compositionCO2 = new Composition();
        compositionCO2.id = i;
        compositionCO2.composition = material[i].composition;
        compositionCO2.name = material[i].details;
        await connection.manager.save(compositionCO2);
    }
    console.log("material saved.");
}

const insertDataSetDataType = async (datasetdatatypeValue) => {

    const connection = getConnection();

    let datasetdatatype = new Datasetdatatype();
    datasetdatatype.id;
    datasetdatatype.name = datasetdatatypeValue;
    await connection.manager.save(datasetdatatype);
    console.log("datasetdatatypeValue saved.");
    return datasetdatatype.id;
}

const insertFullDataSet = async (dataSetName, dataSetDataTypeID, publicationID, material, dataSetComments) => {

    const connection = getConnection();

    let dataset = new Dataset();
    dataset.id;
    dataset.name = dataSetName;
    dataset.datatypeId = dataSetDataTypeID;
    dataset.publicationId = publicationID;
    dataset.categoryId;
    dataset.subcategoryId;
    dataset.materials = material;
    dataset.comments = dataSetComments;
    await connection.manager.save(dataset);
    console.log("First dataset saved.");
}

//Here
const insertUnits = async () => {

    const connection = getConnection();

    let unitsGCC = new Units();
    unitsGCC.id;
    unitsGCC.name = "g/cc";
    unitsGCC.units = "g/cc";
    await connection.manager.save(unitsGCC);
}

module.exports = {
    insertPublisher,
    insertPreferenceType,
    insertAuthors,
    insertPublication,
    insertMaterial,
    insertDataSetDataType,
    insertFullDataSet,
    insertUnits
};