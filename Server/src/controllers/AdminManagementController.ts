import { Request, Response } from 'express';
import { IAdminChangeInformation } from "../genericInterfaces/AdminManagementInterfaces";
import { AdminManagementService } from "../services/AdminManagementService";

/**
 * This controller is responsible for verifying the user request has correct parameters input.
 * After request is verified, the appropriate service can be called to fulfill an admin related task
 */
export class AdminManagementController {
    private adminService: AdminManagementService;

    constructor() {
    }

    async createRequestForAllAdmins(request: Request, response: Response) {
        this.adminService = new AdminManagementService();
        try {
            let requestResponse = await this.adminService.fetchAllAdmins();
            return response.status(requestResponse.statusCode).json(requestResponse.message)
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }

    async createPermissionUpdateRequest(request: Request, response: Response): Promise<Response> {
        this.adminService = new AdminManagementService();
        let invalidResponse = this.validatePermissionUpdateRequest(request);
        if (!invalidResponse) {
            return response.status(400).json("Request is invalid. Missing attributes")
        }
        else {
            try {
                let requestParams: any = { ...request.body };
                let adminInfo: IAdminChangeInformation = requestParams;
                let requestResponse: any;
                if (adminInfo.operation == "add")
                    requestResponse = await this.adminService.addAdminPermissions(adminInfo.email);
                else if (adminInfo.operation == "remove")
                    requestResponse = await this.adminService.removeAdminPermissions(adminInfo.email);
                else {
                    return response.status(400).json("Invalid permission update operation entered");
                }
                return response.status(requestResponse.statusCode).json(requestResponse.message)
            } catch (error) {
                response.status(error.status).json(error.message);
            }
        }
    }

    private validatePermissionUpdateRequest(request: Request) {
        if (!request.body.hasOwnProperty('email') || !request.body.hasOwnProperty('operation')) {
            return false;
        }
        else {
            return true;
        }
    }

}