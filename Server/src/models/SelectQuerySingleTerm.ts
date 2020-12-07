import { getConnection } from "typeorm";
import { selectAuthorsQuery, selectAuthorBasedOnSingleAuthorQuery } from "./entities/Authors";
import { Category } from "./entities/Category";
import { Composition } from "./entities/Composition";
import { selectDataPointCommentsQuery } from "./entities/Datapointcomments";
import { selectDataPointsQuery } from "./entities/Datapoints";
import { selectDatasetsQuery } from "./entities/Dataset";
import { selectMaterialQuery, selectMaterialBasedOnSingleMateriarlQuery } from "./entities/Material";
import { selectPublicationsQuery, Publications } from "./entities/Publications";
import { Subcategory } from "./entities/Subcategory";
import {
    IDatasetResponseModel, IAuthorModel, IPublicationModel, IDatasetModel,
    IMaterialModel, IDataPointModel, IDataPointCommentModel
} from "./interfaces/DatasetResponseModelInterface";

export const getDataFromDataset = async (dataset: number): Promise<IDatasetResponseModel> => {
    const connection = getConnection();

    console.log("Getting data set info based on a given data set ID");

    console.log("Getting publication data");
    let datasetPublicationData = await selectPublicationsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: dataset })
        .getRawMany();
    console.log(datasetPublicationData);

    console.log("Getting author data");
    let datasetAuthorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: dataset })
        .getRawMany();
    console.log(datasetAuthorData);

    console.log("Getting data set data");
    let datasetDatasetData = await selectDatasetsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: dataset })
        .getRawMany();
    console.log(datasetDatasetData);

    console.log("Getting data set materials");
    let datasetMaterialData = await selectMaterialQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: dataset })
        .getRawMany();
    console.log(datasetMaterialData);

    console.log("Getting data point data");
    let datasetDatapointData = await selectDataPointsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: dataset })
        .getRawMany();
    console.log(datasetDatapointData);

    console.log("Getting data point comments");
    let datasetDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .where('dataset.id = :datasetId', { datasetId: dataset })
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

export const getDataFromMaterial = async (material: string): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let materialPublicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(materialPublicationData);

    console.log("Getting authors");
    let materialAuthorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(materialAuthorData);

    console.log("Getting data sets");
    let materialDatasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(materialDatasetData);

    //To get all the materials of all the data sets that material X is part of,
    //one needs to first get the list of all data sets that contain material X 
    //and then query those data sets for all materials in each data set.

    //First get raw data of all data sets that material X is part of
    let materialRawData = await selectMaterialQuery(connection.manager)
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();

    //Process the prior data to get an array of all data sets IDs
    let materialIds = [];
    for (let index = 0; index < materialRawData.length; index++) {
        materialIds[index] = materialRawData[index].dataset_id;
    }

    //Use data set IDs to get all materials of those data sets
    let materialMaterialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .whereInIds(materialIds)
        .getRawMany();
    console.log(materialMaterialData);

    console.log("Getting data point data");
    let materialDatapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(materialDatapointData);

    console.log("Getting data point comments");
    let materialDatapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
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

export const getDataFromYear = async (year: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based year");

    console.log("Getting publications");
    let yearPublicationData = await selectPublicationsQuery(connection.manager)
        .where('publication.year = :yearRef', { yearRef: year })
        .getRawMany();
    console.log(yearPublicationData);

    console.log("Getting authors");
    let yearAuthorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .where('publication.year = :yearRef', { yearRef: year })
        .getRawMany();
    console.log(yearAuthorData);

    console.log("Getting data sets");
    let yearDatasetData = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: year })
        .getRawMany();
    console.log(yearDatasetData);

    console.log("Getting data set materials");
    let yearMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: year })
        .getRawMany();
    console.log(yearMaterialData);

    console.log("Getting data point data");
    let yearDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: year })
        .getRawMany();
    console.log(yearDatapointData);

    console.log("Getting data point comments");
    let yearDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: year })
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

export const getDataFromAuthor = async (firstName: string, lastName: string): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on author");

    console.log("Getting publications");
    let authorPublicationData = await selectPublicationsQuery(connection.manager)
        .innerJoin('publication.authors', 'author')
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(authorPublicationData);

    console.log("Getting authors");
    //To get all the authors of each data set that a single author is part of, 
    //one needs to first get the list of all data sets that the single author 
    //is part of and then query those data sets.

    //First get raw data of all data sets that single author is on
    let authorRawData = await selectAuthorsQuery(connection.manager)
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();

    //Process the prior data to get an array of all data sets IDs
    let authorIds = [];
    for (let index = 0; index < authorRawData.length; index++) {
        authorIds[index] = authorRawData[index].dataset_id;
    }

    //Use data set IDs to get all authors of those data sets
    let authorAuthorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .whereInIds(authorIds)
        .getRawMany();
    console.log(authorAuthorData);

    console.log("Getting data sets");
    let authorDatasetData = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(authorDatasetData);

    console.log("Getting data point data");
    let authorDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(authorDatapointData);

    console.log("Getting data set materials");
    let authorMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(authorMaterialData);

    console.log("Getting data point comments");
    let authorDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
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

export const getDataFromCategory = async (category: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on category");

    console.log("Getting publications");
    let categoryPublicationData = await selectPublicationsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(categoryPublicationData);

    console.log("Getting authors");
    let categoryAuthorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(categoryAuthorData);

    console.log("Getting data sets");
    let categoryDatasetData = await selectDatasetsQuery(connection.manager)
        .where('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(categoryDatasetData);

    console.log("Getting data set materials");
    let categoryMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(categoryMaterialData);

    console.log("Getting data point data");
    let categoryDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(categoryDatapointData);


    console.log("Getting data point comments");
    let categoryDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where('category.id = :categoryId', { categoryId: category })
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

export const getDataFromSubcategory = async (category: number, subcategory: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on subcategory");

    console.log("Getting publications");
    let subcategoryPublicationData = await selectPublicationsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(subcategoryPublicationData);

    console.log("Getting authors");
    let subcategoryAuthorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(subcategoryAuthorData);

    console.log("Getting data sets");
    let subcategoryDatasetData = await selectDatasetsQuery(connection.manager)
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(subcategoryDatasetData);

    console.log("Getting data set materials");
    let subcategoryMaterialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(subcategoryMaterialData);

    console.log("Getting data point data");
    let subcategoryDatapointData = await selectDataPointsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(subcategoryDatapointData);

    console.log("Getting data point comments");
    let subcategoryDatapointComments = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
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