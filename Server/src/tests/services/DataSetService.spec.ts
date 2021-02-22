import { createConnection, getConnection } from 'typeorm';

import { DataSetService } from "../../services/DataSetService";
import { IApprovalDatasetModel } from "../../models/interfaces/DatasetModelInterface";
import { IDataRequestModel } from "../../models/interfaces/DataRequestModelInterface";

describe('data set service test', () => {
  let retrieveDataObject: DataSetService;
  jest.setTimeout(60000)

  beforeAll(async () => {
    await createConnection();
    retrieveDataObject = new DataSetService();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  test('Feeds data set ID of 1 and expects to see a data set with ID of 1 returned', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = [1];
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].dataset_id).toEqual(1);
    done()
  });

  test('Feeds year of 1980 and expects to see at least one data set with year of 1980 returned', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = 1980;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].publication.year).toEqual(1980);
    done()
  });

  test('Feeds material with composition O2 and a long detail string and expects to see those two materials', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = ["O2", "carbon, graphite, pressed graphite"];
    testData.year = undefined;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].materials[1])
      .toEqual(expect.objectContaining({ composition: "O2", details: "Oxygen" }));
    expect(arrayOfData[0].materials[0])
      .toEqual(expect.objectContaining({ composition: "C", details: "carbon, graphite, pressed graphite" }));
    done()
  });

  test('Feeds author info of "Stanley" and "Marsh" in correct order and expects to see the author named Stanley P. Marsh', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = "Stanley";
    testData.lastName = "Marsh";
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].publication.authors[0])
      .toEqual(expect.objectContaining({ firstName: "Stanley", lastName: "Marsh", middleName: "P." }));
    done()
  });

  test('Feeds author info of "Stanley" and "Marsh" in reverse order and expects to see the author named Stanley P. Marsh', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = "Marsh";
    testData.lastName = "Stanley";
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].publication.authors[0])
      .toEqual(expect.objectContaining({ firstName: "Stanley", lastName: "Marsh", middleName: "P." }));
    done()
  });

  test('Feeds last name of Marsh and expects to see the author named Stanley P. Marsh', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = undefined;
    testData.lastName = "Marsh";
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].publication.authors[0])
      .toEqual(expect.objectContaining({ firstName: "Stanley", lastName: "Marsh", middleName: "P." }));
    done()
  });

  test('Feeds category ID of 2 and expects to see a data set with category name of cell size returned', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = 2;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].dataset_info.category).toEqual("cell size");
    done()
  });

  test('Feeds category ID of 2 and subcategory of 2 and expects to see a data set with subcategory name of width returned', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = 2;
    testData.subcategoryId = 2;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].dataset_info.subcategory).toEqual("width");
    done()
  });

  test('Feeds material with composition C and a year of 1980 and expects to find a data set with these values', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = ["C"];
    testData.year = 1980;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData[0].publication.year).toEqual(1980);
    expect(arrayOfData[0].materials[0])
      .toEqual(expect.objectContaining({ composition: "C" }));
    done()
  });

  test('Feeds subcategory of 2 and expects to see an empty array returned', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = undefined;
    testData.lastName = undefined;
    testData.categoryId = undefined;
    testData.subcategoryId = 2;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData).toEqual(expect.arrayContaining([]));
    done()
  });

  test('Feeds first name of Stanley and expects to see an empty array returned', async done => {
    let testData: IDataRequestModel;
    testData = {} as any;
    testData.datasetId = undefined;
    testData.material = undefined;
    testData.year = undefined;
    testData.firstName = "Stanley";
    testData.lastName = undefined;
    testData.categoryId = undefined;
    testData.subcategoryId = undefined;
    let arrayOfData = await retrieveDataObject.getArrayOfDatasets(testData)
    expect(arrayOfData).toEqual(expect.arrayContaining([]));
    done()
  });

  test('Feeds account ID of 3 and expects to see an uploaded data set with ID of 2 returned', async done => {
    let response = await retrieveDataObject.getUserUploadedDatasets(3)
    let arrayOfData = response.message as unknown as IApprovalDatasetModel[]
    expect(arrayOfData[0].dataset_id).toEqual(2);
    done()
  });

  test('Feeds an account ID of 1 and expects to see a favorited data set IDs of 2 returned', async done => {
    let response = await retrieveDataObject.getUserFavoriteDatasets(1)
    let arrayOfData = response.message as unknown as IApprovalDatasetModel[]
    expect(arrayOfData[0].dataset_id).toEqual(2);
    done()
  });

  test('Feeds an invalid email and expects to see an error message', async done => {
    let response = await retrieveDataObject.getUserUploadedDatasets(-1)
    expect(response.message).toEqual([])
    done()
  });

  test('Feeds an invalid account and expects to see an empty return', async done => {
    let response = await retrieveDataObject.getUserFavoriteDatasets(-1)
    expect(response.message).toEqual([])
    done()
  });

  test('Sets data set with ID 5 as a favorite of account ID 1', async done => {
    let response = await retrieveDataObject.addUserFavoriteDataset(1, 5)
    expect(response.message).toEqual("Favorite data set successfully saved")
    done()
  });

  test('Sets data set with ID 5 as a favorite of account ID 1 a second time', async done => {
    let response = await retrieveDataObject.addUserFavoriteDataset(1, 5)
    expect(response.message).toEqual("Favorite data set is already saved")
    done()
  });

  test('Removes data set with ID 5 as a favorite of account ID 1', async done => {
    let response = await retrieveDataObject.removeUserFavoriteDataset(1, 5)
    expect(response.message).toEqual("User favorite data set successfully removed")
    done()
  });


  // test('Asks for all unapproved data sets, expects at least one data set', async done => {
  //   let response = await retrieveDataObject.getUnapprovedAllDatasets()
  //   expect(response.message[0]).not.toBeUndefined();
  //   expect(response.statusCode).toEqual(200);
  //   done()
  // });

  test('Asks for all flagged data sets expects a data set with ID of 1', async done => {
    let response = await retrieveDataObject.getAllFlaggedDatasets()
    let arrayOfData = response.message as unknown as IApprovalDatasetModel[]
    expect(arrayOfData[0].dataset_id).toEqual(1);
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Asks for all flagged data sets of account ID 1, expects a data set with ID of 1', async done => {
    let response = await retrieveDataObject.getUserFlaggedDatasets(1)
    let arrayOfData = response.message as unknown as IApprovalDatasetModel[]
    expect(arrayOfData[0].dataset_id).toEqual(1);
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Asks for all flagged data sets of non-existant user, expects an error', async done => {
    let response = await retrieveDataObject.getUserFlaggedDatasets(0)
    expect(response.message).toEqual([]);
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Flag an unapproved data set, with no additional comments', async done => {
    let response = await retrieveDataObject.flagNewDataset(5)
    expect(response.message).toEqual("Dataset Flagged!");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Flag an unapproved data set, with additional comments', async done => {
    let response = await retrieveDataObject.flagNewDataset(6, "Fix the title please", "Admin: Pretty good data set, 10/10")
    expect(response.message).toEqual("Dataset Flagged!");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Flag an unapproved data set, with additional comments', async done => {
    let response = await retrieveDataObject.flagNewDataset(6, "Fix the title please", "Admin: Pretty good data set, 10/10")
    expect(response.message).toEqual("Dataset Flagged!");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Invalid reject an unapproved data set', async () => {
    await expect(retrieveDataObject.adminRejectDataSet(0))
      .rejects
      .toThrow("No such data set exists");
  });

  test('Invalid reject an unapproved data set', async () => {
    await expect(retrieveDataObject.userRejectDataSet(0, 0))
      .rejects
      .toThrow("No such unapproved data set exists!");
  });

  test('Reject an unapproved data set', async done => {
    let response = await retrieveDataObject.adminRejectDataSet(7)
    expect(response.message).toEqual("Successfully removed data set");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Reject an unapproved data set', async done => {
    let response = await retrieveDataObject.adminRejectDataSet(70)
    expect(response.message).toEqual("Successfully removed data set");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Admin approves a data set, with additional comments', async done => {
    let response = await retrieveDataObject.adminApprovedDataset(5, "Admin: Pretty good data set, 10/10")
    expect(response.message).toEqual("Successfully approved new data set");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Admin approves a data set, with no additional comments', async done => {
    let response = await retrieveDataObject.adminApprovedDataset(6)
    expect(response.message).toEqual("Successfully approved new data set");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('User approves a data set', async done => {
    let response = await retrieveDataObject.userApprovedDataset(8, 2)
    expect(response.message).toEqual("Successfully approved new data set");
    expect(response.statusCode).toEqual(200);
    done()
  });

  test('Invalid user approves a data set request', async () => {
    await expect(retrieveDataObject.userApprovedDataset(0, 2))
      .rejects
      .toThrow("No such unapproved data set exists!");
  });
})