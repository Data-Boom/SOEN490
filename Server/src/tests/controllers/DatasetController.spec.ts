import { Request, Response } from 'express';
import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { DataSetController } from '../../controllers/DataSetController';
import { oneFavoriteDataset, oneUploadedDatasetID } from '../testData/testData';

describe('Data Set Controller ', () => {
    let mockRequest;
    let mockResponse;
    let GetDataControllerController: DataSetController;

    beforeAll(async () => {
        try {
            await createConnection();
        } catch (error) {
            // If AlreadyHasActiveConnectionError occurs, return already existent connection
            if (error.name === "AlreadyHasActiveConnectionError") {
                return getConnectionManager().get();
            }
        }
        jest.setTimeout(60000)
        GetDataControllerController = new DataSetController();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        }
    });

    afterAll(async () => {
        await getConnection().close();
    });

    test('Feeds data set ID of 1 and expects to see a data set with ID of 1 returned', async done => {
        mockRequest = {
            query: {
                datasetId: [2]
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await datasetSearchWithAssert(mockRequest as Request, mockResponse as Response, 200, oneFavoriteDataset)
        done()
    });

    test('Invalid search, no search query entered', async done => {
        mockRequest = {
            query: {
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await datasetSearchWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid search params entered")
        done()
    });

    test('Valid Add Favorite Data Set Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '4'
                }
            },
            params: {
                datasetId: '1'
            }
        }
        await addFavoriteDatasetWithAssert(mockRequest as Request, mockResponse as Response, 200, "Favorite data set successfully saved")
    });

    test('Add Favorite Data Set Request, Data Set Already Saved', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: '2'
            }
        }
        await addFavoriteDatasetWithAssert(mockRequest as Request, mockResponse as Response, 200, "Favorite data set is already saved")
    });

    test('Invalid Add Favorite Data Set Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: "wrtrterterte"
            }
        }
        await addFavoriteDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid data set ID entered")
    });

    test('Valid Get User Uploaded Data Sets Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '3'
                }
            }
        }
        await GetDataControllerController.createRequestForUserUploadedDatasets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith(oneUploadedDatasetID);
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Get User Favorite Data Sets Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '3'
                }
            }
        }
        await GetDataControllerController.createRequestForUserFavoriteDatsets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json).toBeCalledWith([2]);
        expect(mockResponse.status).toBeCalledWith(200);
    });

    // Do these after other favorite data set tests
    test('Valid Remove Favorite Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: '3'
            },
            body: {
                user: {
                    account_id: '3'
                }
            }
        }
        await deleteUserFavoriteWithAssert(mockRequest as Request, mockResponse as Response, 200, "User favorite data set successfully removed")
    });

    test('Remove Non-existant Favorite Data Set Request', async () => {
        mockRequest = {
            params: {
                datasetId: '0'
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await deleteUserFavoriteWithAssert(mockRequest as Request, mockResponse as Response, 200, "User favorite data set successfully removed")
    });

    test('Invalid Remove Favorite Data Set Request; false data set ID', async () => {
        mockRequest = {
            params: {
                datasetId: 'werwerewr'
            },
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await deleteUserFavoriteWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid data set ID entered")
    });

    test('Valid Get Unapproved Data Sets Request; expect at least one entry in return', async () => {
        await GetDataControllerController.createRequestForUnapprovedDatsets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    test('Valid Reject Data Set Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1',
                    account_admin: '1'
                }
            },
            params: {
                datasetId: 10
            }
        }
        await rejectDatasetWithAssert(mockRequest as Request, mockResponse as Response, 200, "Successfully removed data set")
    });

    test('Valid Get Account 1 Unapproved Data Sets Request; expect at least one entry in return', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            }
        }
        await GetDataControllerController.createRequestForUserFlaggedDatasets(mockRequest as Request, mockResponse as Response)
        expect(mockResponse.json[0]).not.toBeUndefined;
        expect(mockResponse.status).toBeCalledWith(200);
    });

    // The two invalid user approval tests must happen before the valid approval tests
    test('Invalid User Approve Data Set Request; wrong ID', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '2'
                }
            },
            params: {
                datasetId: 12
            }
        }
        await userApproveDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "User ID does not match uploader ID!")
    });

    test('Invalid User Approve Data Set Request; data set not yet flagged', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 11
            }
        }
        await userApproveDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "You cannot approve or reject a data set until it passes initial screening!")
    });

    test('Valid User Approve Data Set Request', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 12
            }
        }
        await userApproveDatasetWithAssert(mockRequest as Request, mockResponse as Response, 200, "Successfully approved new data set")
    });

    test('Valid Admin Approve Data Set Request', async () => {
        mockRequest = {
            query: {
                datasetId: 16
            }
        }
        await adminApproveDatasetWithAssert(mockRequest as Request, mockResponse as Response, 200, "Successfully approved new data set")
    });

    test('Invalid Admin Approve Data Set Request; no query passed', async () => {
        mockRequest = {
            query: {
            }
        }
        await adminApproveDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid data set ID entered")
    });

    test('Invalid User Approve Data Set Request; bad ID passed', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1',
                    account_admin: '1'
                }
            },
            params: {
                datasetId: 'regregreg'
            }
        }
        await userApproveDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid data set ID entered")
    });

    test('Invalid Reject Data Set Request; no ID passed', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1',
                    account_admin: '1'
                }
            },
            params: {
                datasetId: 'regregreg'
            }
        }
        await rejectDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid data set ID entered")
    });

    test('Valid Flag Data Set Request', async () => {
        mockRequest = {
            query: {
                datasetId: 19
            }
        }
        await flagDatasetWithAssert(mockRequest as Request, mockResponse as Response, 200, "Dataset Flagged!")
    });

    test('Invalid Flag Data Set Request; no ID passed', async () => {
        mockRequest = {
            query: {
            }
        }
        await flagDatasetWithAssert(mockRequest as Request, mockResponse as Response, 400, "No datasetID provided to flag dataset")
    });

    test('Invalid Remove User Favorite Data Set Request; no ID passed', async () => {
        mockRequest = {
            body: {
                user: {
                    account_id: '1'
                }
            },
            params: {
                datasetId: 'regregreg'
            }
        }
        await deleteUserFavoriteWithAssert(mockRequest as Request, mockResponse as Response, 400, "Invalid data set ID entered")
    });

    async function datasetSearchWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createRequestForData(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function addFavoriteDatasetWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createRequestToAddUserFavoriteDataSet(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function adminApproveDatasetWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createAdminApprovedDatasetRequest(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function userApproveDatasetWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createUserApprovedDatasetRequest(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function rejectDatasetWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createRequestToRejectDataset(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function flagDatasetWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createRequestToFlagDataset(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }

    async function deleteUserFavoriteWithAssert(mockRequest: Request, mockResponse: Response, status: number, expectedResponse: any) {
        await GetDataControllerController.createRequestToDeleteUserFavoriteDataSet(mockRequest, mockResponse)
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(status);
    }
})