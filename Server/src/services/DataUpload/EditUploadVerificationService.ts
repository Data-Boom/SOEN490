import { BadRequest } from "@tsed/exceptions";
import { DatasetCommonModel } from "../../models/DatasetModels/DatasetCommonModel";

export class EditUploadVerificationService {
    private datasetCommonModel: DatasetCommonModel

    constructor() {
        this.datasetCommonModel = new DatasetCommonModel();
    }

    async verifyUploader(userId: number, permissionLevel: number, datasetId: number): Promise<boolean> {
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
            return clearFlag
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