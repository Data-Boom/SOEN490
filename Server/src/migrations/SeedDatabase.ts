import { getConnection, MigrationInterface, QueryRunner } from "typeorm";
import { Accounts } from "../models/entities/Accounts";
import { Authors } from "../models/entities/Authors";
import { Category } from "../models/entities/Category";
import { Composition } from "../models/entities/Composition";
import { Datapoints } from "../models/entities/Datapoints";
import { Dataset } from "../models/entities/Dataset";
import { Datasetdatatype } from "../models/entities/Datasetdatatype";
import { Material } from "../models/entities/Material";
import { Publications } from "../models/entities/Publications";
import { Publicationtype } from "../models/entities/Publicationtype";
import { Publisher } from "../models/entities/Publisher";
import { Representations } from "../models/entities/Representations";
import { Graphstate } from "../models/entities/Graphstate";
import { Subcategory } from "../models/entities/Subcategory";
import { Units } from "../models/entities/Units";
import { AuthenticationService } from '../services/authenticationService';
import { Unapproveddatasets } from "../models/entities/Unapproveddatasets";
import { Datapointcomments } from "../models/entities/Datapointcomments";

export class SeedDatabase1611344612000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let connection = getConnection();

    // Accounts Data
    let authenticationService = new AuthenticationService();

    let user1 = new Accounts();
    user1.id = 1;
    user1.email = 'j.comkj';
    user1.password = await authenticationService.hashPassword('123') as any;
    user1.firstName = 'Ace';
    user1.lastName = 'FireFist';
    user1.dateOfBirth = '1980-01-01' as any;
    user1.organizationName = 'Mugiwara';
    user1.admin = !!true;
    await connection.manager.save(user1);

    let user2 = new Accounts();
    user2.id = 2;
    user2.email = 'test@t.com';
    user2.password = await authenticationService.hashPassword('123') as any;
    user2.firstName = 'Tom';
    user2.lastName = 'Happy';
    user2.dateOfBirth = '1980-01-01' as any;
    user2.organizationName = 'Mobil';
    user2.admin;
    await connection.manager.save(user2);

    let user3 = new Accounts();
    user3.id = 3;
    user3.email = 'tester@123.com';
    user3.password = await authenticationService.hashPassword('123') as any;
    user3.firstName = 'Wyatt';
    user3.lastName = 'forfore';
    user3.dateOfBirth = '1980-01-01' as any;
    user3.organizationName = 'Ozark';
    user3.admin = !!true;
    await connection.manager.save(user3);

    let book = new Publicationtype();
    book.id;
    book.name = "Book";
    await connection.manager.save(book);

    let toDelete = new Publicationtype();
    toDelete.id;
    toDelete.name = "Report";
    await connection.manager.save(toDelete);

    let publisherName = new Publisher();
    publisherName.id;
    publisherName.name = "University of California Press";
    await connection.manager.save(publisherName);

    let publisherNameToDelete = new Publisher();
    publisherNameToDelete.id;
    publisherNameToDelete.name = "Deleted Press";
    await connection.manager.save(publisherNameToDelete);

    let author1 = new Authors();
    author1.id;
    author1.firstName = "Stanley";
    author1.lastName = "Marsh";
    author1.middleName = "P.";
    await connection.manager.save(author1);

    let author2 = new Authors();
    author2.id;
    author2.firstName = "John";
    author2.lastName = "Mclain";
    author2.middleName = "L.";
    await connection.manager.save(author2);

    let author3 = new Authors();
    author3.id;
    author3.firstName = "Alex";
    author3.lastName = "Grail";
    author3.middleName = "P.";
    await connection.manager.save(author3);

    let author4 = new Authors();
    author4.id;
    author4.firstName = "Jack";
    author4.lastName = "Mclain";
    author4.middleName;
    await connection.manager.save(author4);

    let publication = new Publications();
    publication.id;
    publication.name = "LASL shock Hugoniot data";
    publication.pages = 100;
    publication.publicationtypeId = book.id;
    publication.publisherId = publisherName.id;
    publication.year = 1980;
    publication.volume = 5;
    publication.datePublished;
    publication.dateAccessed;
    publication.authors = [author1, author2];
    await connection.manager.save(publication);

    let publication2 = new Publications();
    publication2.id;
    publication2.name = "Someone's Favorite Publisher";
    publication2.pages;
    publication2.publicationtypeId = book.id;
    publication2.publisherId = publisherName.id;
    publication2.year = 1900;
    publication2.volume;
    publication2.datePublished;
    publication2.dateAccessed;
    publication2.authors = [];
    await connection.manager.save(publication2);

    let publicationToDelete = new Publications();
    publicationToDelete.id;
    publicationToDelete.name = "Publication To Delete";
    publicationToDelete.pages = 100;
    publicationToDelete.publicationtypeId = toDelete.id;
    publicationToDelete.publisherId = publisherNameToDelete.id;
    publicationToDelete.year = 1980;
    publicationToDelete.volume = 5;
    publicationToDelete.datePublished;
    publicationToDelete.dateAccessed;
    publicationToDelete.authors = [author3, author4];
    await connection.manager.save(publicationToDelete);

    let publicationToDelete2 = new Publications();
    publicationToDelete2.id;
    publicationToDelete2.name = "Publication To Delete";
    publicationToDelete2.pages = 100;
    publicationToDelete2.publicationtypeId = toDelete.id;
    publicationToDelete2.publisherId = publisherNameToDelete.id;
    publicationToDelete2.year = 1980;
    publicationToDelete2.volume = 5;
    publicationToDelete2.datePublished;
    publicationToDelete2.dateAccessed;
    publicationToDelete2.authors = [author3, author4];
    await connection.manager.save(publicationToDelete2);

    let compositionC = new Composition();
    compositionC.id;
    compositionC.composition = "C";
    await connection.manager.save(compositionC);

    let compositionO2 = new Composition();
    compositionO2.id;
    compositionO2.composition = "O2";
    await connection.manager.save(compositionO2);

    let compositionToDelete = new Composition();
    compositionToDelete.id;
    compositionToDelete.composition = "CO2";
    await connection.manager.save(compositionToDelete);

    let materialC = new Material();
    materialC.id;
    materialC.compositionId = compositionC.id;
    materialC.details = "carbon, graphite, pressed graphite";
    await connection.manager.save(materialC);

    let materialO2 = new Material();
    materialO2.id;
    materialO2.compositionId = compositionO2.id;
    materialO2.details = "Oxygen";
    await connection.manager.save(materialO2);

    let materialToDelete = new Material();
    materialToDelete.id;
    materialToDelete.compositionId = compositionToDelete.id;
    materialToDelete.details = "Going into the void";
    await connection.manager.save(materialToDelete);

    let category1 = new Category();
    category1.id = 1;
    category1.name = "None Entered";
    await connection.manager.save(category1);

    let category = new Category();
    category.id = 2;
    category.name = "cell size";
    await connection.manager.save(category);

    let subcategory1 = new Subcategory();
    subcategory1.id = 1;
    subcategory1.name = "None Entered";
    await connection.manager.save(subcategory1);

    let subcategory = new Subcategory();
    subcategory.id = 2;
    subcategory.name = "width";
    await connection.manager.save(subcategory);

    let datasetdatatypeNone = new Datasetdatatype();
    datasetdatatypeNone.id;
    datasetdatatypeNone.name = "Not Specified";
    await connection.manager.save(datasetdatatypeNone);

    let datasetdatatype = new Datasetdatatype();
    datasetdatatype.id;
    datasetdatatype.name = "Hugoniot";
    await connection.manager.save(datasetdatatype);

    let datasetdatatypeToDelete = new Datasetdatatype();
    datasetdatatypeToDelete.id;
    datasetdatatypeToDelete.name = "Deletion";
    await connection.manager.save(datasetdatatypeToDelete);

    let dataset = new Dataset();
    dataset.id = 1;
    dataset.name = "CARBON, graphite, pressed, Initial density = 2.13 g/cc";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publication.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments = "References 5,6,14\nAverage density = 2.134 g/cc";
    dataset.materials = [materialC, materialO2];
    dataset.uploaderId = 1;
    await connection.manager.save(dataset);

    let unapproveddataset = new Unapproveddatasets();
    unapproveddataset.datasetId = 1;
    unapproveddataset.flaggedComment = "Is there a spelling error in the first author's name?";
    unapproveddataset.isFlagged = 1;
    await connection.manager.save(unapproveddataset);

    let dataset2 = new Dataset();
    dataset2.id = 2;
    dataset2.name = "Someone's Favorite";
    dataset2.datatypeId = datasetdatatypeNone.id;
    dataset2.publicationId = publication2.id;
    dataset2.categoryId = category1.id;
    dataset2.subcategoryId = subcategory1.id;
    dataset2.comments = "";
    dataset2.materials = [];
    dataset2.uploaderId = 3;
    dataset2.isApproved = 1;
    await connection.manager.save(dataset2);

    dataset.id = 5;
    dataset.name = "An unapproved dataset";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publication.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments;
    dataset.materials = [];
    dataset.uploaderId;
    await connection.manager.save(dataset);

    unapproveddataset.datasetId = 5;
    unapproveddataset.flaggedComment;
    unapproveddataset.isFlagged = 0;
    await connection.manager.save(unapproveddataset);

    dataset.id = 6;
    dataset.name = "An unapproved dataset";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publication.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments;
    dataset.materials = [];
    dataset.uploaderId;
    await connection.manager.save(dataset);

    unapproveddataset.datasetId = 6;
    unapproveddataset.flaggedComment;
    unapproveddataset.isFlagged = 0;
    await connection.manager.save(unapproveddataset);

    dataset.id = 7;
    dataset.name = "An unapproved dataset";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publicationToDelete2.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments;
    dataset.materials = [];
    dataset.uploaderId;
    await connection.manager.save(dataset);

    unapproveddataset.datasetId = 7;
    unapproveddataset.flaggedComment;
    unapproveddataset.isFlagged = 0;
    await connection.manager.save(unapproveddataset);

    dataset.id = 70;
    dataset.name = "An unapproved dataset";
    dataset.datatypeId = datasetdatatypeToDelete.id;
    dataset.publicationId = publicationToDelete.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments;
    dataset.materials = [materialToDelete];
    dataset.uploaderId;
    await connection.manager.save(dataset);

    unapproveddataset.datasetId = 70;
    unapproveddataset.flaggedComment;
    unapproveddataset.isFlagged = 0;
    await connection.manager.save(unapproveddataset);

    dataset.id = 8;
    dataset.name = "An unapproved dataset";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publication.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments;
    dataset.materials = [];
    dataset.uploaderId;
    await connection.manager.save(dataset);

    unapproveddataset.datasetId = 8;
    unapproveddataset.flaggedComment;
    unapproveddataset.isFlagged = 0;
    await connection.manager.save(unapproveddataset);

    dataset.id = 9;
    dataset.name = "An unapproved dataset";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publication.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments;
    dataset.materials = [];
    dataset.uploaderId = 1;
    await connection.manager.save(dataset);

    unapproveddataset.datasetId = 9;
    unapproveddataset.flaggedComment;
    unapproveddataset.isFlagged = 0;
    await connection.manager.save(unapproveddataset);

    // Units below this line

    let unitsNone = new Units();
    unitsNone.id;
    unitsNone.name = "No Units";
    unitsNone.units = "No Units";
    await connection.manager.save(unitsNone);

    let unitsGCC = new Units();
    unitsGCC.id;
    unitsGCC.name = "g/cc";
    unitsGCC.units = "g/cc";
    await connection.manager.save(unitsGCC);

    let unitsCCG = new Units();
    unitsCCG.id;
    unitsCCG.name = "cc/g";
    unitsCCG.units = "cc/g";
    await connection.manager.save(unitsCCG);

    let unitsKelvin = new Units();
    unitsKelvin.id;
    unitsKelvin.name = "Kelvin";
    unitsKelvin.units = "K";
    await connection.manager.save(unitsKelvin);

    let unitsGigapascal = new Units();
    unitsGigapascal.id;
    unitsGigapascal.name = "Gigapascal";
    unitsGigapascal.units = "GPa";
    await connection.manager.save(unitsGigapascal);

    let unitsKMPS = new Units();
    unitsKMPS.id;
    unitsKMPS.name = "Kilometers per Second";
    unitsKMPS.units = "km/s";
    await connection.manager.save(unitsKMPS);

    let reprNone = new Representations();
    reprNone.id;
    reprNone.repr = "N/A";
    await connection.manager.save(reprNone);

    // Data points below this line. 

    let datapointComments = new Datapointcomments();
    datapointComments.id;
    datapointComments.datasetId = dataset.id;
    datapointComments.comments = ["im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478"];
    await connection.manager.save(datapointComments);

    let datapoint = new Datapoints();
    datapoint.id;
    datapoint.datasetId = dataset.id;
    datapoint.name = "Initial Density";
    datapoint.values = [2.113, 2.123, 2.123, 2.143, 2.141, 2.146, 2.142, 2.134, 2.135, 2.136, 2.136];
    datapoint.unitsId = unitsGCC.id;
    datapoint.representationsId = reprNone.id;
    await connection.manager.save(datapoint);

    let datapoint2 = new Datapoints();
    datapoint2.id;
    datapoint2.datasetId = dataset.id;
    datapoint2.name = "Initial Temperature";
    datapoint2.values = [273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15];
    datapoint2.unitsId = unitsKelvin.id;
    datapoint2.representationsId = reprNone.id;
    await connection.manager.save(datapoint2);

    let datapoint3 = new Datapoints();
    datapoint3.id;
    datapoint3.datasetId = dataset.id;
    datapoint3.name = "Initial Pressure";
    datapoint3.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    datapoint3.unitsId = unitsGigapascal.id;
    datapoint3.representationsId = reprNone.id;
    await connection.manager.save(datapoint3);

    let datapoint4 = new Datapoints();
    datapoint4.id;
    datapoint4.datasetId = dataset.id;
    datapoint4.name = "Shock Velocity";
    datapoint4.values = [5.235, 6.013, 6.320, 6.551, 6.704, 7.960, 8.762, 8.836, 9.208, 9.627, 9.556];
    datapoint4.unitsId = unitsKMPS.id;
    datapoint4.representationsId = reprNone.id;
    await connection.manager.save(datapoint4);

    let datapoint5 = new Datapoints();
    datapoint5.id;
    datapoint5.datasetId = dataset.id;
    datapoint5.name = "Particle Velocity";
    datapoint5.values = [1.026, 1.380, 1.972, 2.607, 2.779, 3.370, 3.748, 3.801, 3.948, 4.138, 4.290];
    datapoint5.unitsId = unitsKMPS.id;
    datapoint5.representationsId = reprNone.id;
    await connection.manager.save(datapoint5);

    let datapoint6 = new Datapoints();
    datapoint6.id;
    datapoint6.datasetId = dataset.id;
    datapoint6.name = "Pressure";
    datapoint6.values = [11.349, 17.617, 26.459, 36.599, 39.888, 57.567, 70.343, 71.672, 77.614, 85.091, 87.657];
    datapoint6.unitsId = unitsGigapascal.id;
    datapoint6.representationsId = reprNone.id;
    await connection.manager.save(datapoint6);

    let datapoint7 = new Datapoints();
    datapoint7.id;
    datapoint7.datasetId = dataset.id;
    datapoint7.name = "Specific Volume";
    datapoint7.values = [0.3805, 0.3629, 0.3241, 0.2809, 0.2735, 0.2687, 0.2672, 0.2670, 0.2676, 0.2669, 0.2582];
    datapoint7.unitsId = unitsCCG.id;
    datapoint7.representationsId = reprNone.id;
    await connection.manager.save(datapoint7);

    let datapoint8 = new Datapoints();
    datapoint8.id;
    datapoint8.datasetId = dataset.id;
    datapoint8.name = "Density";
    datapoint8.values = [2.628, 2.755, 3.086, 3.560, 3.657, 3.722, 3.743, 3.745, 3.737, 3.746, 3.873];
    datapoint8.unitsId = unitsGCC.id;
    datapoint8.representationsId = reprNone.id;
    await connection.manager.save(datapoint8);

    let datapoint9 = new Datapoints();
    datapoint9.id;
    datapoint9.datasetId = dataset.id;
    datapoint9.name = "Compression Ratio";
    datapoint9.values = [0.804, 0.770, 0.688, 0.602, 0.585, 0.577, 0.572, 0.570, 0.571, 0.570, 0.552];
    datapoint9.unitsId = unitsNone.id;
    datapoint9.representationsId = reprNone.id;
    await connection.manager.save(datapoint9);

    await queryRunner.query('INSERT INTO accounts_datasets_dataset (accountsId, datasetId) VALUES (1, 2)');
    await queryRunner.query('INSERT INTO accounts_datasets_dataset (accountsId, datasetId) VALUES (3, 2)');

    let newGraph = new Graphstate();
    newGraph.id = 1;
    newGraph.accountId = 1;
    newGraph.name = "Test Graph";
    newGraph.datasetIds = [1, 2];
    newGraph.datasetColors = ["red", "green"];
    newGraph.datasetShapes = ["square", "triangle"];
    newGraph.datasetHiddenStatus = [false, true];
    newGraph.axisVariable = ["temperature", "width"];
    newGraph.axisLog = [true, true];
    newGraph.axisZoomStart = [100, 100];
    newGraph.axisZoomEnd = [100, 100];
    newGraph.axisUnits = ["C", "mm"];
    await connection.manager.save(newGraph);

    let newGraph2 = new Graphstate();
    newGraph2.id = 2;
    newGraph2.accountId = 2;
    newGraph2.name = "Test Graph #2";
    newGraph2.datasetIds = [1];
    newGraph2.datasetColors = ["red"];
    newGraph2.datasetShapes = ["square"];
    newGraph2.datasetHiddenStatus = [false];
    newGraph2.axisVariable = ["temperature"];
    newGraph2.axisLog = [true];
    newGraph2.axisZoomStart = [100];
    newGraph2.axisZoomEnd = [100];
    newGraph2.axisUnits = ["C"];
    await connection.manager.save(newGraph2);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM graphstate');
    await queryRunner.query('DELETE FROM unapproveddatasets');
    await queryRunner.query('DELETE FROM dataset_materials_material');
    await queryRunner.query('DELETE FROM publications_authors_authors');
    await queryRunner.query('DELETE FROM accounts_datasets_dataset');
    await queryRunner.query('DELETE FROM datapointcomments');
    await queryRunner.query('DELETE FROM datapoints');
    await queryRunner.query('DELETE FROM units');
    await queryRunner.query('DELETE FROM representations');
    await queryRunner.query('DELETE FROM authors');
    await queryRunner.query('DELETE FROM dataset');
    await queryRunner.query('DELETE FROM publications');
    await queryRunner.query('DELETE FROM datasetdatatype');
    await queryRunner.query('DELETE FROM material');
    await queryRunner.query('DELETE FROM composition');
    await queryRunner.query('DELETE FROM category');
    await queryRunner.query('DELETE FROM subcategory');
    await queryRunner.query('DELETE FROM publisher');
    await queryRunner.query('DELETE FROM publicationtype');
    await queryRunner.query('DELETE FROM accounts');
    await queryRunner.query('ALTER TABLE accounts AUTO_INCREMENT = 1');
  }

}
