import { Router, Request, Response, NextFunction } from 'express';
import DataSet, { getDatasets, postDataset } from '../models/entities/DataSet';

const dataset = require('express').Router();

dataset.get(`/dataset`, function (req: Request, res: Response) {
		getDataset(req, res);
	});

dataset.post(`/dataset`, function (req: Request, res: Response) {
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