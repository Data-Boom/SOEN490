import { createConnection, getConnection } from 'typeorm';
import { DataQueryModel } from '../../models/DataQueryModel';

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
        expect(id.dataset[0].dataset_id).toBe(1)
        done()
    });

    test('Input data set ID of -1, expect an empty return', async done => {
        let id = await dataQueryModel.getAllData(-1);
        expect(id.dataset[0]).toBeUndefined()
        done()
    });

    test('Input data set ID of null, expect an empty return', async done => {
        let id = await dataQueryModel.getAllData(null);
        expect(id.dataset[0]).toBeUndefined()
        done()
    });
})