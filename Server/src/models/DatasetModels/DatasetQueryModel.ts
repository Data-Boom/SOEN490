import { Connection, getConnection } from "typeorm";
import { Accounts, selectAccountIdFromEmailQuery } from "../entities/Accounts";
import { selectAllAuthorsQuery } from "../entities/Authors";
import { Category } from "../entities/Category";
import { Composition } from "../entities/Composition";
import { selectAllDataPointCommentsQuery } from "../entities/Datapointcomments";
import { selectDataPointsQuery } from "../entities/Datapoints";
import { selectDatasetIdsQuery, selectAllDatasetsQuery } from "../entities/Dataset";
import { selectAllMaterialQuery } from "../entities/Material";
import { Publications, selectAllPublicationsQuery } from "../entities/Publications";
import { Subcategory } from "../entities/Subcategory";
import { selectUnapprovedDatasetInfoQuery } from "../entities/Unapproveddatasets";
import { IDatasetIDModel, IDataPointModel } from "../interfaces/DatasetModelInterface";


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
        console.log('model params')
        console.log(firstName)
        console.log(lastName)
        let authorDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin(Publications, 'publication', 'dataset.publicationId = publication.id')
            .innerJoin('publication.authors', 'author')
            .where("(author.lastName = :firstNameRef OR author.lastName = :lastNameRef)")
            .andWhere("(author.firstName = :firstNameRef OR author.firstName = :lastNameRef)")
            .setParameters({ firstNameRef: firstName, lastNameRef: lastName })
            .getRawMany();
        console.log('model query')
        console.log(authorDatasetData)
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
    async getFavoriteDatasetIDOfUser(userID: number): Promise<any[]> {
        let idDatasetData: IDatasetIDModel[] = await selectDatasetIdsQuery(this.connection)
            .innerJoin('dataset.accounts', 'account')
            .where('account.id = :idRef', { idRef: userID })
            .getRawMany();
        return [true, idDatasetData];
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
    async addUserFavoriteDatasetModel(userEmail: string, datasetId: number) {
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
     * This method accepts a user's ID and a data set ID and will delete the user ID and data set ID relation in  
     * the accounts_datasets_dataset table. 
     * 
     * @param userEmail 
     * User's email: string
     * @param datasetId 
     * Data Set ID: number
     */
    async removeUserFavoriteDatasetModel(userId: number, datasetId: number) {
        await this.connection.query("DELETE FROM accounts_datasets_dataset WHERE accountsId = ? AND datasetId = ?", [userId, datasetId]);
        return "User favorite successfully removed";

    }

    /**
     * This method takes a data set ID, runs 6 queries to get the publication, author, data set, material,
     * data point, and data point comment information corresponding to this data set ID. The returns of these
     * 6 queries are then combined into a single IDatasetResponseModel object and subsiquently returned.
     * 
     * @param id 
     * A data set ID: number
     */
    async getAllData(id: number[]): Promise<any> {
        let publicationData = await selectAllPublicationsQuery(this.connection, id)
        let authorData = await selectAllAuthorsQuery(this.connection, id)
        let materialData = await selectAllMaterialQuery(this.connection, id)
        let datapointData: IDataPointModel[] = await selectDataPointsQuery(this.connection)
            .whereInIds(id)
            .getRawMany();
        this.parseDataPoints(datapointData)
        let datapointComments = await selectAllDataPointCommentsQuery(this.connection, id) || {}
        this.parseDataPointComments(datapointComments)
        let completeDatasetData = await selectAllDatasetsQuery(this.connection, id)
        let allData = [publicationData, authorData, completeDatasetData, materialData, datapointData, datapointComments]
        return allData;
    }

    private parseDataPoints = (dataPoints: IDataPointModel[]): void => {
        dataPoints.forEach(dataPoint => {
            dataPoint.values = typeof dataPoint.values === 'string' ? JSON.parse(dataPoint.values) : []
        });
    }
    private parseDataPointComments = (datapointComments: any): void => {
        datapointComments.forEach(datapointComment => {
            datapointComment.datapointcomments = typeof datapointComment.datapointcomments === 'string' ? JSON.parse(datapointComment.datapointcomments) : []
        });
    }
}