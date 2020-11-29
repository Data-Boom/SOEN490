import { Request, Response } from 'express';
import { getDatasets, postDataset } from '../models/entities/DatasetEntity';

const dataset = require('express').Router();

dataset.get(`/dataset`, function (req: Request, res: Response) {
	getDataset(req, res);
});

dataset.post(`/dataset`, function (req: Request, res: Response) {
	console.log(req.body)
	createDataset(req, res);
});

const getDataset = async (request: Request, response: Response) => {
	const datasets = await getDatasets();
	//todo foreach dataset get datapoints. for later on
	if (datasets) {
		response.send(datasets);
	}
}

const createDataset = async (request: Request, response: Response) => {
	console.log(request.body)
	const result = await postDataset(request);
	if (result) {
		response.send(result);
	}
}

module.exports = dataset