import { createConnection, getManager } from 'typeorm';

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
    let dataset2 = 2;

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

    console.log("Getting publication data #2");
    let publicationData = await connection.manager
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
      .where('dataset.id = 2')
      .getRawMany();
    console.log(JSON.stringify(publicationData));

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

    console.log("Getting author data #2");
    let authorData = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('author.firstName', 'author_firstName')
      .addSelect('author.lastName', 'author_lastName')
      .addSelect('author.middleName', 'author_middleName')
      .innerJoin('publication.authors', 'author')
      .innerJoin(Dataset, 'dataset', 'publication.id = dataset.publicationId')
      .where('dataset.id = 2')
      .getRawMany();
    console.log(authorData[0].author_firstName, authorData[0].author_middleName, authorData[0].author_lastName);
    console.log(authorData[3].author_firstName, authorData[3].author_middleName, authorData[3].author_lastName);

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
      .where('dataset.id = 1')
      .getRawMany();

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
      .where('dataset.id = 2')
      .getRawMany();
    console.log(datasetData2[0].subcategory_name);

    console.log("Getting data set materials #1");
    let materialData1 = await connection.manager
      .createQueryBuilder(Material, 'material')
      .select('composition.composition', 'composition_composition')
      .addSelect('material.details', 'material_details')
      .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
      .innerJoin('material.datasets', 'dataset')
      .where('dataset.id = :datasetId', { datasetId: datasetReceived })
      .getRawMany();

    console.log("Getting data set materials");
    let materialData = await connection.manager
      .createQueryBuilder(Material, 'material')
      .select('composition.composition', 'composition_composition')
      .addSelect('material.details', 'material_details')
      .innerJoin(Composition, 'composition', 'material.compositionId = composition.id')
      .innerJoin('material.datasets', 'dataset')
      .where('dataset.id = 2')
      .getRawMany();
    console.log(materialData[0].composition_composition);
    console.log(materialData[1].composition_composition);
    console.log(materialData[2].composition_composition);

    console.log("Getting data point data #1");
    let datapointData = await connection.manager
      .createQueryBuilder(Datapoints, 'datapoints')
      .select('datapoints.name', 'datapoints_name')
      .addSelect('datapoints.values', 'datapoints_values')
      .addSelect('units.units', 'units_units')
      .addSelect('representations.repr', 'representations_repr')
      .innerJoin(Units, 'units', 'datapoints.unitsId = units.id')
      .innerJoin(Representations, 'representations', 'datapoints.representationsId = representations.id')
      .innerJoin(Dataset, 'dataset', 'datapoints.datasetId = dataset.id')
      .where('dataset.id = 1')
      .getRawMany();
    console.log(datapointData[0].datapoints_name);
    console.log(datapointData[0].datapoints_values);
    console.log(datapointData[0].units_units);
    console.log(datapointData[0].representations_repr);
    console.log(datapointData[1].datapoints_name);
    console.log(datapointData[1].datapoints_values);
    console.log(datapointData[1].units_units);
    console.log(datapointData[1].representations_repr);

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
      .where('dataset.id = 2')
      .getRawMany();
    console.log(datapointData2);


    console.log("Getting data point comments for first data set");
    let datapointComments = await connection.manager
      .createQueryBuilder(Datapointcomments, 'datapointcomments')
      .select('datapointcomments.comments', 'datapointcomments_comments')
      .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
      .where('dataset.id = 1')
      .getRawMany();
    console.log(datapointComments);

    console.log("Getting data point comments for second data set");
    let datapointComments2 = await connection.manager
      .createQueryBuilder(Datapointcomments, 'datapointcomments')
      .select('datapointcomments.comments', 'datapointcomments_comments')
      .innerJoin(Dataset, 'dataset', 'datapointcomments.datasetId = dataset.id')
      .where('dataset.id = 2')
      .getRawMany();
    console.log(datapointComments2);
  })
};