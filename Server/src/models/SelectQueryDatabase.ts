import { getConnection } from "typeorm";
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


const getDataSet = async (datasetReceived, dataset2) => {

    const connection = getConnection();

    console.log("Getting data for publication data 1");
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

    console.log("Getting data for publication data 2");
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
        .where('dataset.id = :datasetId', { datasetId: dataset2 })
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
        .where('dataset.id = :datasetId', { datasetId: dataset2 })
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
        .where('dataset.id = :datasetId', { datasetId: dataset2 })
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
        .where('dataset.id = :datasetId', { datasetId: dataset2 })
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
        .where('dataset.id = :datasetId', { datasetId: dataset2 })
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
        .where('dataset.id = :datasetId', { datasetId: dataset2 })
        .getRawMany();
    console.log(datapointComments2);
}

module.exports = { getDataSet };