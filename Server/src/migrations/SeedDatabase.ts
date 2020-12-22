import { getConnection, MigrationInterface, QueryRunner } from "typeorm";
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
import { Subcategory } from "../models/entities/Subcategory";
import { Units } from "../models/entities/Units";

export class SeedDatabase1608609071666 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let connection = getConnection();

    await queryRunner.query('CREATE TABLE publicationtype (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE publisher (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE category (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE subcategory (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE composition (id int NOT NULL AUTO_INCREMENT, composition varchar(50) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE material (id int NOT NULL AUTO_INCREMENT, compositionId int NOT NULL, details varchar(255) NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE datasetdatatype (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE dataset (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, datatypeId int NOT NULL, publicationId int NOT NULL, categoryId int NOT NULL, subcategoryId int NOT NULL, comments varchar(255) NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE publications (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, doi varchar(255) NULL, pages int NULL, volume int NULL, publicationtypeId int NOT NULL, publisherId int NOT NULL, year int(4) NOT NULL, datePublished datetime NULL, dateAccessed datetime NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE authors (id int NOT NULL AUTO_INCREMENT, firstName varchar(255) NOT NULL, lastName varchar(255) NOT NULL, middleName varchar(255) NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE representations (id int NOT NULL AUTO_INCREMENT, repr varchar(20) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE units (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, units varchar(10) NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE datapoints (id int NOT NULL AUTO_INCREMENT, datasetId int NOT NULL, name varchar(255) NOT NULL, dataValues json NOT NULL, unitsId int NOT NULL, representationsId int NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE datapointcomments (id int NOT NULL AUTO_INCREMENT, datasetId int NOT NULL, comments json NOT NULL, created datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), updated datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (id))');

    await queryRunner.query('CREATE TABLE dataset_materials_material (datasetId int NOT NULL, materialId int NOT NULL, INDEX IDX_e7616706c7e903abdf5d3476fe (datasetId), INDEX IDX_9cdbf64f43b823df7439f02f11 (materialId), PRIMARY KEY (datasetId, materialId))');

    await queryRunner.query('CREATE TABLE publications_authors_authors (publicationsId int NOT NULL, authorsId int NOT NULL, INDEX IDX_2e8fe19c4e343980e449ecc977 (publicationsId), INDEX IDX_b8cf82d3ae0d7b4f70e123f390 (authorsId), PRIMARY KEY (publicationsId, authorsId))');

    await queryRunner.query('ALTER TABLE `material` ADD CONSTRAINT `FK_bb553325fa1f8bd6b3cc6edfe58` FOREIGN KEY (`compositionId`) REFERENCES `composition`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `dataset` ADD CONSTRAINT `FK_326e43033879ccd249b434df183` FOREIGN KEY (`datatypeId`) REFERENCES `datasetdatatype`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `dataset` ADD CONSTRAINT `FK_8e00ea03b2530167eef64f59ce3` FOREIGN KEY (`publicationId`) REFERENCES `publications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `dataset` ADD CONSTRAINT `FK_2b2dac06a80879ed471a6c365f6` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `dataset` ADD CONSTRAINT `FK_1abae03dcaa374d055d746641ad` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `publications` ADD CONSTRAINT `FK_6596979daf16462f4cd5dcb2485` FOREIGN KEY (`publicationtypeId`) REFERENCES `publicationtype`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `publications` ADD CONSTRAINT `FK_62ed69b626977b878aba6c6cbaa` FOREIGN KEY (`publisherId`) REFERENCES `publisher`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `datapoints` ADD CONSTRAINT `FK_dfb47d645d285b6933c3c623783` FOREIGN KEY (`datasetId`) REFERENCES `dataset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `datapoints` ADD CONSTRAINT `FK_443397e0b728e1ec6b54841a48c` FOREIGN KEY (`unitsId`) REFERENCES `units`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `datapoints` ADD CONSTRAINT `FK_89c804e29c76bf42359402d0ad3` FOREIGN KEY (`representationsId`) REFERENCES `representations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `datapointcomments` ADD CONSTRAINT `FK_b02391f9e4a4830c473a6dc8e33` FOREIGN KEY (`datasetId`) REFERENCES `dataset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `dataset_materials_material` ADD CONSTRAINT `FK_e7616706c7e903abdf5d3476fe3` FOREIGN KEY (`datasetId`) REFERENCES `dataset`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `dataset_materials_material` ADD CONSTRAINT `FK_9cdbf64f43b823df7439f02f117` FOREIGN KEY (`materialId`) REFERENCES `material`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `publications_authors_authors` ADD CONSTRAINT `FK_2e8fe19c4e343980e449ecc977b` FOREIGN KEY (`publicationsId`) REFERENCES `publications`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');

    await queryRunner.query('ALTER TABLE `publications_authors_authors` ADD CONSTRAINT `FK_b8cf82d3ae0d7b4f70e123f3907` FOREIGN KEY (`authorsId`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');

    let book = new Publicationtype();
    book.id;
    book.name = "Book";
    await connection.manager.save(book);

    let publisherName = new Publisher();
    publisherName.id;
    publisherName.name = "University of California Press";
    await connection.manager.save(publisherName);

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

    let compositionC = new Composition();
    compositionC.id;
    compositionC.composition = "C";
    await connection.manager.save(compositionC);

    let compositionO2 = new Composition();
    compositionO2.id;
    compositionO2.composition = "O2";
    await connection.manager.save(compositionO2);

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

    let category1 = new Category();
    category1.id = 1;
    category1.name = "None Entered";
    await connection.manager.save(category1);

    let category = new Category();
    category.id = 2;
    category.name = "Cell Size";
    await connection.manager.save(category);

    let subcategory1 = new Subcategory();
    subcategory1.id = 1;
    subcategory1.name = "None Entered";
    await connection.manager.save(subcategory1);

    let subcategory = new Subcategory();
    subcategory.id = 2;
    subcategory.name = "Width";
    await connection.manager.save(subcategory);

    let datasetdatatypeNone = new Datasetdatatype();
    datasetdatatypeNone.id;
    datasetdatatypeNone.name = "Not Specified";
    await connection.manager.save(datasetdatatypeNone);

    let datasetdatatype = new Datasetdatatype();
    datasetdatatype.id;
    datasetdatatype.name = "Hugoniot";
    await connection.manager.save(datasetdatatype);

    let dataset = new Dataset();
    dataset.id = 1;
    dataset.name = "CARBON, graphite, pressed, Initial density = 2.13 g/cc";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = publication.id;
    dataset.categoryId = category.id;
    dataset.subcategoryId = subcategory.id;
    dataset.comments = "References 5,6,14\nAverage density = 2.134 g/cc";
    dataset.materials = [materialC, materialO2];
    await connection.manager.save(dataset);

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

    // Data points below this line. Due to an oddity with queryRunner, 'values' is a reserved term and thus
    // the field was renamed to 'dataValues' in testing

    let datapoint = new Datapoints();
    datapoint.id;
    datapoint.datasetId = dataset.id;
    datapoint.name = "Initial Density";
    datapoint.dataValues = [2.113, 2.123, 2.123, 2.143, 2.141, 2.146, 2.142, 2.134, 2.135, 2.136, 2.136];
    datapoint.unitsId = unitsGCC.id;
    datapoint.representationsId = reprNone.id;
    await connection.manager.save(datapoint);

    let datapoint2 = new Datapoints();
    datapoint2.id;
    datapoint2.datasetId = dataset.id;
    datapoint2.name = "Initial Temperature";
    datapoint2.dataValues = [273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15];
    datapoint2.unitsId = unitsKelvin.id;
    datapoint2.representationsId = reprNone.id;
    await connection.manager.save(datapoint2);

    let datapoint3 = new Datapoints();
    datapoint3.id;
    datapoint3.datasetId = dataset.id;
    datapoint3.name = "Initial Pressure";
    datapoint3.dataValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    datapoint3.unitsId = unitsGigapascal.id;
    datapoint3.representationsId = reprNone.id;
    await connection.manager.save(datapoint3);

    let datapoint4 = new Datapoints();
    datapoint4.id;
    datapoint4.datasetId = dataset.id;
    datapoint4.name = "Shock Velocity";
    datapoint4.dataValues = [5.235, 6.013, 6.320, 6.551, 6.704, 7.960, 8.762, 8.836, 9.208, 9.627, 9.556];
    datapoint4.unitsId = unitsKMPS.id;
    datapoint4.representationsId = reprNone.id;
    await connection.manager.save(datapoint4);

    let datapoint5 = new Datapoints();
    datapoint5.id;
    datapoint5.datasetId = dataset.id;
    datapoint5.name = "Particle Velocity";
    datapoint5.dataValues = [1.026, 1.380, 1.972, 2.607, 2.779, 3.370, 3.748, 3.801, 3.948, 4.138, 4.290];
    datapoint5.unitsId = unitsKMPS.id;
    datapoint5.representationsId = reprNone.id;
    await connection.manager.save(datapoint5);

    let datapoint6 = new Datapoints();
    datapoint6.id;
    datapoint6.datasetId = dataset.id;
    datapoint6.name = "Pressure";
    datapoint6.dataValues = [11.349, 17.617, 26.459, 36.599, 39.888, 57.567, 70.343, 71.672, 77.614, 85.091, 87.657];
    datapoint6.unitsId = unitsGigapascal.id;
    datapoint6.representationsId = reprNone.id;
    await connection.manager.save(datapoint6);

    let datapoint7 = new Datapoints();
    datapoint7.id;
    datapoint7.datasetId = dataset.id;
    datapoint7.name = "Specific Volume";
    datapoint7.dataValues = [0.3805, 0.3629, 0.3241, 0.2809, 0.2735, 0.2687, 0.2672, 0.2670, 0.2676, 0.2669, 0.2582];
    datapoint7.unitsId = unitsCCG.id;
    datapoint7.representationsId = reprNone.id;
    await connection.manager.save(datapoint7);

    let datapoint8 = new Datapoints();
    datapoint8.id;
    datapoint8.datasetId = dataset.id;
    datapoint8.name = "Density";
    datapoint8.dataValues = [2.628, 2.755, 3.086, 3.560, 3.657, 3.722, 3.743, 3.745, 3.737, 3.746, 3.873];
    datapoint8.unitsId = unitsGCC.id;
    datapoint8.representationsId = reprNone.id;
    await connection.manager.save(datapoint8);

    let datapoint9 = new Datapoints();
    datapoint9.id;
    datapoint9.datasetId = dataset.id;
    datapoint9.name = "Compression Ratio";
    datapoint9.dataValues = [0.804, 0.770, 0.688, 0.602, 0.585, 0.577, 0.572, 0.570, 0.571, 0.570, 0.552];
    datapoint9.unitsId = unitsNone.id;
    datapoint9.representationsId = reprNone.id;
    await connection.manager.save(datapoint9);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE dataset_materials_material');
    await queryRunner.query('DROP TABLE publications_authors_authors');
    await queryRunner.query('DROP TABLE datapointcomments');
    await queryRunner.query('DROP TABLE datapoints');
    await queryRunner.query('DROP TABLE units');
    await queryRunner.query('DROP TABLE representations');
    await queryRunner.query('DROP TABLE authors');
    await queryRunner.query('DROP TABLE dataset');
    await queryRunner.query('DROP TABLE publications');
    await queryRunner.query('DROP TABLE datasetdatatype');
    await queryRunner.query('DROP TABLE material');
    await queryRunner.query('DROP TABLE composition');
    await queryRunner.query('DROP TABLE category');
    await queryRunner.query('DROP TABLE subcategory');
    await queryRunner.query('DROP TABLE publisher');
    await queryRunner.query('DROP TABLE publicationtype');
  }
}