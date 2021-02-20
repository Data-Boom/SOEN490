import { createConnection, getConnection } from 'typeorm';
import { DataQueryModel } from '../../models/DatasetModels/DatasetQueryModel';

describe('Logger', () => {
    test.todo('please pass');
});

// describe('data query model test', () => {
//     let dataQueryModel: DataQueryModel;
//     jest.setTimeout(60000)

//     beforeAll(async () => {
//         await createConnection();
//         dataQueryModel = new DataQueryModel();
//     });

//     afterAll(async () => {
//         await getConnection().close();
//     });

    //     test('Input material composition of O2, expect to find at least one dataset id', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromMaterial("O2");
    //         expect(id[0].dataset_id).not.toBeUndefined()
    //         done()
    //     });

    //     test('Input material details Oxygen, expect to find at least one dataset id', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromMaterial("Oxygen");
    //         expect(id[0].dataset_id).not.toBeUndefined()
    //         done()
    //     });

    //     test('Input material composition of null, expect undefined', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromMaterial(null);
    //         expect(id[0]).toBeUndefined()
    //         done()
    //     });

    //     test('Input publication year 1980, expect to find at least one dataset id', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromYear(1980);
    //         expect(id[0].dataset_id).not.toBeUndefined()
    //         done()
    //     });

    //     test('Input author with first name Stanley and last name Marsh, expect to find at least one dataset id', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromAuthor('Stanley', 'Marsh');
    //         expect(id[0].dataset_id).not.toBeUndefined()
    //         done()
    //     });

    //     test('Input a category ID of 2, expect to find at least one dataset id', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromCategory(2);
    //         expect(id[0].dataset_id).not.toBeUndefined()
    //         done()
    //     });

    //     test('Input a category ID and subcategory ID of 2, expect to find at least one dataset id', async done => {
    //         let id = await dataQueryModel.getDatasetIDFromSubcategory(2, 2);
    //         expect(id[0].dataset_id).not.toBeUndefined()
    //         done()
    //     });

    //     test('Input data set ID of 1, expect a data set with ID of 1 as part of the return', async done => {
    //         let id = await dataQueryModel.getAllData([1]);
    //         expect(id[0][0].dataset_id).toBe(1)
    //         done()
    //     });

    //     test('Input data set ID of -1, expect an empty return', async done => {
    //         let id = await dataQueryModel.getAllData([-1]);
    //         expect(id[0][0]).toBeUndefined()
    //         done()
    //     });

    //     test('Input data set ID of null, expect an empty return', async done => {
    //         let id = await dataQueryModel.getAllData(null);
    //         expect(id[0][0]).toBeUndefined()
    //         done()
    //     });

    //     test('Feeds the email of account ID of 1 and expects to see a data set ID of 1 returned', async done => {
    //         let arrayOfData = await dataQueryModel.getUploadedDatasetIDOfUser(1)
    //         expect(arrayOfData[0].dataset_id).toEqual(1);
    //         done()
    //     });

    //     test('Feeds an account ID of 1 and expects to see a data set IDs of 2 returned', async done => {
    //         let arrayOfData = await dataQueryModel.getFavoriteDatasetIDOfUser(1)
    //         expect(arrayOfData[0].dataset_id).toEqual(2);
    //         done()
    //     });

    //     test('Feeds an invalid account ID and expects to see an empty return', async done => {
    //         let arrayOfData = await dataQueryModel.getFavoriteDatasetIDOfUser(-1)
    //         // expect(arrayOfData).toEqual([]);
    //         done()
    //     });

    //     test('Attempts to add favorite data set to non existant user', async () => {
    //         await expect(dataQueryModel.addUserFavoriteDatasetModel(-1, 3))
    //             .rejects
    //             .toThrow("Something went wrong adding a favorite data set. Try later");
    //     });

// })