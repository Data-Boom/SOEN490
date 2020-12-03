var express = require('express');
const getDataRouter = require('express').Router();
const getDataController = require('../controllers/getDataController');

/**
 * This file contains the routes for a call to query or obtain a dataset. 
 * If an API call is made to /getData then the request is routed to the getDataController
 * to continue processing of the request.
 */

getDataRouter.get('/dataset*', getDataController.createRequestForData);

module.exports = getDataRouter