import { Connection, EntityManager, getConnection } from "typeorm";
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


interface IPublicationModel {
    publication_name: string
    publication_doi: string
    publication_pages: number
    publication_volume: number
    publication_year: number
    publication_datePublished: Date
    publication_dateAccessed: Date
    dataset_id: number
    publisher_name: string
    publicationtype_name: string
}

interface IAuthorModel {
    author_firstName: string
    author_lastName: string
    author_middleName: string
    dataset_id: number
}

interface IDatasetModel {
    dataset_id: string
    dataset_name: string
    dataset_comments: string
    datasetdatatype_name: string
    category_name: string
    subcategory_name: string
}

interface IMaterialModel {
    material_details: string
    composition_name: string
    dataset_id: number
}

interface IDataPointModel {
    datapoints_name: string
    datapoints_values: number[]
    units_units: string
    representations_repr: string
    dataset_id: number
}

interface IDataPointCommentModel {
    datapointcomments_comments: string[]
    dataset_id: number
}

interface IDatasetResponseModel {
    publications: IPublicationModel[]
    authors: IAuthorModel[]
    dataset: IDatasetModel[]
    materials: IMaterialModel[]
    dataPoints: IDataPointModel[]
    dataPointComments: IDataPointCommentModel[]
}
const selectPublicationsQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Publications, 'publication')
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

const selectAuthorsQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Publications, 'publication')
        .select('author.firstName', 'author_firstName')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')

const selectDatasetsQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Dataset, 'dataset')
        .select('dataset.name', 'dataset_name')
        .addSelect('dataset.id', 'dataset_id')
        .addSelect('datasetdatatype.name', 'datasetdatatype_name')
        .addSelect('category.name', 'category_name')
        .addSelect('subcategory.name', 'subcategory_name')
        .addSelect('dataset.comments', 'dataset_comments')
        .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')

const selectMaterialQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Material, 'material')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .innerJoin('material.datasets', 'dataset')

const selectDataPointsQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Datapoints, 'datapoints')
        .select('datapoints.name', 'datapoints_name')
        .addSelect('datapoints.values', 'datapoints_values')
        .addSelect('units.units', 'units_units')
        .addSelect('representations.repr', 'representations_repr')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
        .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
        .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')

const selectDataPointCommentsQuery = (manager: EntityManager) =>
    manager.createQueryBuilder(Datapointcomments, 'datapointcomments')
        .select('datapointcomments.comments', 'datapointcomments_comments')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')

const getDataFromDataset = async (datasetReceived: number): Promise<IDatasetResponseModel> => {
    const connection = getConnection();

    console.log("Getting data set info based on a given data set ID");

    console.log("Getting publication data");
    let datasetPublicationData = await selectPublicationsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetPublicationData);

    console.log("Getting author data");
    let datasetAuthorData = await selectAuthorsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetAuthorData);

    console.log("Getting data set data");
    let datasetDatasetData = await selectDatasetsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetDatasetData);

    console.log("Getting data set materials");
    let datasetMaterialData = await selectMaterialQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetMaterialData);

    console.log("Getting data point data");
    let datasetDatapointData = await selectDataPointsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetDatapointData);

    console.log("Getting data point comments");
    let datasetDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: datasetReceived })
        .getRawMany();
    console.log(datasetDatapointComments);

    const allData: IDatasetResponseModel = {
        authors: datasetAuthorData,
        publications: datasetPublicationData,
        dataPoints: datasetDatapointData,
        dataset: datasetDatasetData,
        materials: datasetMaterialData,
        dataPointComments: datasetDatapointComments
    }
    return allData;

}

const getDataFromMaterial = async (materialReceived: string): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on materials");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: materialReceived });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let materialPublicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialPublicationData);

    console.log("Getting authors");
    let materialAuthorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialAuthorData);

    console.log("Getting data sets");
    let materialDatasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialDatasetData);

    //To get all the materials of all the data sets that material X is part of,
    //one needs to first get the list of all data sets that contain material X 
    //and then query those data sets for all materials in each data set.

    //First get raw data of all data sets that material X is part of
    let materialRawData = await selectMaterialQuery(connection.manager)
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();

    //Process the prior data to get an array of all data sets IDs
    let materialIds = [];
    for (let index = 0; index < materialRawData.length; index++) {
        materialIds[index] = materialRawData[index].dataset_id;
    }

    //Use data set IDs to get all materials of those data sets
    let materialMaterialData: IMaterialModel[] = await connection.manager
        .createQueryBuilder(Dataset, 'dataset')
        .select('composition.composition', 'composition_name')
        .addSelect('material.details', 'material_details')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
        .whereInIds(materialIds)
        .getRawMany();
    console.log(materialMaterialData);

    console.log("Getting data point data");
    let materialDatapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialDatapointData);

    console.log("Getting data point comments");
    let materialDatapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where('material.compositionId = :compositionRef', { compositionRef: compositionId })
        .orWhere('material.details = :materialDetails', { materialDetails: materialReceived })
        .getRawMany();
    console.log(materialDatapointComments);

    const allData: IDatasetResponseModel = {
        authors: materialAuthorData,
        publications: materialPublicationData,
        dataPoints: materialDatapointData,
        dataset: materialDatasetData,
        materials: materialMaterialData,
        dataPointComments: materialDatapointComments
    }

    return allData;
}

