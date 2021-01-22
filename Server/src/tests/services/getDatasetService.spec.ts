import { retrieveData } from "../../services/getDatasetService";
import { IDataRequestModel } from "../../models/interfaces/DataRequestModelInterface";
import { createConnection, getConnection } from 'typeorm';

describe('data service test', () => {
  let retrieveDataObject: retrieveData;
  jest.setTimeout(60000)

  beforeAll(async () => {
    await createConnection();
    retrieveDataObject = new retrieveData();
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
    expect(arrayOfData[0].dataset[0].dataset_id).toEqual(1);
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
    expect(arrayOfData[0].publications[0].publication_year).toEqual(1980);
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
      .toEqual(expect.objectContaining({ composition_name: "O2", material_details: "Oxygen" }));
    expect(arrayOfData[0].materials[0])
      .toEqual(expect.objectContaining({ composition_name: "C", material_details: "carbon, graphite, pressed graphite" }));
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
    expect(arrayOfData[0].authors[0])
      .toEqual(expect.objectContaining({ author_firstName: "Stanley", author_lastName: "Marsh", author_middleName: "P." }));
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
    expect(arrayOfData[0].authors[0])
      .toEqual(expect.objectContaining({ author_firstName: "Stanley", author_lastName: "Marsh", author_middleName: "P." }));
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
    expect(arrayOfData[0].authors[0])
      .toEqual(expect.objectContaining({ author_firstName: "Stanley", author_lastName: "Marsh", author_middleName: "P." }));
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
    expect(arrayOfData[0].dataset[0].category_name).toEqual("cell size");
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
    expect(arrayOfData[0].dataset[0].subcategory_name).toEqual("width");
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
    expect(arrayOfData[0].publications[0].publication_year).toEqual(1980);
    expect(arrayOfData[0].materials[0])
      .toEqual(expect.objectContaining({ composition_name: "C" }));
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

  test('Feeds the email of account ID of 1 and expects to see a data set with ID of 1 returned', async done => {
    let arrayOfData = await retrieveDataObject.getUserUploadedDatasets("j.comkj")
    expect(arrayOfData[1][0].dataset[0].dataset_id).toEqual(1);
    done()
  });

  test('Feeds the email of account ID of 1 and expects to see two data sets returned, one with ID of 1 and another ID being 2', async done => {
    let arrayOfData = await retrieveDataObject.getUserSavedDatasets("j.comkj")
    expect(arrayOfData[1][0].dataset[0].dataset_id).toEqual(2);
    expect(arrayOfData[1][1].dataset[0].dataset_id).toEqual(1);
    done()
  });

  test('Feeds an invalid email and expects to see an error message', async done => {
    let arrayOfData = await retrieveDataObject.getUserUploadedDatasets("nothing")
    expect(arrayOfData[1]).toEqual("Invalid user email provided");
    done()
  });

  test('Feeds an invalid email and expects to see an error message', async done => {
    let arrayOfData = await retrieveDataObject.getUserSavedDatasets("nothing")
    expect(arrayOfData[1]).toEqual("Invalid user email provided");
    done()
  });
})