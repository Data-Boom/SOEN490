import { getConnection } from "typeorm";
import { Publications, selectPublicationsQuery } from './entities/Publications';
import { Composition } from './entities/Composition';
import { selectDatasetsQuery } from './entities/Dataset';
import { Category } from './entities/Category';
import { Subcategory } from './entities/Subcategory';
import { selectDataPointsQuery } from './entities/Datapoints';
import { selectMaterialQuery, selectMaterialBasedOnSingleMateriarlQuery } from './entities/Material';
import { selectDataPointCommentsQuery } from './entities/Datapointcomments';
import { selectAuthorsQuery, selectAuthorBasedOnSingleAuthorQuery } from "./entities/Authors";
import {
    IAuthorModel, IDataPointCommentModel, IDataPointModel, IDatasetModel,
    IDatasetResponseModel, IMaterialModel, IPublicationModel
} from "./interfaces/DatasetResponseModelInterface";

// TO-DO Dmitry was mentioning how more of the query building could be 
// factored out into something more generic via chain of responsibility
// to be investigated later
// export class DatasetQueryBuilder<Entity> extends SelectQueryBuilder<Entity>{
//     whereDatasetId2(id:number){
//         return this.andWhere('dataset.id = :datasetId', { datasetId: id })
//     }
// }

export const getDataFromMaterialYearAuthorSubcategory = async (material: string, year: number, firstName: string, lastName: string, category: number, subcategory: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/year/author/subcategory");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .whereInIds(authorIds)
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .whereInIds(materialIds)
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromMaterialYearAuthorCategory = async (material: string, year: number, firstName: string, lastName: string, category: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/year/author/category");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .whereInIds(authorIds)
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .whereInIds(materialIds)
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromMaterialYearAuthor = async (material: string, year: number, firstName: string, lastName: string): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/year/author");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .whereInIds(authorIds)
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .whereInIds(materialIds)
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromMaterialYearSubcategory = async (material: string, year: number, category: number, subcategory: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/year/subcategory");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, })
        .getRawMany();
    console.log(publicationData);

    console.log("Getting authors");

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .whereInIds(materialIds)
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromMaterialYearCategory = async (material: string, year: number, category: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/year/category");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ compositionRef: compositionId, materialDetails: material, })
        .getRawMany();
    console.log(publicationData);

    console.log("Getting authors");

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .whereInIds(materialIds)
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromMaterialAuthorCategory = async (material: string, firstName: string, lastName: string, category: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/author/category");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .whereInIds(authorIds)
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .whereInIds(materialIds)
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromMaterialAuthorSubcategory = async (material: string, firstName: string, lastName: string, category: number, subcategory: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on material/author/subcategory");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .whereInIds(authorIds)
        .andWhere("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
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

    console.log("Got data set IDs for material");
    //Use data set IDs to get all materials of those data sets
    let materialData: IMaterialModel[] = await selectMaterialBasedOnSingleMateriarlQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .whereInIds(materialIds)
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('dataset.materials', 'material')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ compositionRef: compositionId, materialDetails: material, firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromYearAuthorSubcategory = async (year: number, firstName: string, lastName: string, category: number, subcategory: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on year/author/subcategory");

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .whereInIds(authorIds)
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
    let materialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .innerJoin('publication.authors', 'author')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}

export const getDataFromYearAuthorCategory = async (year: number, firstName: string, lastName: string, category: number): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting data set info based on year/author/category");

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager)
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('category.id = :categoryId', { categoryId: category })
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(publicationData);

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

    console.log("Got data set IDs for author");
    //Use data set IDs to get all authors of those data sets
    let authorData: IAuthorModel[] = await selectAuthorBasedOnSingleAuthorQuery(connection.manager)
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .whereInIds(authorIds)
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(authorData);

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datasetData);

    console.log("Getting materials");
    let materialData = await selectMaterialQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .innerJoin('publication.authors', 'author')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(materialData);

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointData);

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'publication.id = dataset.publicationId')
        .innerJoin('publication.authors', 'author')
        .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
        .andWhere("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .andWhere('publication.year = :yearRef', { yearRef: year })
        .andWhere('category.id = :categoryId', { categoryId: category })
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(datapointComments);

    const allData: IDatasetResponseModel = {
        authors: authorData,
        publications: publicationData,
        dataPoints: datapointData,
        dataset: datasetData,
        materials: materialData,
        dataPointComments: datapointComments
    }

    return allData;
}
