import { createConnection, getManager } from 'typeorm';
import { getRepository } from "typeorm";
import { Authors } from './models/entities/Authors';
import { Publications } from './models/entities/Publications';
import { Publisher } from './models/entities/Publisher';
import { Publicationtype } from './models/entities/Publicationtype';
import { Composition } from './models/entities/Composition';
import { Datasetdatatype } from './models/entities/Datasetdatatype';
import { Dataset } from './models/entities/Dataset';
import { Category } from './models/entities/Category';
import { Subcategory } from './models/entities/Subcategory';
import { Datapoints } from './models/entities/Datapoints';
import { Units } from './models/entities/Units';
import { Material } from './models/entities/Material';
import { Datapointcomments } from './models/entities/Datapointcomments';
import { Representations } from './models/entities/Representations';

export const connectDB = async () => {
  await createConnection().then(async connection => {
    console.log("Connection was made.")

    //Methods for Entity Manager: https://github.com/typeorm/typeorm/blob/master/docs/entity-manager-api.md
    // This is using connection.manager.{methodName}

    /** 
     * Order of element creation matters immensely. If it is done out of order, elements will not be
     * properly created, given how various foreign keys are set up. 
     * Authors, Publicationtype, and Publisher must be created before Publications
     * Composition must be created before the linked Material 
     * Datasetdatatype, Publications, Category, Subcategory, and Composition must be created before Dataset
     * Dataset, Representations, and Units must be created before Datapoints
     */

    let datasetReceived = 1;
    let datasetId2 = 3;

    console.log("Getting publication data #1");
    let publicationData1 = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('publication.name', 'publication_name')
      .addSelect('publication.doi', 'publication_doi')
      .addSelect('publication.pages', 'publication_pages')
      .addSelect('publication.volume', 'publication_volume')
      .addSelect('publication.year', 'publication_year')
      .addSelect('publication.datePublished', 'publication_datePublished')
      .addSelect('publication.dateAccessed', 'publication_dateAccessed')
      .addSelect('publisher.name', 'publisher_name')
      .addSelect('publicationtype.name', 'publicationtype_name')
      .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
      .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
      .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();
    console.log(publicationData1);

    console.log("Getting publication data #2");
    let publicationData2 = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('publication.name', 'publication_name')
      .addSelect('publication.doi', 'publication_doi')
      .addSelect('publication.pages', 'publication_pages')
      .addSelect('publication.volume', 'publication_volume')
      .addSelect('publication.year', 'publication_year')
      .addSelect('publication.datePublished', 'publication_datePublished')
      .addSelect('publication.dateAccessed', 'publication_dateAccessed')
      .addSelect('publisher.name', 'publisher_name')
      .addSelect('publicationtype.name', 'publicationtype_name')
      .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
      .innerJoin(Publisher, 'publisher', 'publication.publisherId = publisher.id')
      .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
      .where('dataset.id = :datasetId', { datasetId: datasetId2 })
      .getRawMany();
    console.log(publicationData2);

    console.log("Getting author data #1");
    let authorData1 = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('author.firstName', 'author_firstName')
      .addSelect('author.lastName', 'author_lastName')
      .addSelect('author.middleName', 'author_middleName')
      .innerJoin('publication.authors', 'author')
      .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();
    console.log(authorData1);

    console.log("Getting author data #2");
    let authorData2 = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('author.firstName', 'author_firstName')
      .addSelect('author.lastName', 'author_lastName')
      .addSelect('author.middleName', 'author_middleName')
      .innerJoin('publication.authors', 'author')
      .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
      .where('dataset.id = :datasetId', { datasetId: datasetId2 })
      .getRawMany();
    console.log(authorData2);

    console.log("Getting first data set data");
    let datasetData1 = await connection.manager
      .createQueryBuilder(Dataset, 'dataset')
      .select('dataset.name', 'dataset_name')
      .addSelect('datasetdatatype.name', 'datasetdatatype_name')
      .addSelect('category.name', 'category_name')
      .addSelect('subcategory.name', 'subcategory_name')
      .addSelect('dataset.comments', 'dataset_comments')
      .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
      .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
      .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();
    console.log(datasetData1);

    console.log("Getting second data set data");
    let datasetData2 = await connection.manager
      .createQueryBuilder(Dataset, 'dataset')
      .select('dataset.name', 'dataset_name')
      .addSelect('datasetdatatype.name', 'datasetdatatype_name')
      .addSelect('category.name', 'category_name')
      .addSelect('subcategory.name', 'subcategory_name')
      .addSelect('dataset.comments', 'dataset_comments')
      .innerJoin(Datasetdatatype, 'datasetdatatype', 'dataset.datatypeId = datasetdatatype.id')
      .innerJoin(Category, 'category', 'dataset.categoryId = category.id')
      .innerJoin(Subcategory, 'subcategory', 'dataset.subcategoryId = subcategory.id')
      .where('dataset.id = :datasetId', { datasetId: datasetId2 })
      .getRawMany();
    console.log(datasetData2);

    console.log("Getting data set materials #1");
    let materialData1 = await connection.manager
      .createQueryBuilder(Material, 'material')
      .select('composition.composition', 'composition_composition')
      .addSelect('material.details', 'material_details')
      .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
      .innerJoin('material.datasets', 'dataset')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();
    console.log(materialData1);

    console.log("Getting data set materials #2");
    let materialData2 = await connection.manager
      .createQueryBuilder(Material, 'material')
      .select('composition.composition', 'composition_composition')
      .addSelect('material.details', 'material_details')
      .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
      .innerJoin('material.datasets', 'dataset')
      .where('dataset.id = :datasetId', { datasetId: datasetId2 })
      .getRawMany();
    console.log(materialData2);

    console.log("Getting data point data #1");
    let datapointData1 = await connection.manager
      .createQueryBuilder(Datapoints, 'datapoints')
      .select('datapoints.name', 'datapoints_name')
      .addSelect('datapoints.values', 'datapoints_values')
      .addSelect('units.units', 'units_units')
      .addSelect('representations.repr', 'representations_repr')
      .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
      .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
      .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();
    console.log(datapointData1);

    console.log("Getting data point data #2");
    let datapointData2 = await connection.manager
      .createQueryBuilder(Datapoints, 'datapoints')
      .select('datapoints.name', 'datapoints_name')
      .addSelect('datapoints.values', 'datapoints_values')
      .addSelect('units.units', 'units_units')
      .addSelect('representations.repr', 'representations_repr')
      .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
      .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
      .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
      .where('dataset.id = :datasetId', { datasetId: datasetId2 })
      .getRawMany();
    console.log(datapointData2);


    console.log("Getting data point comments for first data set");
    let datapointComments1 = await connection.manager
      .createQueryBuilder(Datapointcomments, 'datapointcomments')
      .select('datapointcomments.comments', 'datapointcomments_comments')
      .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();
    console.log(datapointComments1);

    console.log("Getting data point comments for second data set");
    let datapointComments2 = await connection.manager
      .createQueryBuilder(Datapointcomments, 'datapointcomments')
      .select('datapointcomments.comments', 'datapointcomments_comments')
      .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
      .where('dataset.id = :datasetId', { datasetId: datasetId2 })
      .getRawMany();
    console.log(datapointComments2);
  })
};