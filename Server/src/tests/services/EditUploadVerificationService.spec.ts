import { createConnection, getConnection } from 'typeorm';
import { EditUploadVerificationService } from '../../services/DataUpload/EditUploadVerificationService';
import { validEditTestData } from '../testData/testData';

describe('EditUploadVerificationService Test', () => {
    let service: EditUploadVerificationService;

    beforeAll(async () => {
        await createConnection();
        jest.setTimeout(60000)
        service = new EditUploadVerificationService();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Invalid User Data Set Edit; user ID does not match uploader id', async () => {
        await expect(service.verifyUploader(1, 0, validEditTestData, 13))
            .rejects
            .toThrow("User ID does not match uploader ID!");
    });

    test('Invalid User Data Set Edit; data set does not exist', async () => {
        await expect(service.verifyUploader(1, 0, validEditTestData, -1))
            .rejects
            .toThrow("No such unapproved data set exists!");
    });

    test('Invalid User Data Set Edit; data set not flagged', async () => {
        await expect(service.verifyUploader(2, 0, validEditTestData, 14))
            .rejects
            .toThrow("You cannot approve or reject a data set until it passes initial screening!");
    });

    test('Invalid Admin Data Set Edit; data set does not exist', async () => {
        await expect(service.verifyUploader(1, 1, validEditTestData, -1))
            .rejects
            .toThrow("No such data set exists");
    });

    test('Valid Admin Data Set Edit', async done => {
        let response = await service.verifyUploader(1, 1, validEditTestData, 13)
        expect(response.message).toEqual("Dataset Updated!");
        expect(response.statusCode).toEqual(201);
        done()
    });

    test('Valid User Data Set Edit', async done => {
        let response = await service.verifyUploader(2, 0, validEditTestData, 13)
        expect(response.message).toEqual("Dataset Updated!");
        expect(response.statusCode).toEqual(201);
        done()
    });
})