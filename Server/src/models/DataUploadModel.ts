import { Connection, getConnection } from "typeorm";

import { Authors } from './entities/Authors';
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

import { IMaterials } from './interfaces/MaterialsInterface';
import { IAuthors } from './interfaces/AuthorsInterface';

// Left logs in the class for debugging after DB migration.

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

    private async fetchReferenceTypeId(publicationTypeReceived: string): Promise<any> {
        let publicationTypeExists = await this.selectReferenceTypeIdQuery(publicationTypeReceived)
        if (publicationTypeExists == undefined) {
            publicationTypeExists = false;
        }
        return publicationTypeExists;
    }

    async insertReferenceType(publicationTypeReceived: string): Promise<number> {
        let publicationType = new Publicationtype();
        publicationType.id;
        publicationType.name = publicationTypeReceived;
        let publicationTypeExists: any;
        publicationTypeExists = await this.fetchReferenceTypeId(publicationTypeReceived);
        if (publicationTypeExists != false) {
            publicationType.id = publicationTypeExists.id;
        }
        else {
            await this.connection.manager.save(publicationType);
        }
        return publicationType.id;
    }

    private selectPublisherIdQuery = (publisherReceived: string) =>
        this.connection.createQueryBuilder(Publisher, 'publisher')
            .select('publisher.id', 'id')
            .where('LOWER(publisher.name) = LOWER(:publisherRef)', { publisherRef: publisherReceived })
            .getRawOne();

    private async fetchPublisherId(publisherReceived: string): Promise<any> {
        let publisherExists = await this.selectPublisherIdQuery(publisherReceived)
        if (publisherExists == undefined) {
            publisherExists = false;
        }
        return publisherExists;
    }

    async insertPublisher(publisherReceived: string): Promise<number> {
        let publisher = new Publisher();
        publisher.id;
        publisher.name = publisherReceived;
        let publisherExists: any;
        publisherExists = await this.fetchPublisherId(publisherReceived);
        if (publisherExists != false) {
            publisher.id = publisherExists.id;
        }
        else {
            await this.connection.manager.save(publisher);
        }
        return publisher.id;
    }

    private selectAuthorIdQuery = (firstname: string, lastname: string) =>
        this.connection.createQueryBuilder(Authors, 'author')
            .select('author.id', 'id')
            .where('LOWER(author.firstName) = LOWER(:firstName)', { firstName: firstname })
            .andWhere('LOWER(author.lastName) = LOWER(:lastName)', { lastName: lastname })

    private async getAuthorIdHasMiddleName(author: IAuthors): Promise<any> {
        let authorExists =
            await this.selectAuthorIdQuery(author.firstname, author.lastname)
                .andWhere('LOWER(author.middleName) = LOWER(:middleName)', { middleName: author.middlename })
                .getRawOne();
        if (authorExists == undefined) {
            authorExists = false;
        }
        return authorExists;
    }

    private async getAuthorIdNoMiddleName(author: IAuthors): Promise<any> {
        let authorExists =
            await this.selectAuthorIdQuery(author.firstname, author.lastname)
                .getRawOne();
        if (authorExists == undefined) {
            authorExists = false;
        }
        return authorExists;
    }

    private async insertIndividualAuthor(authorReceived: IAuthors): Promise<any> {
        let author = new Authors();
        author.id;
        author.firstName = authorReceived.firstname;
        author.lastName = authorReceived.lastname;
        author.middleName = authorReceived.middlename;
        let authorExists: any;
        if (authorReceived.middlename != null) {
            authorExists = await this.getAuthorIdHasMiddleName(authorReceived);
        }
        else {
            authorExists = await this.getAuthorIdNoMiddleName(authorReceived);
        }
        if (authorExists != false) {
            author.id = authorExists.id;
        }
        else {
            await this.connection.manager.save(author);
        }
        return author;
    }

    async insertAuthors(storeAuthors: IAuthors[]): Promise<any[]> {
        let allAuthors: any[] = [];
        for (let i = 0; i < storeAuthors.length; i++) {
            let author = await this.insertIndividualAuthor(storeAuthors[i]);
            allAuthors.push(author);
        }
        return allAuthors;
    }
    private selectPublicationIdQuery = (publicationName: string, publicationDOI: string, publicationPages: number, publicationYear: number, publicationDatePublished: Date, publicationAccessed: Date) =>
        this.connection.createQueryBuilder(Publications, 'publication')
            .select('publication.id', 'id')
            .where("LOWER(publication.name) = LOWER(:publicationNameRef)")
            .andWhere("LOWER(publication.doi) = LOWER(:publicationDOIRef)")
            .andWhere("publication.pages = :publicationPagesRef OR publication.pages IS NULL")
            .andWhere("publication.year = :publicationYearRef")
            .andWhere("publication.datePublished = :publicationDatePublishedRef OR publication.datePublished IS NULL")
            .andWhere("publication.dateAccessed = :publicationAccessedRef OR publication.dateAccessed IS NULL")
            .setParameters({ publicationNameRef: publicationName, publicationDOIRef: publicationDOI, publicationPagesRef: publicationPages, publicationYearRef: publicationYear, publicationDatePublishedRef: publicationDatePublished, publicationAccessedRef: publicationAccessed })
            .getRawOne();

    private async fetchPublicationId(publicationName: string, publicationDOI: string, publicationPages: number, publicationYear: number, publicationDatePublished: Date, publicationAccessed: Date): Promise<any> {
        let publicationExists = await this.selectPublicationIdQuery(publicationName, publicationDOI, publicationPages, publicationYear, publicationDatePublished, publicationAccessed);
        if (publicationExists == undefined) {
            publicationExists = false;
        }
        return publicationExists;
    }

    async insertPublication(referenceTitle: string, referenceDOI: string, referencePages: number, preferenceTypeID: number, publisherNameId: number, referenceYear: number, referenceVolume: number, referenceDatePublished: Date, referenceDateAccessed: Date, referenceAuthors: any[]): Promise<number> {
        let publication = new Publications();
        publication.id;
        publication.name = referenceTitle;
        publication.doi = referenceDOI;
        publication.pages = referencePages;
        publication.publicationtypeId = preferenceTypeID;
        publication.publisherId = publisherNameId;
        publication.year = referenceYear;
        publication.volume = referenceVolume;
        publication.datePublished = referenceDatePublished;
        publication.dateAccessed = referenceDateAccessed;
        publication.authors = referenceAuthors;
        let publicationExists: any;
        publicationExists = await this.fetchPublicationId(referenceTitle, referenceDOI, referencePages, referenceVolume, referenceYear, referenceDatePublished, referenceDateAccessed);
        if (publicationExists != false) {
            publication.id = publicationExists.id;
        }
        else {
            await this.connection.manager.save(publication);
        }
        console.log("publication saved.");
        return publication.id;
    }

    private selectCompositionIdQuery = (compositionReceived: string) =>
        this.connection.createQueryBuilder(Composition, 'composition')
            .select('composition.id', 'id')
            .where('LOWER(composition.composition) = LOWER(:compositionRef)', { compositionRef: compositionReceived })
            .getRawOne();

    private async fetchCompositionId(compositionReceived: string): Promise<any> {
        let compositionExists = await this.selectCompositionIdQuery(compositionReceived)
        if (compositionExists == undefined) {
            compositionExists = false;
        }
        return compositionExists;
    }

    private async insertIndividualComposition(compositionReceived: string): Promise<number> {
        let composition = new Composition();
        composition.id;
        composition.composition = compositionReceived;
        let compositionExists: any;
        compositionExists = await this.fetchCompositionId(compositionReceived);
        if (compositionExists != false) {
            composition.id = compositionExists.id;
        }
        else {
            await this.connection.manager.save(composition);
        }
        return composition.id;
    }

    private selectMaterialIdQuery = (materialReceived: string, compositionId: number) =>
        this.connection.createQueryBuilder(Material, 'material')
            .select('material.id', 'id')
            .where('LOWER(material.details) = LOWER(:materialRef)', { materialRef: materialReceived })
            .andWhere('material.composition = :compositionIdRef', { compositionIdRef: compositionId })
            .getRawOne();

    private async fetchMaterialId(materialReceived: string, compositionId: number): Promise<any> {
        let materialExists = await this.selectMaterialIdQuery(materialReceived, compositionId)
        if (materialExists == undefined) {
            materialExists = false;
        }
        return materialExists;
    }

    private async insertIndividualMaterial(materialReceived: string, compositionId: number): Promise<Material> {
        let material = new Material();
        material.id;
        material.compositionId = compositionId;
        material.details = materialReceived;
        let materialExists: any;
        materialExists = await this.fetchMaterialId(materialReceived, compositionId);
        if (materialExists != false) {
            material.id = materialExists.id;
        }
        else {
            await this.connection.manager.save(material);
        }
        return material;
    }

    async insertMaterial(material: IMaterials[]): Promise<any[]> {
        let allMaterials: any[] = [];
        for (var i = 0; i < material.length; i++) {
            let compositionId = await this.insertIndividualComposition(material[i].composition);
            let someMaterial = await this.insertIndividualMaterial(material[i].details, compositionId);
            allMaterials.push(someMaterial);
        }
        return allMaterials;
    }

    private selectCategoryIdQuery = (categoryReceived: string) =>
        this.connection.createQueryBuilder(Category, 'category')
            .select('category.id', 'id')
            .where('LOWER(category.name) = LOWER(:categoryRef)', { categoryRef: categoryReceived })
            .getRawOne();

    private async fetchCategoryId(categoryReceived: string): Promise<any> {
        let categoryExists = await this.selectCategoryIdQuery(categoryReceived)
        if (categoryExists == undefined) {
            categoryExists = false;
        }
        return categoryExists;
    }

    private async insertIndividualCategory(category: string): Promise<number> {
        let someCategory = new Category();
        someCategory.id;
        someCategory.name = category;
        let categoryExists: any;
        categoryExists = await this.fetchCategoryId(category);
        if (categoryExists != false) {
            someCategory.id = categoryExists.id;
        }
        else {
            await this.connection.manager.save(someCategory);
        }
        return someCategory.id
    }

    private selectSubcategoryIdQuery = (subcategoryReceived: string) =>
        this.connection.createQueryBuilder(Subcategory, 'subcategory')
            .select('subcategory.id', 'id')
            .where('LOWER(subcategory.name) = LOWER(:subcategoryRef)', { subcategoryRef: subcategoryReceived })
            .getRawOne();

    private async fetchSubcategoryId(subcategoryReceived: string): Promise<any> {
        let subcategoryExists = await this.selectSubcategoryIdQuery(subcategoryReceived)
        if (subcategoryExists == undefined) {
            subcategoryExists = false;
        }
        return subcategoryExists;
    }

    private async insertIndividualSubcategory(subcategory: string): Promise<number> {
        let someSubcategory = new Subcategory();
        someSubcategory.id;
        someSubcategory.name = subcategory;
        let subcategoryExists: any;
        subcategoryExists = await this.fetchSubcategoryId(subcategory);
        if (subcategoryExists != false) {
            someSubcategory.id = subcategoryExists.id;
        }
        else {
            await this.connection.manager.save(someSubcategory);
        }
        return someSubcategory.id
    }

    async insertCategories(category: string, subcategory: string): Promise<number[]> {
        let categoryId = await this.insertIndividualCategory(category);
        let subcategoryId = await this.insertIndividualSubcategory(subcategory);
        let allCategoryIDs = [categoryId, subcategoryId];
        return allCategoryIDs;
    }

    private selectDataSetDataTypeIdQuery = (datasetdatatypeReceived: string) =>
        this.connection.createQueryBuilder(Datasetdatatype, 'datasetdatatype')
            .select('datasetdatatype.id', 'id')
            .where('LOWER(datasetdatatype.name) = LOWER(:datasetdatatypeRef)', { datasetdatatypeRef: datasetdatatypeReceived })
            .getRawOne();

    private async fetchDataSetDataTypeId(datasetdatatypeReceived: string): Promise<any> {
        let datasetdatatypeExists = await this.selectDataSetDataTypeIdQuery(datasetdatatypeReceived)
        if (datasetdatatypeExists == undefined) {
            datasetdatatypeExists = false;
        }
        return datasetdatatypeExists;
    }

    async insertDataSetDataType(datasetdatatypeReceived: string): Promise<number> {
        let datasetdatatype = new Datasetdatatype();
        datasetdatatype.id;
        datasetdatatype.name = datasetdatatypeReceived;
        let datasetdatatypeExists: any;
        datasetdatatypeExists = await this.fetchDataSetDataTypeId(datasetdatatypeReceived);
        if (datasetdatatypeExists != false) {
            datasetdatatype.id = datasetdatatypeExists.id;
        }
        else {
            await this.connection.manager.save(datasetdatatype);
        }
        console.log("datasetdatatype saved.");
        return datasetdatatype.id;
    }


    async insertFullDataSet(dataSetName: string, dataSetDataTypeID: number, publicationID: number, categoryIDs: number[], allMaterials: any[], dataSetComments: string): Promise<number> {
        let dataset = new Dataset();
        dataset.id;
        dataset.name = dataSetName;
        dataset.datatypeId = dataSetDataTypeID;
        dataset.publicationId = publicationID;
        dataset.categoryId = categoryIDs[0];
        dataset.subcategoryId = categoryIDs[1];
        dataset.materials = allMaterials;
        dataset.comments = dataSetComments;
        await this.connection.manager.save(dataset);
        console.log("Dataset saved.");
        return dataset.id;
    }

    private selectUnitsIdQuery = (unitsReceived: string) =>
        this.connection.createQueryBuilder(Units, 'units')
            .select('units.id', 'id')
            .where('LOWER(units.name) = LOWER(:unitsRef)', { unitsRef: unitsReceived })
            .getRawOne();

    private async fetchUnitsId(unitsReceived: string): Promise<any> {
        let unitsExists = await this.selectUnitsIdQuery(unitsReceived)
        if (unitsExists == undefined) {
            unitsExists = false;
        }
        return unitsExists;
    }

    async insertUnits(unitReceived: string): Promise<number> {
        let units = new Units();
        units.id;
        units.name = unitReceived;
        units.units = unitReceived;
        let unitsExists: any;
        unitsExists = await this.fetchUnitsId(unitReceived);
        if (unitsExists != false) {
            units.id = unitsExists.id;
        }
        else {
            await this.connection.manager.save(units);
        }
        return units.id;
    }

    private selectRepresentationIdQuery = (reprReceived: string) =>
        this.connection.createQueryBuilder(Representations, 'repr')
            .select('repr.id', 'id')
            .where('LOWER(repr.repr) = LOWER(:reprRef)', { reprRef: reprReceived })
            .getRawOne();

    private async fetchRepresentationId(reprReceived: string): Promise<any> {
        let reprExists = await this.selectRepresentationIdQuery(reprReceived)
        if (reprExists == undefined) {
            reprExists = false;
        }
        return reprExists;
    }

    async insertRepresentation(representationUnit: string): Promise<number> {
        let repr = new Representations();
        repr.id;
        repr.repr = representationUnit;
        let reprExists: any;
        reprExists = await this.fetchRepresentationId(representationUnit);
        if (reprExists != false) {
            repr.id = reprExists.id;
        }
        else {
            await this.connection.manager.save(repr);
        }
        return repr.id;
    }

    async insertDataPointsOfSet(dataSetID: number, dataVariableName: string, dataPointValues: number[], unitsID: number, reprID: number) {
        let datapoint = new Datapoints();
        datapoint.id;
        datapoint.datasetId = dataSetID;
        datapoint.name = dataVariableName;
        datapoint.values = dataPointValues;
        datapoint.unitsId = unitsID;
        datapoint.representationsId = reprID;
        await this.connection.manager.save(datapoint);
    }

    async insertDataPointsOfSetComments(dataSetID: number, comments: string[]) {
        let datapointcomments = new Datapointcomments();
        datapointcomments.id;
        datapointcomments.datasetId = dataSetID;
        datapointcomments.comments = comments;
        await this.connection.manager.save(datapointcomments);
    }
}
