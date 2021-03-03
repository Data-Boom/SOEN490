import 'dotenv/config';

import { BadRequest } from "@tsed/exceptions";
import { CategoryModel } from '../models/CategoryModel';
import { IResponse } from '../genericInterfaces/ResponsesInterface'

/**
 * This class handles requests related to dimensions and units and also
 * interacts with the database for the Dimensions table
 */
export class CategoryService {
    private requestResponse: IResponse = {} as any;
    private categoryModel: CategoryModel

    constructor() {
        this.categoryModel = new CategoryModel()
    }

    /**
    * This method calls the database for all the existing categories
    */
    async processGetAllCategories() {
        try {
            let categories = await this.categoryModel.getAllCategories()
            this.requestResponse.message = categories as any
            this.requestResponse.statusCode = 200;
            return this.requestResponse;
        }
        catch (error) {
            throw new BadRequest("Error occured when fetching all categories");
        }
    }

    /**
    * This method calls the database to remove an existing category
    * @param categoryId 
    * A category ID: number
    */
    async processDeleteCategory(categoryId: number): Promise<IResponse> {
        try {
            await this.categoryModel.deleteCategory(categoryId);
        }
        catch (error) {
            throw new BadRequest(error.message);
        }
        this.requestResponse.message = "Success";
        this.requestResponse.statusCode = 200;
        return this.requestResponse;
    }
}