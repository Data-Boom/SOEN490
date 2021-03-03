import { Request, Response } from 'express';
import { BadRequest } from '@tsed/exceptions';
import { CategoryService } from '../services/CategoryService';

/**
 * This controller is responsible for verifying the user request has correct parameters input.
 * After request is verified, the appropriate service will be called
 */
export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async retrieveCategories(response: Response): Promise<Response> {
        try {
            let requestResponse = await this.categoryService.processGetAllCategories();
            return response.status(requestResponse.statusCode).json(requestResponse.message)
        } catch (error) {
            this.handleError(response, error);
        }
    }

    private handleError(response: Response, error: any) {
        if (error instanceof BadRequest) {
            response.status(error.status).json(error.message);
        }
        else {
            response.status(error.status).json("Something went wrong with category operation");
        }
    }
}