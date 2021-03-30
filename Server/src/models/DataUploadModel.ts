import { Connection, getConnection } from "typeorm";
import { Authors } from './entities/Authors';
import { Publications } from './entities/Publications';
import { Publisher } from './entities/Publisher';
import { Publicationtype } from './entities/Publicationtype';
import { Composition } from './entities/Composition';
import { Datasetdatatype } from './entities/Datasetdatatype';
import { Dataset } from './entities/Dataset';
import { Datapoints } from './entities/Datapoints';
import { Material } from './entities/Material';
import { Datapointcomments } from './entities/Datapointcomments';
import { IMaterials } from './interfaces/MaterialsInterface';
import { IAuthors } from './interfaces/AuthorsInterface';
import { Unapproveddatasets } from "./entities/Unapproveddatasets";

/**
 * This model class is responsible for updating the database with the extracted from the fileUpload. 
 */
export class DataUploadModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    private selectReferenceTypeIdQuery = (publicationTypeReceived: string) =>
        this.connection.createQueryBuilder(Publicationtype, 'publicationType')
            .select('publicationType.id', 'id')
            .where('LOWER(publicationType.name) = LOWER(:publicationTypeRef)', { publicationTypeRef: publicationTypeReceived })
            .getRawOne();

    /**
     * This method will create a Publicationtype object and return it's ID. It will check if 
     * a duplicate Publicationtype exists via a query and if it exists will set 
     * the Publicationtype object to have the same ID as the existing entry. If there is no
     * existing entry, than the method will add a new entry to the Publicationtype table.
     *
     * @param publicationTypeReceived 
     * Publication type: string
     */
    async insertPublicationType(publicationTypeReceived: string): Promise<number> {
        let publicationType = new Publicationtype();
        publicationType.id;
        publicationType.name = publicationTypeReceived;
        let publicationTypeExists: any;
        publicationTypeExists = await this.selectReferenceTypeIdQuery(publicationTypeReceived);
        if (publicationTypeExists != undefined) {
            publicationType.id = publicationTypeExists.id;
        }
        else {
            await Publicationtype.save(publicationType);
        }
        return publicationType.id;
    }

    async updateDataset(arrayOfDatasetInfo: any[]) {
        await this.connection
            .createQueryBuilder()
            .update(Dataset)
            .set({
                name: arrayOfDatasetInfo[1],
                datatypeId: arrayOfDatasetInfo[2],
                publicationId: arrayOfDatasetInfo[3],
                subcategoryId: arrayOfDatasetInfo[4],
                comments: arrayOfDatasetInfo[5]
            })
            .where("id = :id", { id: arrayOfDatasetInfo[0] })
            .execute();
    }

    private selectPublisherIdQuery = (publisherReceived: string) =>
        this.connection.createQueryBuilder(Publisher, 'publisher')
            .select('publisher.id', 'id')
            .where('LOWER(publisher.name) = LOWER(:publisherRef)', { publisherRef: publisherReceived })
            .getRawOne();

    /**
     * This method will create a Publisher object and return it's ID. It will check if a  
     * duplicate Publisher exists via a query and if it exists will set the
     * Publisher object to have the same ID as the existing entry. If there is no
     * existing entry, than the method will add a new entry to the Publisher table.
     *
     * @param publisherReceived
     * Publisher name: string 
     */
    async insertPublisher(publisherReceived: string): Promise<number> {
        let publisher = new Publisher();
        publisher.id;
        publisher.name = publisherReceived;
        let publisherExists: any;
        publisherExists = await this.selectPublisherIdQuery(publisherReceived);
        if (publisherExists != undefined) {
            publisher.id = publisherExists.id;
        }
        else {
            await Publisher.save(publisher);
        }
        return publisher.id;
    }

    private selectAuthorIdQuery = (firstname: string, lastname: string) =>
        this.connection.createQueryBuilder(Authors, 'author')
            .select('author.id', 'id')
            .where('LOWER(author.firstName) = LOWER(:firstName)', { firstName: firstname })
            .andWhere('LOWER(author.lastName) = LOWER(:lastName)', { lastName: lastname })

    /**
     * This method will query the DB to see if there is an existing entry, and if so return this
     * entry. If an entry does not exist, it will return false. 
     * This method is specifically for authors which have a middle name.
     * 
     * @param author 
     * An author's full name: IAuthors
     */
    private async fetchAuthorIdHasMiddleName(author: IAuthors): Promise<any> {
        let authorExists =
            await this.selectAuthorIdQuery(author.firstName, author.lastName)
                .andWhere('LOWER(author.middleName) = LOWER(:middleName)', { middleName: author.middleName })
                .getRawOne();
        return authorExists;
    }

    /**
     * This method will query the DB to see if there is an existing entry, and if so return this
     * entry. If an entry does not exist, it will return false. 
     * This method is specifically for authors which do not have a middle name.
     * 
     * @param author 
     * An author's full name: IAuthors
     */
    private async fetchAuthorIdNoMiddleName(author: IAuthors): Promise<any> {
        let authorExists =
            await this.selectAuthorIdQuery(author.firstName, author.lastName)
                .getRawOne();
        return authorExists;
    }

    /**
     * This method will create and return an Authors object. It will check if a duplicate 
     * author exists via @fetchAuthorIdHasMiddleName or @fetchAuthorIdNoMiddleName and if it  
     * exists will set the Authors object to have the same ID as the existing entry. If there 
     * is no existing entry, than the method will add a new entry to the Authors table.
     * 
     * @param authorReceived 
     * An author's full name: IAuthors
     */
    private async insertIndividualAuthor(authorReceived: IAuthors): Promise<any> {
        let author = new Authors();
        author.id;
        author.firstName = authorReceived.firstName;
        author.lastName = authorReceived.lastName;
        author.middleName = authorReceived.middleName;
        let authorExists: any;
        if (authorReceived.middleName != null) {
            authorExists = await this.fetchAuthorIdHasMiddleName(authorReceived);
        }
        else {
            authorExists = await this.fetchAuthorIdNoMiddleName(authorReceived);
        }
        if (authorExists != undefined) {
            author.id = authorExists.id;
        }
        else {
            await Authors.save(author);
        }
        return author;
    }

    /**
     * This method will loop through an array of IAuthors objects and call on 
     * @insertIndividualAuthor to create each individual Author entry. After each entry
     * is created, this Author is pushed to an array called allAuthors which is then
     * returned once all the Authors have been stored.
     * 
     * @param storeAuthors 
     * An array of full author names: IAuthors[]
     */
    async insertAuthors(storeAuthors: IAuthors[]): Promise<any[]> {
        let allAuthors: any[] = [];
        for (let i = 0; i < storeAuthors.length; i++) {
            let author = await this.insertIndividualAuthor(storeAuthors[i]);
            allAuthors.push(author);
        }
        return allAuthors;
    }

    /**
     * This method will create a Publications object and return it's ID. 
     *
     * @param referenceTitle 
     * Publication title: string
     * @param referenceDOI 
     * DOI: string
     * @param referencePages 
     * Pages of the reference: string
     * @param referenceTypeId 
     * ID of Publication type: Number
     * @param publisherNameId 
     * ID of Publisher name: number
     * @param referenceYear 
     * Publication year: number
     * @param referenceVolume 
     * Publication volume: number
     * @param referenceIssue
     * Publication issue: number
     * @param referenceAuthors 
     * Array of all Authors table entries to be linked to this publication: any[]
     */
    async insertPublication(referenceTitle: string, referenceDOI: string, referencePages: string, referenceTypeId: number, publisherNameId: number, referenceYear: number, referenceVolume: number, referenceIssue: number, referenceAuthors: Authors[]): Promise<number> {
        //Need to check for "" being sent instead of null
        if (referencePages == "")
            referencePages = null
        if (!referenceVolume)
            referenceVolume = null
        if (!referenceIssue)
            referenceIssue = null
        let publication = new Publications();
        publication.id;
        publication.name = referenceTitle;
        publication.doi = referenceDOI;
        publication.pages = referencePages;
        publication.publicationtypeId = referenceTypeId;
        publication.publisherId = publisherNameId;
        publication.year = referenceYear;
        publication.volume = referenceVolume;
        publication.issue = referenceIssue;
        publication.authors = referenceAuthors;
        await Publications.save(publication);
        return publication.id;
    }

    private selectCompositionIdQuery = (compositionReceived: string) =>
        this.connection.createQueryBuilder(Composition, 'composition')
            .select('composition.id', 'id')
            .where('LOWER(composition.composition) = LOWER(:compositionRef)', { compositionRef: compositionReceived })
            .getRawOne();

    /**
     * This method will create and return a Composition object and return it's ID. It will  
     * check if a duplicate Composition exists via a query and if it exists will set 
     * the Composition object to have the same ID as the existing entry. If there is no
     * existing entry, than the method will add a new entry to the Composition table.
     *
     * @param compositionReceived 
     * Composition: string
     */
    private async insertIndividualComposition(compositionReceived: string): Promise<number> {
        let composition = new Composition();
        composition.id;
        composition.composition = compositionReceived;
        let compositionExists: any;
        compositionExists = await this.selectCompositionIdQuery(compositionReceived);
        if (compositionExists != undefined) {
            composition.id = compositionExists.id;
        }
        else {
            await Composition.save(composition);
        }
        return composition.id;
    }

    private selectMaterialIdQuery = (materialReceived: string, compositionId: number) =>
        this.connection.createQueryBuilder(Material, 'material')
            .select('material.id', 'id')
            .where('LOWER(material.details) = LOWER(:materialRef)', { materialRef: materialReceived })
            .andWhere('material.composition = :compositionIdRef', { compositionIdRef: compositionId })
            .getRawOne();

    /**
     * This method will create and return a Material object and return it's ID. It will  
     * check if a duplicate Material exists via a query and if it exists will set 
     * the Material object to have the same ID as the existing entry. If there is no
     * existing entry, than the method will add a new entry to the Material table.
     *
     * @param materialReceived 
     * Material details: string
     * @param compositionId 
     * ID of a Composition entry: number
     */
    private async insertIndividualMaterial(materialReceived: string, compositionId: number): Promise<Material> {
        let material = new Material();
        material.id;
        material.compositionId = compositionId;
        material.details = materialReceived;
        let materialExists: any;
        materialExists = await this.selectMaterialIdQuery(materialReceived, compositionId);
        if (materialExists != undefined) {
            material.id = materialExists.id;
        }
        else {
            await Material.save(material);
        }
        return material;
    }

    /**
     * This method will loop through an array of IMaterials objects to create Material entries.
     * It will first call on @insertIndividualComposition to create an individual Composition 
     * entry. After it will call on @insertIndividualMaterial to create the Material entry proper
     * through providing it with the Composition's ID and the material details. 
     * After the individual Material entry is created, this Material is pushed to an array called
     * allMaterials which is then returned once all the Materials have been stored.
     * 
     * @param material
     * Array of containing composition/material details pairs: IMaterials[] 
     */
    async insertMaterial(material: IMaterials[]): Promise<any[]> {
        let allMaterials: any[] = [];
        for (var i = 0; i < material.length; i++) {
            let compositionId = await this.insertIndividualComposition(material[i].composition);
            let someMaterial = await this.insertIndividualMaterial(material[i].details, compositionId);
            allMaterials.push(someMaterial);
        }
        return allMaterials;
    }

    private selectDataSetDataTypeIdQuery = (datasetdatatypeReceived: string) =>
        this.connection.createQueryBuilder(Datasetdatatype, 'datasetdatatype')
            .select('datasetdatatype.id', 'id')
            .where('LOWER(datasetdatatype.name) = LOWER(:datasetdatatypeRef)', { datasetdatatypeRef: datasetdatatypeReceived })
            .getRawOne();

    /**
     * This method will create a Datasetdatatype object and return it's ID. It will check if  
     * a duplicate Datasetdatatype exists via a query and if it exists will set 
     * the Datasetdatatype object to have the same ID as the existing entry. If there is no
     * existing entry, than the method will add a new entry to the Datasetdatatype table.
     *
     * @param datasetdatatypeReceived 
     * Data set data type: string
     */
    async insertDataSetDataType(datasetdatatypeReceived: string): Promise<number> {
        let datasetdatatype = new Datasetdatatype();
        datasetdatatype.id;
        datasetdatatype.name = datasetdatatypeReceived;
        let datasetdatatypeExists: any;
        datasetdatatypeExists = await this.selectDataSetDataTypeIdQuery(datasetdatatypeReceived);
        if (datasetdatatypeExists != undefined) {
            datasetdatatype.id = datasetdatatypeExists.id;
        }
        else {
            await Datasetdatatype.save(datasetdatatype);
        }
        return datasetdatatype.id;
    }

    async insertFullDataSet(arrayOfDatasetInfo: any[]): Promise<number> {
        let dataset = new Dataset();
        dataset.id;
        dataset.name = arrayOfDatasetInfo[0];
        dataset.datatypeId = arrayOfDatasetInfo[1];
        dataset.publicationId = arrayOfDatasetInfo[2];
        dataset.subcategoryId = arrayOfDatasetInfo[3];
        dataset.materials = arrayOfDatasetInfo[4];
        dataset.comments = arrayOfDatasetInfo[5];
        dataset.uploaderId = arrayOfDatasetInfo[6];
        await Dataset.save(dataset);
        return dataset.id;
    }

    /**
     * Inserts a information for a single variable of a data point along with ties to its respective
     * units, and data set.
     * 
     * @param dataSetID 
     * ID of data set: number
     * @param dataVariableName 
     * Name of variable: string
     * @param dataPointValues 
     * Array of values: number[]
     * @param unitsID 
     * ID of units: number
     */
    async insertDataPointsOfSet(dataSetID: number, dataVariableName: string, dataPointValues: number[], unitsID: number) {
        let datapoint = new Datapoints();
        datapoint.id;
        datapoint.datasetId = dataSetID;
        datapoint.name = dataVariableName;
        datapoint.values = dataPointValues;
        datapoint.unitsId = unitsID;
        await Datapoints.save(datapoint);
    }

    /**
     * Inserts an array of strings where each entry is the comment for a matching data point.
     * i.e. Array entry 0 is the comment for the first data point and so on.
     * 
     * @param dataSetID 
     * ID of data set: number
     * @param comments 
     * Array of comments: string[]
     */
    async insertCommentsForDataSet(dataSetID: number, comments: string[]) {
        let datapointcomments = new Datapointcomments();
        datapointcomments.id;
        datapointcomments.datasetId = dataSetID;
        datapointcomments.comments = comments;
        await Datapointcomments.save(datapointcomments);
    }

    async createEntryInUnapprovedDataSets(datasetId: number) {
        let unapprovedDataset = new Unapproveddatasets()
        unapprovedDataset.datasetId = datasetId
        unapprovedDataset.flaggedComment
        unapprovedDataset.isFlagged = 0
        await Unapproveddatasets.save(unapprovedDataset)
    }
}
