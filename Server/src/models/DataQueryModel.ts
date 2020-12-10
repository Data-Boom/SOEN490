import { Connection, getConnection } from "typeorm";
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
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    async getDatasetIDFromMaterial(material: string): Promise<IDatasetModel[]> {
        // Get composition ID if a compostion was entered instead of material details
        let compositionIdRaw = await this.connection.manager.find(Composition, { composition: material });
        let compositionId = -1; // fallback value if material details were entered
        if (compositionIdRaw[0] != null) {
            compositionId = compositionIdRaw[0].id;
        };

        let materialDatasetData: IDatasetModel[] = await selectDatasetIdsQuery(this.connection.manager)
            .innerJoin('dataset.materials', 'material')
            .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
            .setParameters({ compositionRef: compositionId, materialDetails: material })
            .getRawMany();
        return materialDatasetData;
    }

    async getDatasetIDFromYear(year: number): Promise<IDatasetModel[]> {
        let yearDatasetData: IDatasetModel[] = await selectDatasetIdsQuery(this.connection.manager)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .where('publication.year = :yearRef', { yearRef: year })
            .getRawMany();
        return yearDatasetData;
    }

    async getDatasetIDFromAuthor(firstName: string, lastName: string): Promise<IDatasetModel[]> {
        let authorDatasetData: IDatasetModel[] = await selectDatasetIdsQuery(this.connection.manager)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .innerJoin('publication.authors', 'author')
            .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
            .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
            .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
            .getRawMany();
        return authorDatasetData;
    }

    async getDatasetIDFromCategory(category: number): Promise<IDatasetModel[]> {
        let categoryDatasetData: IDatasetModel[] = await selectDatasetIdsQuery(this.connection.manager)
            .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
            .where('category.id = :categoryId', { categoryId: category })
            .getRawMany();
        return categoryDatasetData;
    }

    async getDatasetIDFromSubcategory(category: number, subcategory: number): Promise<IDatasetModel[]> {
        let subcategoryDatasetData: IDatasetModel[] = await selectDatasetIdsQuery(this.connection.manager)
            .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
            .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
            .where('category.id = :categoryId', { categoryId: category })
            .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
            .getRawMany();
        return subcategoryDatasetData;
    }
    async getAllData(id: number): Promise<IDatasetResponseModel> {
        let publicationData: IPublicationModel[] = await selectPublicationsQuery(this.connection.manager, id)
        let authorData: IAuthorModel[] = await selectAuthorsQuery(this.connection.manager, id)
        let datasetData: IDatasetModel[] = await selectDatasetsQuery(this.connection.manager, id)
        let datapointData: IDataPointModel[] = await selectDataPointsQuery(this.connection.manager, id)
        let materialData: IMaterialModel[] = await selectMaterialQuery(this.connection.manager, id)
        let datapointComments: IDataPointCommentModel[] = await selectDataPointCommentsQuery(this.connection.manager, id)
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