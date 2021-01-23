import { Connection, getConnection } from "typeorm";
import {
    IAuthorModel,
    IClientDatasetModel,
    IDataPointModel,
    IDatasetIDModel,
    IDatasetInfoModel,
    IMaterialModel,
    IPublicationModel
} from "./interfaces/DatasetModelInterface";
import { Publications, selectPublicationsQuery } from "./entities/Publications";
import { selectDatasetIdsQuery, selectDatasetsQuery } from "./entities/Dataset";

import { Accounts, selectAccountIdFromEmailQuery } from "./entities/Accounts";
import { Category } from "./entities/Category";
import { Composition } from "./entities/Composition";
import { Subcategory } from "./entities/Subcategory";
import { selectAuthorsQuery } from "./entities/Authors";
import { selectDataPointCommentsQuery } from "./entities/Datapointcomments";
import { selectDataPointsQuery } from "./entities/Datapoints";
import { selectMaterialQuery } from "./entities/Material";
import { IDatasetModel } from "./interfaces/DatasetResponseModelInterface";

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
        }

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
    async getUploadedDatasetIDOfUser(userEmail: string): Promise<any[]> {
        let userID = await this.fetchAccountIdFromEmail(userEmail)
        if (userID == false)
            return [false, "Invalid user email provided"]
        else {
            let idDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
                .innerJoin(Accounts, 'account', 'dataset.uploaderId = account.id')
                .where('account.id = :idRef', { idRef: userID })
                .getRawMany();
            return [true, idDatasetData];
        }
    }

    /**
     * This method will run a query find all the data set IDs favorited by a specific user
     * and return a raw data packet containing that information. 
     * 
     * @param id 
     * Account ID: number
     */
    async getSavedDatasetIDOfUser(userEmail: string): Promise<any[]> {
        let userID = await this.fetchAccountIdFromEmail(userEmail)
        if (userID == false)
            return [false, "Invalid user email provided"]
        else {
            let idDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
                .innerJoin('dataset.accounts', 'account')
                .where('account.id = :idRef', { idRef: userID })
                .getRawMany();
            return [true, idDatasetData];
        }
    }

    private async fetchAccountIdFromEmail(userEmail: string) {
        let userRawData = await selectAccountIdFromEmailQuery(this.connection, userEmail)
        if (userRawData == undefined)
            return false
        else
            return userRawData.id
    }

    /**
     * This method accepts a user's email and a data set ID, will get the user ID associated with
     * the email and, if the email was valid, will save the user ID and data set ID relation in the 
     * accounts_datasets_dataset table if the relation does not already exist. If the email address
     * was invalid, it will return a message reporting such. If the relation already exists, it
     * will return a message reporting such.
     * 
     * @param userEmail 
     * User's email: string
     * @param datasetId 
     * Data Set ID: number
     */
    async addSavedDatasetModel(userEmail: string, datasetId: number) {
        let userID = await this.fetchAccountIdFromEmail(userEmail)
        if (userID == false)
            return [false, "Invalid user email provided"]
        else {
            let duplicateCheck = await this.connection.query("SELECT * FROM accounts_datasets_dataset WHERE accountsId = ? AND datasetId = ?", [userID, datasetId]);
            if (duplicateCheck[0] == undefined) {
                await this.connection.query("INSERT INTO accounts_datasets_dataset (accountsId, datasetId) VALUES (?, ?)", [userID, datasetId]);
                return [true, "Favorite data set successfully saved"];
            }
            else {
                return [true, "Favorite data set is already saved"];
            }

        }
    }

    /**
     * This method accepts a user's email and a data set ID, will get the user ID associated with
     * the email and, if the email was valid, will delete the user ID and data set ID relation in  
     * the accounts_datasets_dataset table. 
     * 
     * @param userEmail 
     * User's email: string
     * @param datasetId 
     * Data Set ID: number
     */
    async removeSavedDatasetModel(userEmail: string, datasetId: number) {
        let userID = await this.fetchAccountIdFromEmail(userEmail)
        if (userID == false)
            return [false, "Invalid user email provided"]
        else {
            await this.connection.query("DELETE FROM accounts_datasets_dataset WHERE accountsId = ? AND datasetId = ?", [userID, datasetId]);
            return [true, "User favorite successfully removed"];
        }
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
        let publicationData: IPublicationModel = await selectPublicationsQuery(this.connection, id) || {}
        let authorData: IAuthorModel[] = await selectAuthorsQuery(this.connection, id)
        publicationData.authors = authorData
        let completeDatasetData = await selectDatasetsQuery(this.connection, id)
        let datasetInfo: IDatasetInfoModel = {
            name: completeDatasetData[0]?.name,
            comments: completeDatasetData[0]?.comments,
            datasetDataType: completeDatasetData[0]?.datasetdatatype,
            category: completeDatasetData[0]?.category,
            subcategory: completeDatasetData[0]?.subcategory
        }
        let datapointData: IDataPointModel[] = await selectDataPointsQuery(this.connection, id)
        this.valuesToArray(datapointData)
        let materialData: IMaterialModel[] = await selectMaterialQuery(this.connection, id)
        let datapointComments = await selectDataPointCommentsQuery(this.connection, id) || {}
        datapointComments.datapointcomments = typeof datapointComments.datapointcomments === 'string' ? JSON.parse(datapointComments.datapointcomments) : []
        let allData: IClientDatasetModel = {
            publication: publicationData,
            dataset_id: completeDatasetData[0]?.dataset_id,
            dataset_info: datasetInfo,
            materials: materialData,
            dataPoints: datapointData,
            dataPointComments: datapointComments?.datapointcomments
        }
        return allData;
    }

    /**
     * This method will run a query find all the data set IDs of all unapproved data sets and 
     * return a raw data packet containing that information. 
     */
    async getUnapprovedDatasetID(): Promise<IDatasetModel[]> {
        let unapprovedDatasetData: IDatasetModel[] = await selectDatasetIdsBasedOnApprovalStatusQuery(this.connection, 0)
        return unapprovedDatasetData;
    }
    private valuesToArray = (dataPoints: IDataPointModel[]): void => {
        dataPoints.forEach(dataPoint => {
            dataPoint.values = typeof dataPoint.values === 'string' ? JSON.parse(dataPoint.values) : []
        });
    }
}