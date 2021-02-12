import { BadRequest } from "@tsed/exceptions";
import { IDataSetModel } from "../../genericInterfaces/DataProcessInterfaces";
import { IResponse } from "../../genericInterfaces/ResponsesInterface";
import { DatasetCommonModel } from "../../models/DatasetModels/DatasetCommonModel";
import AbstractUploadService from "./AbstractUploadService";
import EditUploadService from "./EditUploadService";

export class EditUploadVerificationService {
    private dataService: AbstractUploadService
    private requestResponse: IResponse
    private datasetCommonModel: DatasetCommonModel

    constructor() {
        this.datasetCommonModel = new DatasetCommonModel();
        this.requestResponse = {} as any
    }

    async verifyUploader(userId: number, permissionLevel: number, dataset: IDataSetModel, datasetId: number): Promise<IResponse> {
        try {
            let clearFlag = false
            if ((permissionLevel == 1 || permissionLevel == 2) == false) {
                let verifyUploader = await this.datasetCommonModel.verifyUnapprovedDatasetUploader(datasetId, userId)
                if (verifyUploader != true) {
                    throw new BadRequest(verifyUploader)
                }
                else {
                    clearFlag = true
                }
            }
            else {
                let verifyDatasetExists = await this.datasetCommonModel.verifyDatasetExists(datasetId)
                if (verifyDatasetExists == undefined || verifyDatasetExists == null) {
                    throw new BadRequest("No such data set exists")
                }
            }
            this.dataService = new EditUploadService(dataset, datasetId, null)
            await this.dataService.validateExtractedData();
            this.requestResponse = await this.dataService.uploadData();
            // Clearing the flag is done now instead of earlier in the else to ensure the data set is updated before
            // it re-appears on the admin side 
            if (clearFlag)
                await this.datasetCommonModel.clearDataSetFlag(datasetId)
            return this.requestResponse
        } catch (error) {
            if (error instanceof BadRequest) {
                throw new BadRequest(error.message)
            }
            else {
                throw new Error("Something went wrong when updating this Data Set. Try again later")
            }
        }
    }
}