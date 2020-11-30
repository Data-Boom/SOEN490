import { getConnection } from "typeorm";
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


const getDataFromDataset = async (datasetReceived) => {

    const connection = getConnection();
    console.log("Getting data set info based on a given data set ID");

    console.log("Getting publication data");
    let publicationData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(publicationData);

    console.log("Getting author data");
    let authorData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data set data");
    let datasetData = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting data set materials");
    let materialData = await connection.manager
        .createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData = await connection.manager
        .createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointCommentsAll = await connection.manager
        .createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datapointCommentsAll);

    let allData = [publicationData, authorData, datasetData, materialData, datapointData, datapointCommentsAll];
    return allData;
}

const getDataFromMaterial = async (materialReceived) => {

    const connection = getConnection();
    console.log("Getting data set info based on materials");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: materialReceived });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let materialPublicationData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialPublicationData);

    console.log("Getting authors");
    let materialAuthorData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialAuthorData);

    console.log("Getting data sets");
    let materialDatasetData = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialDatasetData);

    console.log("Getting data set materials");
    let materialMaterialData = await connection.manager
        .createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialMaterialData);

    console.log("Getting data point data");
    let materialDatapointData = await connection.manager
        .createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialDatapointData);

    console.log("Getting data point comments");
    let materialDatapointComments = await connection.manager
        .createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialDatapointComments);

    let allData = [materialPublicationData, materialAuthorData, materialDatasetData, materialMaterialData, materialDatapointData, materialDatapointComments];
    return allData;
}

const getDataFromAuthor = async (firstNameReceived, lastNameReceived) => {

    const connection = getConnection();
    console.log("Getting data set info based on one author");

    console.log("Getting publications");
    let authorPublicationData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorPublicationData);

    console.log("Getting authors");
    //To get all the authors of each data set that a single author is part of, 
    //one needs to first get the list of all data sets that the single author 
    //is part of and then query those data sets.

    //First get raw data of all data sets that single author is on
    let authorRawData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('dataset.id', 'dataset_id')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();

    //Process the prior data to get an array of all data sets IDs
    let authorIds = [];
    for (let index = 0; index < authorRawData.length; index++) {
        authorIds[index] = authorRawData[index].dataset_id;
    }

    //Use data set IDs to get all authors of those data sets
    let authorAuthorData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .whereInIds(authorIds)
        .getRawMany();
    console.log(authorAuthorData);

    console.log("Getting data sets");
    let authorDatasetData = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorDatasetData);

    console.log("Getting data point data");
    let authorDatapointData = await connection.manager
        .createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorDatapointData);

    console.log("Getting data set materials");
    let authorMaterialData = await connection.manager
        .createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorMaterialData);

    console.log("Getting data point comments");
    let authorDatapointComments = await connection.manager
        .createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorDatapointComments);

    let allData = [authorPublicationData, authorAuthorData, authorDatasetData, authorMaterialData, authorDatapointData, authorDatapointComments];
    return allData;
}

const getDataFromCategory = async (categoryReceived) => {

    const connection = getConnection();
    console.log("Getting data set info based on category");

    console.log("Getting publications");
    let categoryPublicationData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryPublicationData);

    console.log("Getting authors");
    let categoryAuthorData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryAuthorData);

    console.log("Getting data sets");
    let categoryDatasetData = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryDatasetData);

    console.log("Getting data set materials");
    let categoryMaterialData = await connection.manager
        .createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryMaterialData);

    console.log("Getting data point data");
    let categoryDatapointData = await connection.manager
        .createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryDatapointData);

    console.log("Getting data point comments");
    let categoryDatapointComments = await connection.manager
        .createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryDatapointComments);

    let allData = [categoryPublicationData, categoryAuthorData, categoryDatasetData, categoryMaterialData, categoryDatapointData, categoryDatapointComments];
    return allData;
}

const getDataFromSubcategory = async (categoryReceived, subcategoryReceived) => {

    const connection = getConnection();
    console.log("Getting data set info based on category and subcategory");

    console.log("Getting publications");
    let subcategoryPublicationData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryPublicationData);

    console.log("Getting authors");
    let subcategoryAuthorData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryAuthorData);

    console.log("Getting data sets");
    let subcategoryDatasetData = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryDatasetData);

    console.log("Getting data set materials");
    let subcategoryMaterialData = await connection.manager
        .createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryMaterialData);

    console.log("Getting data point data");
    let subcategoryDatapointData = await connection.manager
        .createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryDatapointData);

    console.log("Getting data point comments");
    let subcategoryDatapointComments = await connection.manager
        .createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryDatapointComments);

    let allData = [subcategoryPublicationData, subcategoryAuthorData, subcategoryDatasetData, subcategoryMaterialData, subcategoryDatapointData, subcategoryDatapointComments];
    return allData;
}

const getDataFromYear = async (yearReceived) => {

    const connection = getConnection();
    console.log("Getting data set info based year");

    console.log("Getting publications");
    let yearPublicationData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('publication.name', 'publication_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('publication.doi', 'publication_doi')
        .addSelect('publication.pages', 'publication_pages')
        .addSelect('publication.volume', 'publication_volume')
        .addSelect('publication.year', 'publication_year')
        .addSelect('publication.datePublished', 'publication_datePublished')
        .addSelect('publication.dateAccessed', 'publication_dateAccessed')
        .addSelect('publisher.name', 'publisher_name')
        .addSelect('publicationtype.name', 'publicationtype_name')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
        .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearPublicationData);

    console.log("Getting authors");
    let yearAuthorData = await connection.manager
        .createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearAuthorData);

    console.log("Getting data sets");
    let yearDatasetData = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearDatasetData);

    console.log("Getting data set materials");
    let yearMaterialData = await connection.manager
        .createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearMaterialData);

    console.log("Getting data point data");
    let yearDatapointData = await connection.manager
        .createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearDatapointData);

    console.log("Getting data point comments");
    let yearDatapointComments = await connection.manager
        .createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearDatapointComments);

    let allData = [yearPublicationData, yearAuthorData, yearDatasetData, yearMaterialData, yearDatapointData, yearDatapointComments];
    return allData;
}

module.exports = { getDataFromDataset, getDataFromMaterial, getDataFromAuthor, getDataFromCategory, getDataFromSubcategory, getDataFromYear };