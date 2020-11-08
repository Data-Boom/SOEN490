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


const insertReferenceType = async (preferenceType) => {

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

    for (var i = 0; i < storeAuthors.length; i++) {
        console.log(storeAuthors[i].firstname);
        let author = new Authors();
        author.id;
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
        let composition = new Composition();
        composition.id;
        composition.composition = material[i].composition;
        await connection.manager.save(composition);

        let someMaterial = new Material();
        someMaterial.id;
        someMaterial.compositionId = composition.id;
        someMaterial.details = material[i].details;
        await connection.manager.save(someMaterial);
    }
}

const insertCategories = async (_category, sub_category) => {

    const connection = getConnection();
    let categoryIDs = [];

    let category = new Category();
    category.id;
    category.name = _category;
    await connection.manager.save(category);

    let subcategory = new Subcategory();
    subcategory.id;
    subcategory.name = sub_category;
    await connection.manager.save(subcategory);
    categoryIDs.push(category.id, subcategory.id);
    return categoryIDs;
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

const insertFullDataSet = async (dataSetName, dataSetDataTypeID, publicationID, /* categoryIDs ,*/ material, dataSetComments) => {

    const connection = getConnection();

    let dataset = new Dataset();
    dataset.id;
    dataset.name = dataSetName;
    dataset.datatypeId = dataSetDataTypeID;
    dataset.publicationId = publicationID;
    dataset.categoryId; //= categoryIDs[0];
    dataset.subcategoryId; //= categoryIDs[1];
    dataset.materials = material;
    dataset.comments = dataSetComments;
    await connection.manager.save(dataset);
    console.log("First dataset saved.");
    return dataset.id;
}

const insertUnits = async (someUnit) => {

    const connection = getConnection();

    let units = new Units();
    units.id;
    units.name = someUnit;
    units.units = someUnit;
    await connection.manager.save(units);
    return units.id;
}

const insertRepresentation = async (representationUnit) => {

    const connection = getConnection();

    let repr = new Representations();
    repr.id;
    repr.repr = representationUnit;
    await connection.manager.save(repr);
    return repr.id;
}

const insertDataPointsOfSet = async (dataSetID, dataVariableName, dataPointValues, unitsID, reprID) => {

    const connection = getConnection();

    let datapoint = new Datapoints();
    datapoint.id;
    datapoint.datasetId = dataSetID;
    datapoint.name = dataVariableName;
    datapoint.values = dataPointValues;
    datapoint.unitsId = unitsID;
    datapoint.representationsId = reprID;
    await connection.manager.save(datapoint);
}

const insertDataPointsOfSetComments = async (dataSetID, comments) => {

    const connection = getConnection();

    let datapointcomments = new Datapointcomments();
    datapointcomments.id;
    datapointcomments.datasetId = dataSetID;
    datapointcomments.comments = comments;
    await connection.manager.save(datapointcomments);
}

module.exports = {
    insertAuthors,
    insertCategories,
    insertDataSetDataType,
    insertDataPointsOfSet,
    insertDataPointsOfSetComments,
    insertFullDataSet,
    insertMaterial,
    insertPublication,
    insertPublisher,
    insertReferenceType,
    insertRepresentation,
    insertUnits
};