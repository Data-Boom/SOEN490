import { getConnection } from "typeorm";

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

// Left logs in the class for debugging after DB migration.

/**
 * This model class is responsible for updating the database with the extracted from the fileUpload. 
 */
export class DataUploadModel {
    constructor() {
    }

    async insertReferenceType(preferenceType: string) {

        const connection = getConnection();

        let book = new Publicationtype();
        book.id;
        book.name = preferenceType;
        await connection.manager.save(book);
        return book.id;
    }

    async insertPublisher(publisher: string) {

        const connection = getConnection();

        let publisherName = new Publisher();
        publisherName.id;
        publisherName.name = publisher;
        await connection.manager.save(publisherName);
        return publisherName.id;
    }

    async insertAuthors(storeAuthors: any[]) {

        const connection = getConnection();

        for (let i = 0; i < storeAuthors.length; i++) {
            console.log(storeAuthors[i].firstname);
            let author = new Authors();
            author.id;
            author.firstName = storeAuthors[i].firstname;
            author.lastName = storeAuthors[i].lastname;
            author.middleName = storeAuthors[i].middlename;
            await connection.manager.save(author);
        }
    }

    async insertPublication(referenceTitle: string, referencePages: number, preferenceTypeID: number, publisherNameId: number, referenceYear: number, referenceVolume: number, referenceAuthors: any[]) {

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

    async insertMaterial(material: any[]) {

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

    async insertCategories(_category: string, _subCategory: string) {

        const connection = getConnection();
        let categoryIDs = [];

        let category = new Category();
        category.id;
        category.name = _category;
        await connection.manager.save(category);

        let subcategory = new Subcategory();
        subcategory.id;
        subcategory.name = _subCategory;
        await connection.manager.save(subcategory);
        categoryIDs.push(category.id, subcategory.id);
        return categoryIDs;
    }

    async insertDataSetDataType(datasetdatatypeValue: string) {

        const connection = getConnection();

        let datasetdatatype = new Datasetdatatype();
        datasetdatatype.id;
        datasetdatatype.name = datasetdatatypeValue;
        await connection.manager.save(datasetdatatype);
        console.log("datasetdatatypeValue saved.");
        return datasetdatatype.id;
    }

    async insertFullDataSet(dataSetName: string, dataSetDataTypeID: number, publicationID: number, /* categoryIDs ,*/ material: any[], dataSetComments: string) {

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

    async insertUnits(someUnit: string) {

        const connection = getConnection();

        let units = new Units();
        units.id;
        units.name = someUnit;
        units.units = someUnit;
        await connection.manager.save(units);
        return units.id;
    }

    async insertRepresentation(representationUnit: string) {

        const connection = getConnection();

        let repr = new Representations();
        repr.id;
        repr.repr = representationUnit;
        await connection.manager.save(repr);
        return repr.id;
    }

    async insertDataPointsOfSet(dataSetID: number, dataVariableName: string, dataPointValues: number[], unitsID: number, reprID: number) {

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

    async insertDataPointsOfSetComments(dataSetID: number, comments: string[]) {

        const connection = getConnection();

        let datapointcomments = new Datapointcomments();
        datapointcomments.id;
        datapointcomments.datasetId = dataSetID;
        datapointcomments.comments = comments;
        await connection.manager.save(datapointcomments);
    }
}

