import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { EditUploadVerificationService } from '../../services/DataUpload/EditUploadVerificationService';

describe('EditUploadVerificationService Test', () => {
    let service: EditUploadVerificationService;

    beforeAll(async () => {
        try {
            await createConnection();
        } catch (error) {
            // If AlreadyHasActiveConnectionError occurs, return already existent connection
            if (error.name === "AlreadyHasActiveConnectionError") {
                const existentConn = getConnectionManager().get();
                return existentConn;
            }
        }
        jest.setTimeout(60000)
        service = new EditUploadVerificationService();
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Invalid User Validation; user ID does not match uploader id', async () => {
        await expect(service.verifyUploader(1, 0, 13))
            .rejects
            .toThrow("User ID does not match uploader ID!");
    });

    test('Invalid User Validation; data set does not exist', async () => {
        await expect(service.verifyUploader(1, 0, -1))
            .rejects
            .toThrow("No such unapproved data set exists!");
    });

    test('Invalid User Validation; data set not flagged', async () => {
        await expect(service.verifyUploader(2, 0, 14))
            .rejects
            .toThrow("You cannot approve or reject a data set until it passes initial screening!");
    });

    test('Invalid Admin Validation; data set does not exist', async () => {
        await expect(service.verifyUploader(1, 1, -1))
            .rejects
            .toThrow("No such data set exists");
    });

    test('Valid Admin Validation', async done => {
        let response = await service.verifyUploader(1, 1, 13)
        expect(response).toEqual(false);
        done()
    });

    test('Valid User Validation', async done => {
        let response = await service.verifyUploader(2, 0, 13)
        expect(response).toEqual(true);
        done()
    });
})