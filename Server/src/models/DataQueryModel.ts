import { getConnection } from "typeorm";
import { selectAuthorsQuery } from "./entities/Authors";
import { Category } from "./entities/Category";
import { Composition } from "./entities/Composition";
import { selectDataPointCommentsQuery } from "./entities/Datapointcomments";
import { selectDataPointsQuery } from "./entities/Datapoints";
import { selectDatasetsQuery, selectDatasetIdsQuery } from "./entities/Dataset";
import { selectMaterialQuery } from "./entities/Material";
import { selectPublicationsQuery, Publications } from "./entities/Publications";
import { Subcategory } from "./entities/Subcategory";
import {
    IDatasetResponseModel, IAuthorModel, IPublicationModel, IDatasetModel,
    IMaterialModel, IDataPointModel, IDataPointCommentModel
} from "./interfaces/DatasetResponseModelInterface";


export class DataQueryModel {
    constructor() {
    }

    async getDatasetIDFromMaterial(material: string) {

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

        return materialDatasetData;
    }

    async getDatasetIDFromYear(year: number) {

        const connection = getConnection();
        console.log("Getting data set info based year");
        let yearDatasetData = await selectDatasetIdsQuery(connection.manager)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .where('publication.year = :yearRef', { yearRef: year })
            .getRawMany();

        return yearDatasetData;
    }

    async getDatasetIDFromAuthor(firstName: string, lastName: string) {

        const connection = getConnection();
        console.log("Getting data set info based on author");
        let authorDatasetData = await selectDatasetIdsQuery(connection.manager)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .innerJoin('publication.authors', 'author')
            .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
            .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
            .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
            .getRawMany();
        return authorDatasetData;
    }

    async getDatasetIDFromCategory(category: number) {

        const connection = getConnection();
        console.log("Getting data set info based on category");
        let categoryDatasetData = await selectDatasetIdsQuery(connection.manager)
            .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
            .where('category.id = :categoryId', { categoryId: category })
            .getRawMany();
        return categoryDatasetData;
    }

    async getDatasetIDFromSubcategory(category: number, subcategory: number) {

        const connection = getConnection();
        console.log("Getting data set info based on subcategory");
        let subcategoryDatasetData = await selectDatasetIdsQuery(connection.manager)
            .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
            .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
            .where('category.id = :categoryId', { categoryId: category })
            .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
            .getRawMany();
        return subcategoryDatasetData;
    }
    async getAllData(id: number): Promise<IDatasetResponseModel> {

        const connection = getConnection();
        console.log("Getting all data sets' raw data");

        console.log("Getting publications");
        let publicationData: IPublicationModel[] = await selectPublicationsQuery(connection.manager, id)

        console.log("Getting authors");
        let authorData: IAuthorModel[] = await selectAuthorsQuery(connection.manager, id)

        console.log("Getting data sets");
        let datasetData: IDatasetModel[] = await selectDatasetsQuery(connection.manager, id)

        console.log("Getting data point data");
        let datapointData: IDataPointModel[] = await selectDataPointsQuery(connection.manager, id)

        console.log("Getting data set materials");
        let materialData: IMaterialModel[] = await selectMaterialQuery(connection.manager, id)

        console.log("Getting data point comments");
        let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(connection.manager, id)

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
}