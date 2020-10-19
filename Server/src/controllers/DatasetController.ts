import { Router, Request, Response, NextFunction } from 'express';
import DataSet from '../entities/DataSet';

var express = require('express')
var router = express.Router()
router.get(`dataset`, function (req: Request, res: Response) {
		getDataset(req, res);
	});

const getDataset = async (request: Request, response: Response) => {
	const query = request.params.query;
	// for now:
	response.send("routing successfull");
	const userQuery = DataSet.getDatasetByCategoryId(1);
	//foreach dataset get datapoints. for later on

	const user = await userQuery;
	if (user) {
		response.send(user);
	}
}

module.exports = router