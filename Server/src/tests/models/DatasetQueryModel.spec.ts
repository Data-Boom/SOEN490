import { createConnection, getConnection } from 'typeorm';

import { DataQueryModel } from '../../models/DatasetQueryModel';

describe('data service test', () => {
    let dataQueryModel: DataQueryModel;
    jest.setTimeout(60000)

    beforeAll(async () => {
        await createConnection();
        dataQueryModel = new DataQueryModel();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Input material composition of O2, expect to find at least one dataset id', async done => {
        let id = await dataQueryModel.getDatasetIDFromMaterial("O2");
        expect(id[0].dataset_id).not.toBeUndefined()
        done()
    });

    test('Input material details Oxygen, expect to find at least one dataset id', async done => {
        let id = await dataQueryModel.getDatasetIDFromMaterial("Oxygen");
        expect(id[0].dataset_id).not.toBeUndefined()
        done()
    });

    test('Input material composition of null, expect undefined', async done => {
        let id = await dataQueryModel.getDatasetIDFromMaterial(null);
        expect(id[0]).toBeUndefined()
        done()
    });

    test('Input publication year 1980, expect to find at least one dataset id', async done => {
        let id = await dataQueryModel.getDatasetIDFromYear(1980);
        expect(id[0].dataset_id).not.toBeUndefined()
        done()
    });

    test('Input author with first name Stanley and last name Marsh, expect to find at least one dataset id', async done => {
        let id = await dataQueryModel.getDatasetIDFromAuthor("Stanley", "Marsh");
        expect(id[0].dataset_id).not.toBeUndefined()
        done()
    });

    test('Input a category ID of 2, expect to find at least one dataset id', async done => {
        let id = await dataQueryModel.getDatasetIDFromCategory(2);
        expect(id[0].dataset_id).not.toBeUndefined()
        done()
    });

    test('Input a category ID and subcategory ID of 2, expect to find at least one dataset id', async done => {
        let id = await dataQueryModel.getDatasetIDFromSubcategory(2, 2);
        expect(id[0].dataset_id).not.toBeUndefined()
        done()
    });

    test('Input data set ID of 1, expect a data set with ID of 1 as part of the return', async done => {
        let id = await dataQueryModel.getAllData(1);
        expect(id.dataset_id).toBe(1)
        done()
    });

    test('Input data set ID of -1, expect an empty return', async done => {
        let id = await dataQueryModel.getAllData(-1);
        expect(id.dataset_id).toBeUndefined()
        done()
    });

    test('Input data set ID of null, expect an empty return', async done => {
        let id = await dataQueryModel.getAllData(null);
        expect(id.dataset_id).toBeUndefined()
        done()
    });

    test('Feeds the email of account ID of 1 and expects to see a data set ID of 1 returned', async done => {
        let arrayOfData = await dataQueryModel.getUploadedDatasetIDOfUser("j.comkj")
        expect(arrayOfData[1][0].dataset_id).toEqual(1);
        done()
    });

    test('Feeds the email of account ID of 1 and expects to see a data set IDs of 2 returned', async done => {
        let arrayOfData = await dataQueryModel.getSavedDatasetIDOfUser("j.comkj")
        expect(arrayOfData[1][0].dataset_id).toEqual(2);
        done()
    });

    test('Feeds an invalid email and expects to see an error message', async done => {
        let arrayOfData = await dataQueryModel.getUploadedDatasetIDOfUser("not valid")
        expect(arrayOfData[1]).toEqual("Invalid user email provided");
        done()
    });

    test('Feeds an invalid email and expects to see an error message', async done => {
        let arrayOfData = await dataQueryModel.getSavedDatasetIDOfUser("not valid")
        expect(arrayOfData[1]).toEqual("Invalid user email provided");
        done()
    });
})