export const getDataFromAuthor = async (firstNameReceived: string, lastNameReceived: string): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on one author");

    console.log("Getting publications");
    let authorPublicationData = await selectPublicationsQuery(connection.manager)
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
    let authorRawData = await selectAuthorsQuery(connection.manager)
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
        .createQueryBuilder(Dataset, 'dataset')
        .select('author.firstName', 'author_firstName')
        .addSelect('author.lastName', 'author_lastName')
        .addSelect('author.middleName', 'author_middleName')
        .addSelect('dataset.id', 'dataset_id')
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .whereInIds(authorIds)
        .getRawMany();
    console.log(authorAuthorData);

    console.log("Getting data sets");
    let authorDatasetData = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorDatasetData);

    console.log("Getting data point data");
    let authorDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorDatapointData);

    console.log("Getting data set materials");
    let authorMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorMaterialData);

    console.log("Getting data point comments");
    let authorDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where('author.lastName = :lastNameRef', { lastNameRef: lastNameReceived })
        .andWhere('author.firstName = :firstNameRef', { firstNameRef: firstNameReceived })
        .orWhere('author.lastName = :firstNameRef', { firstNameRef: firstNameReceived })
        .andWhere('author.firstName = :lastNameRef', { lastNameRef: lastNameReceived })
        .getRawMany();
    console.log(authorDatapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorAuthorData,
        publications: authorPublicationData,
        dataPoints: authorDatapointData,
        dataset: authorDatasetData,
        materials: authorMaterialData,
        dataPointComments: authorDatapointComments
    }
    return allData;
}

const getDataFromCategory = async (categoryReceived: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on category");

    console.log("Getting publications");
    let categoryPublicationData = await selectPublicationsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryPublicationData);

    console.log("Getting authors");
    let categoryAuthorData = await selectAuthorsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryAuthorData);

    console.log("Getting data sets");
    let categoryDatasetData = await selectDatasetsQuery(connection.manager)
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryDatasetData);

    console.log("Getting data set materials");
    let categoryMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryMaterialData);

    console.log("Getting data point data");
    let categoryDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryDatapointData);


    console.log("Getting data point comments");
    let categoryDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .getRawMany();
    console.log(categoryDatapointComments);

    const allData: IDatasetResponseModel = {
        authors: categoryAuthorData,
        publications: categoryPublicationData,
        dataPoints: categoryDatapointData,
        dataset: categoryDatasetData,
        materials: categoryMaterialData,
        dataPointComments: categoryDatapointComments
    }
    return allData;
}

const getDataFromSubcategory = async (categoryReceived: number, subcategoryReceived: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on category and subcategory");

    console.log("Getting publications");
    let subcategoryPublicationData = await selectPublicationsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryPublicationData);

    console.log("Getting authors");
    let subcategoryAuthorData = await selectAuthorsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryAuthorData);

    console.log("Getting data sets");
    let subcategoryDatasetData = await selectDatasetsQuery(connection.manager)
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryDatasetData);

    console.log("Getting data set materials");
    let subcategoryMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryMaterialData);

    console.log("Getting data point data");
    let subcategoryDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryDatapointData);

    console.log("Getting data point comments");
    let subcategoryDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: categoryReceived })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategoryReceived })
        .getRawMany();
    console.log(subcategoryDatapointComments);

    const allData: IDatasetResponseModel = {
        authors: subcategoryAuthorData,
        publications: subcategoryPublicationData,
        dataPoints: subcategoryDatapointData,
        dataset: subcategoryDatasetData,
        materials: subcategoryMaterialData,
        dataPointComments: subcategoryDatapointComments
    }
    return allData;
}

const getDataFromYear = async (yearReceived: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based year");

    console.log("Getting publications");
    let yearPublicationData = await selectPublicationsQuery(connection.manager)
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearPublicationData);

    console.log("Getting authors");
    let yearAuthorData = await selectAuthorsQuery(connection.manager)
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearAuthorData);

    console.log("Getting data sets");
    let yearDatasetData = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearDatasetData);

    console.log("Getting data set materials");
    let yearMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearMaterialData);

    console.log("Getting data point data");
    let yearDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearDatapointData);

    console.log("Getting data point comments");
    let yearDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: yearReceived })
        .getRawMany();
    console.log(yearDatapointComments);

    const allData: IDatasetResponseModel = {
        authors: yearAuthorData,
        publications: yearPublicationData,
        dataPoints: yearDatapointData,
        dataset: yearDatasetData,
        materials: yearMaterialData,
        dataPointComments: yearDatapointComments
    }
    return allData;
}

module.exports = { getDataFromDataset, getDataFromMaterial, getDataFromAuthor, getDataFromCategory, getDataFromSubcategory, getDataFromYear };