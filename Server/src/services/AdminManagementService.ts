import { NotFound } from "@tsed/exceptions";
import { IResponse } from '../genericInterfaces/ResponsesInterface';
import { AdminManagementModel } from "../models/AdminManagementModel";

export class AdminManagementService {
    private managementModel: AdminManagementModel;
    private requestResponse: IResponse

    constructor() {
        this.managementModel = new AdminManagementModel();
        this.requestResponse = {} as any
    }
    async fetchAllAdmins() {
        try {
            let admins = await this.managementModel.fetchAllAdminEmails()
            this.requestResponse.statusCode = 200
            this.requestResponse.message = admins as any
            return this.requestResponse
        } catch (error) {
            throw new Error("Something went wrong when fetching all admins. Try again later")
        }
    }

    async addAdminPermissions(userEmail: string) {
        try {
            let executionStatus = await this.managementModel.addAdminPermissions(userEmail);
            this.requestResponse.statusCode = 200
            this.requestResponse.message = executionStatus
            return this.requestResponse
        } catch (error) {
            if (error instanceof NotFound) {
                throw new NotFound(error.message)
            }
            else {
                throw new Error("Something went wrong when adding admin permissions. Try again later")
            }
        }
    }

    async removeAdminPermissions(userEmail: string) {
        try {
            let executionStatus = await this.managementModel.removeAdminPermissions(userEmail);
            this.requestResponse.statusCode = 200
            this.requestResponse.message = executionStatus
            return this.requestResponse
        } catch (error) {
            if (error instanceof NotFound) {
                throw new NotFound(error.message)
            }
            else {
                throw new Error("Something went wrong removing admin permissions. Try again later")
            }
        }
    }
}