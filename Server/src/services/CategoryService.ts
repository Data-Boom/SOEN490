import 'dotenv/config';

import { BadRequest } from "@tsed/exceptions";
import { CategoryModel } from '../models/CategoryModel';
import { IResponse } from '../genericInterfaces/ResponsesInterface'
import { ICategory } from '../models/interfaces/CategoryInterface';

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

    async processAddCategory(categoryInfo: ICategory): Promise<IResponse> {
        let name: boolean
        name = await this.categoryModel.verifyIfNameExists(categoryInfo.name);
        if (name) {
            throw new BadRequest("This category already exists! Please use a different name");
        }
        else {
            try {
                let newCategory = await this.categoryModel.insertCategory(categoryInfo);
                this.requestResponse.message = newCategory as any;
                this.requestResponse.statusCode = 201;
                return this.requestResponse
            }
            catch (error) {
                throw new BadRequest("Error occured when creating new category");
            }
        }
    }

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

    async processUpdateCategory(categoryInfo: ICategory): Promise<IResponse> {
        try {
            let updatedCategory = await this.categoryModel.updateCategory(categoryInfo);
            this.requestResponse.message = updatedCategory as any;
            this.requestResponse.statusCode = 200;
            return this.requestResponse
        }
        catch (error) {
            throw new BadRequest(error.message);
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