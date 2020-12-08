import { getConnection } from "typeorm";
import { selectAuthorsQuery } from "./entities/Authors";
import { Composition } from "./entities/Composition";
import { selectDataPointCommentsQuery } from "./entities/Datapointcomments";
import { selectDataPointsQuery } from "./entities/Datapoints";
import { selectDatasetsQuery, selectDatasetIdsQuery } from "./entities/Dataset";
import { selectMaterialQuery } from "./entities/Material";
import { selectPublicationsQuery, Publications } from "./entities/Publications";
import {
    IDatasetResponseModel, IAuthorModel, IPublicationModel, IDatasetModel,
    IMaterialModel, IDataPointModel, IDataPointCommentModel
} from "./interfaces/DatasetResponseModelInterface";

// TO-DO Dmitry was mentioning how more of the query building could be 
// factored out into something more generic via chain of responsibility
// to be investigated later
// export class DatasetQueryBuilder<Entity> extends SelectQueryBuilder<Entity>{
//     whereDatasetId2(id:number){
//         return this.andWhere('dataset.id = :datasetId', { datasetId: id })
//     }
// }

export const getDatasetIDFromMaterial = async (material: string) => {

    const connection = getConnection();
    console.log("Getting data set info based on material");

    // Get composition ID if a compostion was entered instead of material details
    let compositionIdRaw = await connection.manager.find(Composition, { composition: material });
    let compositionId = -1; // fallback value if material details were entered
    if (compositionIdRaw[0] != null) {
        compositionId = compositionIdRaw[0].id;
    };

    let materialDatasetData: IDatasetModel[] = await selectDatasetIdsQuery(connection.manager)
        .innerJoin('dataset.materials', 'material')
        .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
        .setParameters({ compositionRef: compositionId, materialDetails: material })
        .getRawMany();
    console.log(materialDatasetData);

    return materialDatasetData;
}

export const getDatasetIDFromYear = async (year: number) => {

    const connection = getConnection();
    console.log("Getting data set info based year");
    let yearDatasetData = await selectDatasetIdsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .where('publication.year = :yearRef', { yearRef: year })
        .getRawMany();
    console.log(yearDatasetData);

    return yearDatasetData;
}

export const getDatasetIDFromAuthor = async (firstName: string, lastName: string) => {

    const connection = getConnection();
    console.log("Getting data set info based on author");
    let authorDatasetData = await selectDatasetIdsQuery(connection.manager)
        .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
        .innerJoin('publication.authors', 'author')
        .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
        .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
        .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
        .getRawMany();
    console.log(authorDatasetData);
    return authorDatasetData;
}

export const getDatasetIDFromCategory = async (category: number) => {

    const connection = getConnection();
    console.log("Getting data set info based on category");
    let categoryDatasetData = await selectDatasetIdsQuery(connection.manager)
        .where('category.id = :categoryId', { categoryId: category })
        .getRawMany();
    console.log(categoryDatasetData);
    return categoryDatasetData;
}

export const getDatasetIDFromSubcategory = async (category: number, subcategory: number) => {

    const connection = getConnection();
    console.log("Getting data set info based on subcategory");
    let subcategoryDatasetData = await selectDatasetIdsQuery(connection.manager)
        .where('category.id = :categoryId', { categoryId: category })
        .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
        .getRawMany();
    console.log(subcategoryDatasetData);
    return subcategoryDatasetData;
}

export const getAllData = async (idArray: any[]): Promise<IDatasetResponseModel> => {

    const connection = getConnection();
    console.log("Getting all data sets' raw data");

    console.log("Getting publications");
    let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager, idArray)

    console.log("Getting authors");
    let authorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager, idArray)

    console.log("Getting data sets");
    let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager, idArray)

    console.log("Getting data point data");
    let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager, idArray)

    console.log("Getting data set materials");
    let materialData: IMaterialModel[] = await selectMaterialQuery(connection.manager, idArray)

    console.log("Getting data point comments");
    let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager, idArray)

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