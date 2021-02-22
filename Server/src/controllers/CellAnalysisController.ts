import { Request, Response } from 'express';
import { CellAnalysisService } from '../services/CellAnalysisService';

export class CellAnalysisController {
    private service: CellAnalysisService;
    constructor() {
        this.service = new CellAnalysisService();
    }

    /**
     * This controller will take a request, send it to the service to do things
     * 
     * @param request
     * An object containing the request information and parameters: Request 
     * @param response 
     * An object containing a response: Response
     */
    async createRequestForCellAnalysis(request: Request, response: Response) {
        try {
            let data = await this.service.cellSizeAnalyzer()
            return response.status(200).json(data);
        } catch (error) {
            response.status(error.status).json(error.message);
        }
    }
}