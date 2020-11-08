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

    // Publication types below this line

    // let pubTypeError = new Publicationtype();
    // pubTypeError.id = 1;
    // pubTypeError.name = "MISSING PUBLICATION TYPE";
    // await connection.manager.save(pubTypeError);

    // let magazine = new Publicationtype();
    // magazine.id;
    // magazine.name = "Magazine";
    // await connection.manager.save(magazine);

    // let book = new Publicationtype();
    // book.id;
    // book.name = "Book";
    // await connection.manager.save(book);

    // let report = new Publicationtype();
    // report.id;
    // report.name = "Report";
    // await connection.manager.save(report);

    // // Publishers below this line

    // let publisherNameError = new Publisher();
    // publisherNameError.id = 1;
    // publisherNameError.name = "MISSING PUBLISHER";
    // await connection.manager.save(publisherNameError);

    // let publisherName = new Publisher();
    // publisherName.id;
    // publisherName.name = "University of California Press";
    // await connection.manager.save(publisherName);

    // let publisherName2 = new Publisher();
    // publisherName2.id;
    // publisherName2.name = "California Institute of Technology";
    // await connection.manager.save(publisherName2);

    // // Authors below this line

    // let author = new Authors();
    // author.id;
    // author.firstName = "R.";
    // author.lastName = "Ackbar";
    // author.middleName;
    // await connection.manager.save(author);
    // console.log("Author saved.");

    // let author2 = new Authors();
    // author2.id;
    // author2.firstName = "M.";
    // author2.lastName = "Kaneshige";
    // author2.middleName = "J.";
    // await connection.manager.save(author2);
    // console.log("Author saved.");

    // let author3 = new Authors();
    // author3.id;
    // author3.firstName = "Stanley";
    // author3.lastName = "Marsh";
    // author3.middleName = "P.";
    // await connection.manager.save(author3);
    // console.log("Author saved.");

    // let author4 = new Authors();
    // author4.id;
    // author4.firstName = "E.";
    // author4.lastName = "Schultz";
    // author4.middleName;
    // await connection.manager.save(author4);
    // console.log("Author saved.");

    // let author5 = new Authors();
    // author5.id;
    // author5.firstName = "J.";
    // author5.lastName = "Shepherd";
    // author5.middleName = "E.";
    // await connection.manager.save(author5);
    // console.log("Author saved.");

    // // Publications below this line

    // let publication = new Publications();
    // publication.id;
    // publication.name = "LASL shock Hugoniot data";
    // publication.doi;
    // publication.pages = 100;
    // publication.publicationtypeId = book.id;
    // publication.publisherId = publisherName.id;
    // publication.year = 1980;
    // publication.volume = 5;
    // publication.datePublished;
    // publication.dateAccessed;
    // publication.authors = [author3];
    // await connection.manager.save(publication);
    // console.log("Publication saved.");

    // let publication2 = new Publications();
    // publication2.id;
    // publication2.name = "Technical Report FM97-3, Explosion Dynamics Laboratory";
    // publication2.doi;
    // publication2.pages;
    // publication2.publicationtypeId = report.id;
    // publication2.publisherId = publisherName2.id;
    // publication2.year = 1997;
    // publication2.volume;
    // publication2.datePublished;
    // publication2.dateAccessed;
    // publication2.authors = [author, author2, author4, author5];
    // await connection.manager.save(publication2);
    // console.log("Publication saved.");

    // // Compositions below this line

    // let compositionError = new Composition();
    // compositionError.id = 1;
    // compositionError.composition = "MISSING COMPOSITION";
    // compositionError.name;
    // await connection.manager.save(compositionError);

    // let compositionCO2 = new Composition();
    // compositionCO2.id;
    // compositionCO2.composition = "CO2";
    // compositionCO2.name = "Carbon Dioxide";
    // await connection.manager.save(compositionCO2);

    // let compositionC = new Composition();
    // compositionC.id;
    // compositionC.composition = "C";
    // compositionC.name = "Carbon";
    // await connection.manager.save(compositionC);

    // let compositionO2 = new Composition();
    // compositionO2.id;
    // compositionO2.composition = "O2";
    // compositionO2.name = "Oxygen";
    // await connection.manager.save(compositionO2);

    // let compositionN2 = new Composition();
    // compositionN2.id;
    // compositionN2.composition = "N2";
    // compositionN2.name = "N2";
    // await connection.manager.save(compositionN2);

    // let compositionNH3 = new Composition();
    // compositionNH3.id;
    // compositionNH3.composition = "NH3";
    // compositionNH3.name = "NH3";
    // await connection.manager.save(compositionNH3);

    // // Materials below this line

    // let materialC = new Material();
    // materialC.id;
    // materialC.compositionId = compositionC.id;
    // materialC.details = "Carbon, Graphite, Pressed Graphite";
    // await connection.manager.save(materialC);

    // let materialCO2 = new Material();
    // materialCO2.id;
    // materialCO2.compositionId = compositionCO2.id;
    // materialCO2.details;
    // await connection.manager.save(materialCO2);

    // let materialO2 = new Material();
    // materialO2.id;
    // materialO2.compositionId = compositionO2.id;
    // materialO2.details;
    // await connection.manager.save(materialO2);

    // let materialN2 = new Material();
    // materialN2.id;
    // materialN2.compositionId = compositionN2.id;
    // materialN2.details;
    // await connection.manager.save(materialN2);

    // let materialNH3 = new Material();
    // materialNH3.id;
    // materialNH3.compositionId = compositionNH3.id;
    // materialNH3.details;
    // await connection.manager.save(materialNH3);

    // // Categories below this line

    // let category = new Category();
    // category.id;
    // category.name = "Cell Size";
    // await connection.manager.save(category);

    // // Subcategories below this line

    // let subcategory = new Subcategory();
    // subcategory.id;
    // subcategory.name = "Width";
    // await connection.manager.save(subcategory);

    // // Data set data types below this line

    // let datasetdatatypeError = new Datasetdatatype();
    // datasetdatatypeError.id = 1;
    // datasetdatatypeError.name = "MISSING DATASET DATA TYPE";
    // await connection.manager.save(datasetdatatypeError);

    // let datasetdatatypeNone = new Datasetdatatype();
    // datasetdatatypeNone.id;
    // datasetdatatypeNone.name = "Not Specified";
    // await connection.manager.save(datasetdatatypeNone);

    // let datasetdatatype = new Datasetdatatype();
    // datasetdatatype.id;
    // datasetdatatype.name = "Hugoniot";
    // await connection.manager.save(datasetdatatype);

    // // Data sets below this line

    // let dataset = new Dataset();
    // dataset.id;
    // dataset.name = "CARBON, graphite, pressed, Initial density = 2.13 g/cc";
    // dataset.datatypeId = datasetdatatype.id;
    // dataset.publicationId = publication.id;
    // dataset.categoryId;
    // dataset.subcategoryId;
    // dataset.materials = [materialC];
    // dataset.comments = "References 5,6,14\nAverage density = 2.134 g/cc";
    // await connection.manager.save(dataset);
    // console.log("First dataset saved.");

    // // First entry taken from: https://shepherd.caltech.edu/detn_db/html/db_125.html
    // let dataset2 = new Dataset();
    // dataset2.id;
    // dataset2.name = "Detonations in H_2-N_2O-CH_4-NH_3-O_2-N_2 mixtures";
    // dataset2.datatypeId = datasetdatatypeNone.id;
    // dataset2.publicationId = publication2.id;
    // dataset2.categoryId = category.id;
    // dataset2.subcategoryId = subcategory.id;
    // dataset2.materials = [materialNH3, materialO2, materialN2];
    // dataset2.comments;
    // await connection.manager.save(dataset2);
    // console.log("Second dataset saved.");

    // // Units below this line

    // let unitsNone = new Units();
    // unitsNone.id;
    // unitsNone.name = "No Units";
    // unitsNone.units = "No Units";
    // await connection.manager.save(unitsNone);

    // let unitsGCC = new Units();
    // unitsGCC.id;
    // unitsGCC.name = "g/cc";
    // unitsGCC.units = "g/cc";
    // await connection.manager.save(unitsGCC);

    // let unitsCCG = new Units();
    // unitsCCG.id;
    // unitsCCG.name = "cc/g";
    // unitsCCG.units = "cc/g";
    // await connection.manager.save(unitsCCG);

    // let unitsKelvin = new Units();
    // unitsKelvin.id;
    // unitsKelvin.name = "Kelvin";
    // unitsKelvin.units = "K";
    // await connection.manager.save(unitsKelvin);

    // let unitsGigapascal = new Units();
    // unitsGigapascal.id;
    // unitsGigapascal.name = "Gigapascal";
    // unitsGigapascal.units = "GPa";
    // await connection.manager.save(unitsGigapascal);

    // let unitsKMPS = new Units();
    // unitsKMPS.id;
    // unitsKMPS.name = "Kilometers per Second";
    // unitsKMPS.units = "km/s";
    // await connection.manager.save(unitsKMPS);

    // let unitsPercent = new Units();
    // unitsPercent.id;
    // unitsPercent.name = "Percent";
    // unitsPercent.units = "%";
    // await connection.manager.save(unitsPercent);

    // let unitsMM = new Units();
    // unitsMM.id;
    // unitsMM.name = "Millimetres";
    // unitsMM.units = "mm";
    // await connection.manager.save(unitsMM);

    // // Representations below this line
    // let reprRho0 = new Representations();
    // reprRho0.id;
    // reprRho0.repr = "rho_0";
    // await connection.manager.save(reprRho0);

    // let reprT0 = new Representations();
    // reprT0.id;
    // reprT0.repr = "T_0";
    // await connection.manager.save(reprT0);

    // let reprP0 = new Representations();
    // reprP0.id;
    // reprP0.repr = "P_0";
    // await connection.manager.save(reprP0);

    // let reprUs = new Representations();
    // reprUs.id;
    // reprUs.repr = "U_s";
    // await connection.manager.save(reprUs);

    // let reprUp = new Representations();
    // reprUp.id;
    // reprUp.repr = "U_p";
    // await connection.manager.save(reprUp);

    // let reprP = new Representations();
    // reprP.id;
    // reprP.repr = "P";
    // await connection.manager.save(reprP);

    // let reprV = new Representations();
    // reprV.id;
    // reprV.repr = "v";
    // await connection.manager.save(reprV);

    // let reprRho = new Representations();
    // reprRho.id;
    // reprRho.repr = "rho";
    // await connection.manager.save(reprRho);

    // let reprCompRatio = new Representations();
    // reprCompRatio.id;
    // reprCompRatio.repr = "v/v_0";
    // await connection.manager.save(reprCompRatio);

    // // Data points and data point comments below this line

    // let datapoint = new Datapoints();
    // datapoint.id;
    // datapoint.datasetId = dataset.id;
    // datapoint.name = "Initial Density";
    // datapoint.values = [2.113, 2.123, 2.123, 2.143, 2.141, 2.146, 2.142, 2.134, 2.135, 2.136, 2.136];
    // datapoint.unitsId = unitsGCC.id;
    // datapoint.representationsId = reprRho0.id;
    // await connection.manager.save(datapoint);

    // let datapoint2 = new Datapoints();
    // datapoint2.id;
    // datapoint2.datasetId = dataset.id;
    // datapoint2.name = "Initial Temperature";
    // datapoint2.values = [273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15];
    // datapoint2.unitsId = unitsKelvin.id;
    // datapoint2.representationsId = reprT0.id;
    // await connection.manager.save(datapoint2);

    // let datapoint3 = new Datapoints();
    // datapoint3.id;
    // datapoint3.datasetId = dataset.id;
    // datapoint3.name = "Initial Pressure";
    // datapoint3.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // datapoint3.unitsId = unitsGigapascal.id;
    // datapoint3.representationsId = reprP0.id;
    // await connection.manager.save(datapoint3);

    // let datapoint4 = new Datapoints();
    // datapoint4.id;
    // datapoint4.datasetId = dataset.id;
    // datapoint4.name = "Shock Velocity";
    // datapoint4.values = [5.235, 6.013, 6.320, 6.551, 6.704, 7.960, 8.762, 8.836, 9.208, 9.627, 9.556];
    // datapoint4.unitsId = unitsKMPS.id;
    // datapoint4.representationsId = reprUs.id;
    // await connection.manager.save(datapoint4);

    // let datapoint5 = new Datapoints();
    // datapoint5.id;
    // datapoint5.datasetId = dataset.id;
    // datapoint5.name = "Particle Velocity";
    // datapoint5.values = [1.026, 1.380, 1.972, 2.607, 2.779, 3.370, 3.748, 3.801, 3.948, 4.138, 4.290];
    // datapoint5.unitsId = unitsKMPS.id;
    // datapoint5.representationsId = reprUp.id;
    // await connection.manager.save(datapoint5);

    // let datapoint6 = new Datapoints();
    // datapoint6.id;
    // datapoint6.datasetId = dataset.id;
    // datapoint6.name = "Pressure";
    // datapoint6.values = [11.349, 17.617, 26.459, 36.599, 39.888, 57.567, 70.343, 71.672, 77.614, 85.091, 87.657];
    // datapoint6.unitsId = unitsGigapascal.id;
    // datapoint6.representationsId = reprP.id;
    // await connection.manager.save(datapoint6);

    // let datapoint7 = new Datapoints();
    // datapoint7.id;
    // datapoint7.datasetId = dataset.id;
    // datapoint7.name = "Specific Volume";
    // datapoint7.values = [0.3805, 0.3629, 0.3241, 0.2809, 0.2735, 0.2687, 0.2672, 0.2670, 0.2676, 0.2669, 0.2582];
    // datapoint7.unitsId = unitsCCG.id;
    // datapoint7.representationsId = reprV.id;
    // await connection.manager.save(datapoint7);

    // let datapoint8 = new Datapoints();
    // datapoint8.id;
    // datapoint8.datasetId = dataset.id;
    // datapoint8.name = "Density";
    // datapoint8.values = [2.628, 2.755, 3.086, 3.560, 3.657, 3.722, 3.743, 3.745, 3.737, 3.746, 3.873];
    // datapoint8.unitsId = unitsGCC.id;
    // datapoint8.representationsId = reprRho.id;
    // await connection.manager.save(datapoint8);

    // let datapoint9 = new Datapoints();
    // datapoint9.id;
    // datapoint9.datasetId = dataset.id;
    // datapoint9.name = "Compression Ratio";
    // datapoint9.values = [0.804, 0.770, 0.688, 0.602, 0.585, 0.577, 0.572, 0.570, 0.571, 0.570, 0.552];
    // datapoint9.unitsId = unitsNone.id;
    // datapoint9.representationsId = reprCompRatio.id;
    // await connection.manager.save(datapoint9);

    // let datapointcomments = new Datapointcomments();
    // datapointcomments.id;
    // datapointcomments.datasetId = dataset.id;
    // datapointcomments.comments = ["im1", "im1", "im1", "im1", "im1", "im1", "im1", "im1", "im1", "im1", "im1", "im1"];
    // await connection.manager.save(datapointcomments);

    // let datapoint10 = new Datapoints();
    // datapoint10.id;
    // datapoint10.datasetId = dataset2.id;
    // datapoint10.name = "Equivilence Ratio";
    // datapoint10.values = [0.0, 1.3, 1.6, 2.2, 2.5, 3.4];
    // datapoint10.unitsId = unitsNone.id;
    // datapoint10.representationsId;
    // await connection.manager.save(datapoint10);

    // let datapoint11 = new Datapoints();
    // datapoint11.id;
    // datapoint11.datasetId = dataset2.id;
    // datapoint11.name = "Cell Width";
    // datapoint11.values = [25.5, 30.0, 36.5, 60.0, 50.5, 102.0];
    // datapoint11.unitsId = unitsMM.id;
    // datapoint11.representationsId;
    // await connection.manager.save(datapoint11);

    // console.log("All data entered");

    // End element insertion

    /**
     * Testing finding an element
     */
    // let savedAnime = await connection.manager.find(AnimeRank, { title: "Promised Neverland"});
    //console.log(savedAnime);


    /* Testing queries, to be moved elsewhere
    let testing = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('publication.name', 'publication_name')
      .addSelect('publicationtype.name', 'publicationtype_name')
      .addSelect('author.firstName', 'author_firstName')
      .addSelect('author.lastName', 'author_lastName')
      .addSelect('author.middleName', 'author_middleName')
      .leftJoin('publication.authors', 'author')
      .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
      .getRawMany();

    console.log(testing);

    let testing2 = await connection.manager
      .createQueryBuilder(Publications, 'publication')
      .select('publication.name', 'publication_name')
      .addSelect('publicationtype.name', 'publicationtype_name')
      .addSelect('author.firstName', 'author_firstName')
      .addSelect('author.lastName', 'author_lastName')
      .addSelect('author.middleName', 'author_middleName')
      .innerJoin('publication.authors', 'author')
      .innerJoin(Publicationtype, 'publicationtype', 'publication.publicationtypeId = publicationtype.id')
      .getRawMany();

    console.log(testing2);
    */

  })
};