import { MigrationInterface, QueryRunner, getConnection } from "typeorm";

import { Accounts } from "../models/entities/Accounts";
import { AuthenticationService } from '../services/authenticationService';
import { Authors } from "../models/entities/Authors";
import { Category } from "../models/entities/Category";
import { Composition } from "../models/entities/Composition";
import { Datapointcomments } from "../models/entities/Datapointcomments";
import { Datapoints } from "../models/entities/Datapoints";
import { Dataset } from "../models/entities/Dataset";
import { Datasetdatatype } from "../models/entities/Datasetdatatype";
import { Graphstate } from "../models/entities/Graphstate";
import { Material } from "../models/entities/Material";
import { Publications } from "../models/entities/Publications";
import { Publicationtype } from "../models/entities/Publicationtype";
import { Publisher } from "../models/entities/Publisher";
import { Subcategory } from "../models/entities/Subcategory";
import { Unapproveddatasets } from "../models/entities/Unapproveddatasets";
import { Dimension } from "../models/entities/Dimension";
import { Units } from "../models/entities/Units";

export class SeedDatabase1611943920000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // Accounts Data
    let authenticationService = new AuthenticationService();

    let user1 = new Accounts();
    user1.id = 1;
    user1.email = 'j@kj.com';
    user1.password = await authenticationService.hashPassword('Abc12345!') as any;
    user1.firstName = 'Ace';
    user1.lastName = 'FireFist';
    user1.orcID = 123456789876543;
    user1.organizationName = 'Mugiwara';
    user1.admin = 1;

    let user2 = new Accounts();
    user2.id = 2;
    user2.email = 'test@t.com';
    user2.password = await authenticationService.hashPassword('123') as any;
    user2.firstName = 'Tom';
    user2.lastName = 'Happy';
    user2.orcID = 123456789876543;
    user2.organizationName = 'Mobil';
    user2.admin;

    let user3 = new Accounts();
    user3.id = 3;
    user3.email = 'tester@123.com';
    user3.password = await authenticationService.hashPassword('123') as any;
    user3.firstName = 'Wyatt';
    user3.lastName = 'forfore';
    user3.orcID = 123456789876543;
    user3.organizationName = 'Ozark';
    user3.admin = 1;

    let user4 = new Accounts();
    user4.id = 4;
    user4.email = 'admin@potential.com';
    user4.password = await authenticationService.hashPassword('123') as any;
    user4.firstName = 'Admin';
    user4.lastName = 'Manage';
    user4.orcID = 123456789876543;
    user4.organizationName = 'Ozark';
    user4.admin = 0;

    await Accounts.save([user4, user3, user2, user1]);

    let book = new Publicationtype();
    book.id;
    book.name = "Book";

    let toDelete = new Publicationtype();
    toDelete.id;
    toDelete.name = "Report";

    await Publicationtype.save([toDelete, book]);

    let publisherName = new Publisher();
    publisherName.id;
    publisherName.name = "University of California Press";

    let publisherNameToDelete = new Publisher();
    publisherNameToDelete.id;
    publisherNameToDelete.name = "Deleted Press";

    await Publisher.save([publisherNameToDelete, publisherName]);

    let author1 = new Authors();
    author1.id;
    author1.firstName = "Stanley";
    author1.lastName = "Marsh";
    author1.middleName = "P.";

    let author2 = new Authors();
    author2.id;
    author2.firstName = "John";
    author2.lastName = "Mclain";
    author2.middleName = "L.";

    let author3 = new Authors();
    author3.id;
    author3.firstName = "Alex";
    author3.lastName = "Grail";
    author3.middleName = "P.";

    let author4 = new Authors();
    author4.id;
    author4.firstName = "Jack";
    author4.lastName = "Mclain";
    author4.middleName;

    await Authors.save([author1, author2, author3, author4]);

    let publication = new Publications();
    publication.id = 1;
    publication.name = "LASL shock Hugoniot data";
    publication.pages = "100";
    publication.publicationtypeId = book.id;
    publication.publisherId = publisherName.id;
    publication.year = 1980;
    publication.volume = 5;
    publication.authors = [author1, author2];

    let publication2 = new Publications();
    publication2.id;
    publication2.name = "Someone's Favorite Publisher";
    publication2.pages;
    publication2.publicationtypeId = book.id;
    publication2.publisherId = publisherName.id;
    publication2.year = 1900;
    publication2.volume;
    publication2.authors = [];

    let publication3 = new Publications();
    publication3.id;
    publication3.name = "Unapproved Publication";
    publication3.pages = "100";
    publication3.publicationtypeId = book.id;
    publication3.publisherId = publisherName.id;
    publication3.year = 1980;
    publication3.volume = 5;
    publication3.authors = [];

    let publicationToDelete = new Publications();
    publicationToDelete.id;
    publicationToDelete.name = "Publication To Delete";
    publicationToDelete.pages = "100";
    publicationToDelete.publicationtypeId = toDelete.id;
    publicationToDelete.publisherId = publisherNameToDelete.id;
    publicationToDelete.year = 1980;
    publicationToDelete.volume = 5;
    publicationToDelete.authors = [author3, author4];

    let publicationToDelete2 = new Publications();
    publicationToDelete2.id;
    publicationToDelete2.name = "Publication To Delete";
    publicationToDelete2.pages = "100";
    publicationToDelete2.publicationtypeId = toDelete.id;
    publicationToDelete2.publisherId = publisherNameToDelete.id;
    publicationToDelete2.year = 1980;
    publicationToDelete2.volume = 5;
    publicationToDelete2.authors = [author3, author4];

    let publicationToDelete3 = new Publications();
    publicationToDelete3.id;
    publicationToDelete3.name = "Publication To Delete";
    publicationToDelete3.pages = "100";
    publicationToDelete3.publicationtypeId = toDelete.id;
    publicationToDelete3.publisherId = publisherNameToDelete.id;
    publicationToDelete3.year = 1980;
    publicationToDelete3.volume = 5;
    publicationToDelete3.authors = [author3, author4];

    await Publications.save([publicationToDelete3, publicationToDelete2, publicationToDelete,
      publication3, publication2, publication]);

    let compositionC = new Composition();
    compositionC.id;
    compositionC.composition = "C";

    let compositionO2 = new Composition();
    compositionO2.id;
    compositionO2.composition = "O2";

    let compositionToDelete = new Composition();
    compositionToDelete.id = 5;
    compositionToDelete.composition = "To Delete";

    await Composition.save([compositionC, compositionO2, compositionToDelete]);

    let materialC = new Material();
    materialC.id;
    materialC.compositionId = compositionC.id;
    materialC.details = "carbon, graphite, pressed graphite";

    let materialO2 = new Material();
    materialO2.id;
    materialO2.compositionId = compositionO2.id;
    materialO2.details = "Oxygen";

    let materialToDelete = new Material();
    materialToDelete.id = 5;
    materialToDelete.compositionId = 5;
    materialToDelete.details = "Going into the void";

    await Material.save([materialC, materialO2, materialToDelete]);

    let category1 = new Category();
    category1.id = 1;
    category1.name = "None Entered";

    let category = new Category();
    category.id = 2;
    category.name = "cell size";

    let categoryToEdit = new Category();
    categoryToEdit.id = 3;
    categoryToEdit.name = "category";

    let categoryToDelete = new Category();
    categoryToDelete.id = 4;
    categoryToDelete.name = "delete this category";

    await Category.save([categoryToDelete, categoryToEdit, category, category1]);

    let subcategory1 = new Subcategory();
    subcategory1.id = 1;
    subcategory1.name = "None Entered";
    subcategory1.categoryId = 1;

    let subcategory = new Subcategory();
    subcategory.id = 2;
    subcategory.name = "width";
    subcategory.categoryId = 2;

    let subcategoryToEdit = new Subcategory();
    subcategoryToEdit.id = 3;
    subcategoryToEdit.name = "subcategory";
    subcategoryToEdit.categoryId = 3;

    await Subcategory.save([subcategoryToEdit, subcategory, subcategory1]);

    let datasetdatatypeNone = new Datasetdatatype();
    datasetdatatypeNone.id;
    datasetdatatypeNone.name = "Not Specified";

    let datasetdatatype = new Datasetdatatype();
    datasetdatatype.id;
    datasetdatatype.name = "Hugoniot";

    let datasetdatatypeToDelete = new Datasetdatatype();
    datasetdatatypeToDelete.id;
    datasetdatatypeToDelete.name = "Deletion";

    await Datasetdatatype.save([datasetdatatypeNone, datasetdatatype, datasetdatatypeToDelete]);

    let dataset = new Dataset();
    dataset.id = 1;
    dataset.name = "CARBON, graphite, pressed, Initial density = 2.13 g/cc";
    dataset.datatypeId = datasetdatatype.id;
    dataset.publicationId = 1;
    dataset.subcategoryId = subcategory.id;
    dataset.comments = "References 5,6,14\nAverage density = 2.134 g/cc";
    dataset.materials = [materialC, materialO2];
    dataset.uploaderId = 1;

    let unapproveddataset = new Unapproveddatasets();
    unapproveddataset.datasetId = 1;
    unapproveddataset.flaggedComment = "Is there a spelling error in the first author's name?";
    unapproveddataset.isFlagged = 1;

    let dataset2 = new Dataset();
    dataset2.id = 2;
    dataset2.name = "Someone's Favorite";
    dataset2.datatypeId = datasetdatatypeNone.id;
    dataset2.publicationId = publication2.id;
    dataset2.subcategoryId = subcategory1.id;
    dataset2.comments = "";
    dataset2.materials = [];
    dataset2.uploaderId = 3;
    dataset2.isApproved = 1;

    let dataset3 = new Dataset();
    let unapproveddataset3 = new Unapproveddatasets();
    dataset3.id = 5;
    dataset3.name = "An unapproved dataset";
    dataset3.datatypeId = datasetdatatype.id;
    dataset3.publicationId = publication3.id;
    dataset3.subcategoryId = subcategory.id;
    dataset3.comments = null;
    dataset3.materials = [];
    dataset3.uploaderId = 2;

    unapproveddataset3.datasetId = 5;
    unapproveddataset3.flaggedComment = null;
    unapproveddataset3.isFlagged = 0;

    let dataset4 = new Dataset();
    let unapproveddataset4 = new Unapproveddatasets();
    dataset4.id = 6;
    dataset4.name = "An unapproved dataset";
    dataset4.datatypeId = datasetdatatype.id;
    dataset4.publicationId = publication3.id;
    dataset4.subcategoryId = subcategory.id;
    dataset4.comments = null;
    dataset4.materials = [];
    dataset4.uploaderId = 2;

    unapproveddataset4.datasetId = 6;
    unapproveddataset4.flaggedComment = null;
    unapproveddataset4.isFlagged = 0;

    let dataset5 = new Dataset();
    let unapproveddataset5 = new Unapproveddatasets();
    dataset5.id = 7;
    dataset5.name = "An unapproved dataset";
    dataset5.datatypeId = datasetdatatype.id;
    dataset5.publicationId = publicationToDelete2.id;
    dataset5.subcategoryId = subcategory.id;
    dataset5.comments = null;
    dataset5.materials = [];
    dataset5.uploaderId = 2;

    unapproveddataset5.datasetId = 7;
    unapproveddataset5.flaggedComment = null;
    unapproveddataset5.isFlagged = 0;

    let dataset6 = new Dataset();
    let unapproveddataset6 = new Unapproveddatasets();
    dataset6.id = 70;
    dataset6.name = "An unapproved dataset";
    dataset6.datatypeId = datasetdatatypeToDelete.id;
    dataset6.publicationId = publicationToDelete.id;
    dataset6.subcategoryId = subcategory.id;
    dataset6.comments = null;
    dataset6.materials = [materialToDelete];
    dataset6.uploaderId = 2;

    unapproveddataset6.datasetId = 70;
    unapproveddataset6.flaggedComment = null;
    unapproveddataset6.isFlagged = 0;

    let dataset7 = new Dataset();
    let unapproveddataset7 = new Unapproveddatasets();
    dataset7.id = 8;
    dataset7.name = "An unapproved dataset";
    dataset7.datatypeId = datasetdatatype.id;
    dataset7.publicationId = publication3.id;
    dataset7.subcategoryId = subcategory.id;
    dataset7.comments = null;
    dataset7.materials = [];
    dataset7.uploaderId = 2;

    unapproveddataset7.datasetId = 8;
    unapproveddataset7.flaggedComment = null;
    unapproveddataset7.isFlagged = 1;

    let dataset8 = new Dataset();
    let unapproveddataset8 = new Unapproveddatasets();
    dataset8.id = 9;
    dataset8.name = "An unapproved dataset";
    dataset8.datatypeId = datasetdatatype.id;
    dataset8.publicationId = publication3.id;
    dataset8.subcategoryId = subcategory.id;
    dataset8.comments = null;
    dataset8.materials = [];
    dataset8.uploaderId = 1;

    unapproveddataset8.datasetId = 9;
    unapproveddataset8.flaggedComment = null;
    unapproveddataset8.isFlagged = 1;

    let dataset9 = new Dataset();
    let unapproveddataset9 = new Unapproveddatasets();
    dataset9.id = 10;
    dataset9.name = "An unapproved dataset";
    dataset9.datatypeId = datasetdatatype.id;
    dataset9.publicationId = publicationToDelete3.id;
    dataset9.subcategoryId = subcategory.id;
    dataset9.comments = null;
    dataset9.materials = [];
    dataset9.uploaderId = 1;

    unapproveddataset9.datasetId = 10;
    unapproveddataset9.flaggedComment = null;
    unapproveddataset9.isFlagged = 0;

    let dataset10 = new Dataset();
    let unapproveddataset10 = new Unapproveddatasets();
    dataset10.id = 11;
    dataset10.name = "An unapproved dataset";
    dataset10.datatypeId = datasetdatatype.id;
    dataset10.publicationId = publication3.id;
    dataset10.subcategoryId = subcategory.id;
    dataset10.comments = null;
    dataset10.materials = [];
    dataset10.uploaderId = 1;

    unapproveddataset10.datasetId = 11;
    unapproveddataset10.flaggedComment = null;
    unapproveddataset10.isFlagged = 0;

    let dataset11 = new Dataset();
    let unapproveddataset11 = new Unapproveddatasets();
    dataset11.id = 12;
    dataset11.name = "An unapproved dataset";
    dataset11.datatypeId = datasetdatatype.id;
    dataset11.publicationId = publication3.id;
    dataset11.subcategoryId = subcategory.id;
    dataset11.comments = null;
    dataset11.materials = [];
    dataset11.uploaderId = 1;

    unapproveddataset11.datasetId = 12;
    unapproveddataset11.flaggedComment = null;
    unapproveddataset11.isFlagged = 1;

    let dataset12 = new Dataset();
    let unapproveddataset12 = new Unapproveddatasets();
    dataset12.id = 13;
    dataset12.name = "An unapproved dataset";
    dataset12.datatypeId = datasetdatatype.id;
    dataset12.publicationId = publication3.id;
    dataset12.subcategoryId = subcategory.id;
    dataset12.comments = null;
    dataset12.materials = [];
    dataset12.uploaderId = 2;

    unapproveddataset12.datasetId = 13;
    unapproveddataset12.flaggedComment = null;
    unapproveddataset12.isFlagged = 1;

    let dataset13 = new Dataset();
    let unapproveddataset13 = new Unapproveddatasets();
    dataset13.id = 14;
    dataset13.name = "An unapproved dataset";
    dataset13.datatypeId = datasetdatatype.id;
    dataset13.publicationId = publication3.id;
    dataset13.subcategoryId = subcategory.id;
    dataset13.comments = null;
    dataset13.materials = [];
    dataset13.uploaderId = 2;

    unapproveddataset13.datasetId = 14;
    unapproveddataset13.flaggedComment = null;
    unapproveddataset13.isFlagged = 0;

    let dataset14 = new Dataset();
    let unapproveddataset14 = new Unapproveddatasets();
    dataset14.id = 15;
    dataset14.name = "An unapproved dataset";
    dataset14.datatypeId = datasetdatatype.id;
    dataset14.publicationId = publication3.id;
    dataset14.subcategoryId = subcategory.id;
    dataset14.comments = null;
    dataset14.materials = [];
    dataset14.uploaderId = 2;

    unapproveddataset14.datasetId = 15;
    unapproveddataset14.flaggedComment = null;
    unapproveddataset14.isFlagged = 0;

    let dataset15 = new Dataset();
    let unapproveddataset15 = new Unapproveddatasets();
    dataset15.id = 16;
    dataset15.name = "An unapproved dataset";
    dataset15.datatypeId = datasetdatatype.id;
    dataset15.publicationId = publication3.id;
    dataset15.subcategoryId = subcategory.id;
    dataset15.comments = null;
    dataset15.materials = [];
    dataset15.uploaderId = 1;

    unapproveddataset15.datasetId = 16;
    unapproveddataset15.flaggedComment = null;
    unapproveddataset15.isFlagged = 0;

    let dataset16 = new Dataset();
    let unapproveddataset16 = new Unapproveddatasets();
    dataset16.id = 17;
    dataset16.name = "An unapproved dataset";
    dataset16.datatypeId = datasetdatatype.id;
    dataset16.publicationId = publication3.id;
    dataset16.subcategoryId = subcategory.id;
    dataset16.comments = null;
    dataset16.materials = [];
    dataset16.uploaderId = 1;

    unapproveddataset16.datasetId = 17;
    unapproveddataset16.flaggedComment = null;
    unapproveddataset16.isFlagged = 0;

    let dataset17 = new Dataset();
    let unapproveddataset17 = new Unapproveddatasets();
    dataset17.id = 18;
    dataset17.name = "An unapproved dataset";
    dataset17.datatypeId = datasetdatatype.id;
    dataset17.publicationId = publication3.id;
    dataset17.subcategoryId = subcategory.id;
    dataset17.comments = null;
    dataset17.materials = [];
    dataset17.uploaderId = 1;

    unapproveddataset17.datasetId = 18;
    unapproveddataset17.flaggedComment = null;
    unapproveddataset17.isFlagged = 0;

    let dataset18 = new Dataset();
    let unapproveddataset18 = new Unapproveddatasets();
    dataset18.id = 19;
    dataset18.name = "An unapproved dataset";
    dataset18.datatypeId = datasetdatatype.id;
    dataset18.publicationId = publication3.id;
    dataset18.subcategoryId = subcategory.id;
    dataset18.comments = null;
    dataset18.materials = [];
    dataset18.uploaderId = 1;

    unapproveddataset18.datasetId = 19;
    unapproveddataset18.flaggedComment = null;
    unapproveddataset18.isFlagged = 1;

    await Dataset.save([dataset, dataset2, dataset3, dataset4, dataset5, dataset6, dataset7, dataset8,
      dataset9, dataset10, dataset11, dataset12, dataset13, dataset14, dataset15, dataset16, dataset17,
      dataset18]);

    await Unapproveddatasets.save([unapproveddataset, unapproveddataset3, unapproveddataset4, unapproveddataset5,
      unapproveddataset6, unapproveddataset7, unapproveddataset8, unapproveddataset9, unapproveddataset10,
      unapproveddataset11, unapproveddataset12, unapproveddataset13, unapproveddataset14, unapproveddataset15,
      unapproveddataset16, unapproveddataset17, unapproveddataset18]);

    // Units below this line

    let temperatureDimension = new Dimension();
    temperatureDimension.id = 1;
    temperatureDimension.name = "Temperature";

    let densityDimension = new Dimension();
    densityDimension.id = 2;
    densityDimension.name = "Density";

    let deleteDimension = new Dimension();
    deleteDimension.id = 3;
    deleteDimension.name = "Delete";

    let deleteDimension2 = new Dimension();
    deleteDimension2.id = 4;
    deleteDimension2.name = "Delete No Units In Use";
    await Dimension.save([temperatureDimension, densityDimension, deleteDimension, deleteDimension2]);

    let unitsGCC = new Units();
    unitsGCC.id = 1;
    unitsGCC.conversionFormula = "{u}";
    unitsGCC.dimensionId = 2;
    unitsGCC.name = "g/cc";

    let unitsNone = new Units();
    unitsNone.id = 2;
    unitsNone.conversionFormula = "{u}";
    unitsNone.dimensionId = 1;
    unitsNone.name = "No Units";

    let unitsCCG = new Units();
    unitsCCG.id = 3;
    unitsCCG.conversionFormula = "{u}";
    unitsCCG.dimensionId = 2;
    unitsCCG.name = "cc/g";

    let unitsKelvin = new Units();
    unitsKelvin.id = 4;
    unitsKelvin.conversionFormula = "{u}";
    unitsKelvin.dimensionId = 1;
    unitsKelvin.name = "K";

    let unitsGigapascal = new Units();
    unitsGigapascal.id = 5;
    unitsGigapascal.conversionFormula = "{u}";
    unitsGigapascal.dimensionId = 2;
    unitsGigapascal.name = "GPa";

    let unitsKMPS = new Units();
    unitsKMPS.id = 6;
    unitsKMPS.conversionFormula = "{u}";
    unitsKMPS.dimensionId = 2;
    unitsKMPS.name = "km/s";

    let unitsToDelete = new Units();
    unitsToDelete.id = 7;
    unitsToDelete.conversionFormula = "{u}";
    unitsToDelete.dimensionId = 3;
    unitsToDelete.name = "Deleted";

    let unitsToDelete2 = new Units();
    unitsToDelete2.id = 10;
    unitsToDelete2.conversionFormula = "{u}";
    unitsToDelete2.dimensionId = 4;
    unitsToDelete2.name = "To delete";

    await Units.save([unitsNone, unitsCCG, unitsGCC, unitsToDelete, unitsKMPS, unitsGigapascal, unitsKelvin, unitsToDelete2])
    densityDimension.baseUnitId = unitsGCC.id;
    temperatureDimension.baseUnitId = unitsKelvin.id;
    deleteDimension.baseUnitId = unitsToDelete.id;
    await Dimension.save([temperatureDimension, densityDimension]);

    // Data points below this line. 

    let datapointComments = new Datapointcomments();
    datapointComments.id;
    datapointComments.datasetId = 1;
    datapointComments.comments = ["im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478", "im5478"];
    await Datapointcomments.save(datapointComments);

    let datapoint = new Datapoints();
    datapoint.id;
    datapoint.datasetId = 1;
    datapoint.name = "Initial Density";
    datapoint.values = [2.113, 2.123, 2.123, 2.143, 2.141, 2.146, 2.142, 2.134, 2.135, 2.136, 2.136];
    datapoint.unitsId = unitsGCC.id;

    let datapoint2 = new Datapoints();
    datapoint2.id;
    datapoint2.datasetId = 1;
    datapoint2.name = "Initial Temperature";
    datapoint2.values = [273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15, 273.15];
    datapoint2.unitsId = unitsKelvin.id;

    let datapoint3 = new Datapoints();
    datapoint3.id;
    datapoint3.datasetId = 1;
    datapoint3.name = "Initial Pressure";
    datapoint3.values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    datapoint3.unitsId = unitsGigapascal.id;

    let datapoint4 = new Datapoints();
    datapoint4.id;
    datapoint4.datasetId = 1;
    datapoint4.name = "Shock Velocity";
    datapoint4.values = [5.235, 6.013, 6.320, 6.551, 6.704, 7.960, 8.762, 8.836, 9.208, 9.627, 9.556];
    datapoint4.unitsId = unitsKMPS.id;

    let datapoint5 = new Datapoints();
    datapoint5.id;
    datapoint5.datasetId = 1;
    datapoint5.name = "Particle Velocity";
    datapoint5.values = [1.026, 1.380, 1.972, 2.607, 2.779, 3.370, 3.748, 3.801, 3.948, 4.138, 4.290];
    datapoint5.unitsId = unitsKMPS.id;

    let datapoint6 = new Datapoints();
    datapoint6.id;
    datapoint6.datasetId = 1;
    datapoint6.name = "Pressure";
    datapoint6.values = [11.349, 17.617, 26.459, 36.599, 39.888, 57.567, 70.343, 71.672, 77.614, 85.091, 87.657];
    datapoint6.unitsId = unitsGigapascal.id;

    let datapoint7 = new Datapoints();
    datapoint7.id;
    datapoint7.datasetId = 1;
    datapoint7.name = "Specific Volume";
    datapoint7.values = [0.3805, 0.3629, 0.3241, 0.2809, 0.2735, 0.2687, 0.2672, 0.2670, 0.2676, 0.2669, 0.2582];
    datapoint7.unitsId = unitsCCG.id;

    let datapoint8 = new Datapoints();
    datapoint8.id;
    datapoint8.datasetId = 1;
    datapoint8.name = "Density";
    datapoint8.values = [2.628, 2.755, 3.086, 3.560, 3.657, 3.722, 3.743, 3.745, 3.737, 3.746, 3.873];
    datapoint8.unitsId = unitsGCC.id;

    let datapoint9 = new Datapoints();
    datapoint9.id;
    datapoint9.datasetId = 1;
    datapoint9.name = "Compression Ratio";
    datapoint9.values = [0.804, 0.770, 0.688, 0.602, 0.585, 0.577, 0.572, 0.570, 0.571, 0.570, 0.552];
    datapoint9.unitsId = unitsNone.id;

    let datapoint10 = new Datapoints();
    datapoint10.id;
    datapoint10.datasetId = 70;
    datapoint10.name = "Compression Ratio";
    datapoint10.values = [0.804, 0.770, 0.688, 0.602, 0.585, 0.577, 0.572, 0.570, 0.571, 0.570, 0.552];
    datapoint10.unitsId = unitsToDelete.id;

    await Datapoints.save([datapoint10, datapoint, datapoint2, datapoint3, datapoint4, datapoint5,
      datapoint6, datapoint7, datapoint8, datapoint9]);

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

    await Graphstate.save([newGraph, newGraph2]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // Unlink baseUnitId from Dimension
    let temperatureDimension = new Dimension();
    temperatureDimension.id = 1;
    temperatureDimension.name = "Temperature";
    temperatureDimension.baseUnitId = null;
    let densityDimension = new Dimension();
    densityDimension.id = 2;
    densityDimension.name = "Density";
    densityDimension.baseUnitId = null;
    await Dimension.save([temperatureDimension, densityDimension]);

    await queryRunner.query('DELETE FROM graphstate');
    await queryRunner.query('DELETE FROM unapproveddatasets');
    await queryRunner.query('DELETE FROM dataset_materials_material');
    await queryRunner.query('DELETE FROM publications_authors_authors');
    await queryRunner.query('DELETE FROM accounts_datasets_dataset');
    await queryRunner.query('DELETE FROM datapointcomments');
    await queryRunner.query('DELETE FROM datapoints');
    await queryRunner.query('DELETE FROM units');
    await queryRunner.query('DELETE FROM dimension');
    await queryRunner.query('DELETE FROM authors');
    await queryRunner.query('DELETE FROM dataset');
    await queryRunner.query('DELETE FROM publications');
    await queryRunner.query('DELETE FROM datasetdatatype');
    await queryRunner.query('DELETE FROM material');
    await queryRunner.query('DELETE FROM composition');
    await queryRunner.query('DELETE FROM subcategory');
    await queryRunner.query('DELETE FROM category');
    await queryRunner.query('DELETE FROM publisher');
    await queryRunner.query('DELETE FROM publicationtype');
    await queryRunner.query('DELETE FROM accounts');
    await queryRunner.query('ALTER TABLE accounts AUTO_INCREMENT = 1');
  }

}
