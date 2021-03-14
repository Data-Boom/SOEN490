import { Request, Response, Router } from 'express';
import { CellAnalysisController } from '../controllers/CellAnalysisController';

let router = Router();

router.post('/api/v1/cellanalysis', (request: Request, response: Response) => {
    let controller = new CellAnalysisController();
    controller.createRequestForCellAnalysis(request, response);
});

export { router as CellAnalysisRouter };