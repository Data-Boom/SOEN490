import { Connection, getConnection } from "typeorm";
import { Accounts } from "./entities/Accounts";
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
    IAuthorModel, IPublicationModel, IDatasetIDModel,
    IMaterialModel, IDataPointModel, IClientDatasetModel, IDatasetInfoModel
} from "./interfaces/DatasetModelInterface";


export class DataQueryModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    /**
     * This method will run a query find all the data set IDs based on an entered material
     * and return a raw data packet containing that information. 
     * Before running this query, there will be a check done to see if a composition was entered
     * and will grab the composition foreign key ID, to use both this ID and the original string  
     * as search terms in the query.
     * 
     * @param material 
     * A string containing either a material's composition or details: string
     */
    async getDatasetIDFromMaterial(material: string): Promise<IDatasetIDModel[]> {
        let compositionIdRaw = await this.connection.manager.find(Composition, { composition: material });
        let compositionId = -1; // fallback value if material details were entered
        if (compositionIdRaw[0] != null) {
            compositionId = compositionIdRaw[0].id;
        };

        let materialDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin('dataset.materials', 'material')
            .where("(material.compositionId = :compositionRef OR material.details = :materialDetails)")
            .setParameters({ compositionRef: compositionId, materialDetails: material })
            .getRawMany();
        return materialDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs based on an entered year
     * and return a raw data packet containing that information. 
     * 
     * @param year 
     * Publication year: number
     */
    async getDatasetIDFromYear(year: number): Promise<IDatasetIDModel[]> {
        let yearDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .where('publication.year = :yearRef', { yearRef: year })
            .getRawMany();
        return yearDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs based on an entered author's name
     * and return a raw data packet containing that information. 
     * This specific query will work if even if an author's name is entered in reverse, 
     * i.e. if a first name was entered as a last name and the last name was entered as a first name.
     * 
     * @param firstName 
     * The first name of an author: string
     * @param lastName 
     * The last name of an author: string
     */
    async getDatasetIDFromAuthor(firstName: string, lastName: string): Promise<IDatasetIDModel[]> {
        let authorDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .innerJoin('publication.authors', 'author')
            .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
            .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
            .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
            .getRawMany();
        return authorDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs based on an entered author's 
     * last name and return a raw data packet containing that information. 
     * 
     * @param lastName 
     * The last name of an author: string
     */
    async getDatasetIDFromAuthorLastName(lastName: string): Promise<IDatasetIDModel[]> {
        let authorDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .innerJoin('publication.authors', 'author')
            .where('author.lastName = :lastNameRef', { lastNameRef: lastName })
            .getRawMany();
        return authorDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs based on an entered category ID
     * and return a raw data packet containing that information. 
     * 
     * @param category
     * A category ID: number
     */
    async getDatasetIDFromCategory(category: number): Promise<IDatasetIDModel[]> {
        let categoryDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
            .where('category.id = :categoryId', { categoryId: category })
            .getRawMany();
        return categoryDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs based on an entered category ID plus
     * a suncategory ID and return a raw data packet containing that information. 
     * 
     * @param category 
     * A category ID: number
     * @param subcategory 
     * A subcategory ID: number
     */
    async getDatasetIDFromSubcategory(category: number, subcategory: number): Promise<IDatasetIDModel[]> {
        let subcategoryDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
            .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
            .where('category.id = :categoryId', { categoryId: category })
            .andWhere('subcategory.id = :subcategoryId', { subcategoryId: subcategory })
            .getRawMany();
        return subcategoryDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs by a specific user ID
     * and return a raw data packet containing that information. 
     * 
     * @param id 
     * Account ID: number
     */
    async getUploadedDatasetIDOfUser(id: number): Promise<IDatasetIDModel[]> {
        let idDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Accounts, 'account', 'dataset.uploaderId = account.id')
            .where('account.id = :idRef', { idRef: id })
            .getRawMany();
        return idDatasetData;
    }

    /**
     * This method will run a query find all the data set IDs favorited by specific user ID
     * and return a raw data packet containing that information. 
     * 
     * @param id 
     * Account ID: number
     */
    async getSavedDatasetIDOfUser(id: number): Promise<IDatasetIDModel[]> {

        let idDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin('dataset.accounts', 'account')
            .where('account.id = :idRef', { idRef: id })
            .getRawMany();
        return idDatasetData;
    }

    /**
     * This method takes a data set ID, runs 6 queries to get the publication, author, data set, material,
     * data point, and data point comment information corresponding to this data set ID. The returns of these
     * 6 queries are then combined into a single IDatasetResponseModel object and subsiquently returned.
     * 
     * @param id 
     * A data set ID: number
     */
    async getAllData(id: number): Promise<IClientDatasetModel> {
        let publicationData: IPublicationModel = await selectPublicationsQuery(this.connection, id)
        let authorData: IAuthorModel[] = await selectAuthorsQuery(this.connection, id)
        publicationData.authors = authorData
        let completeDatasetData = await selectDatasetsQuery(this.connection, id)
        let datasetInfo: IDatasetInfoModel = {
            name: completeDatasetData[0].name,
            comments: completeDatasetData[0].comments,
            datasetDataType: completeDatasetData[0].datasetdatatype,
            category: completeDatasetData[0].category,
            subcategory: completeDatasetData[0].subcategory
        }
        let datapointData: IDataPointModel[] = await selectDataPointsQuery(this.connection, id)
        let materialData: IMaterialModel[] = await selectMaterialQuery(this.connection, id)
        let datapointComments = await selectDataPointCommentsQuery(this.connection, id)
        if (datapointComments == undefined)
            datapointComments = []
        let allData: IClientDatasetModel = {
            publication: publicationData,
            dataset_id: completeDatasetData[0].dataset_id,
            dataset_info: datasetInfo,
            materials: materialData,
            dataPoints: datapointData,
            dataPointComments: datapointComments.datapointcomments
        }
        return allData;
    }
}