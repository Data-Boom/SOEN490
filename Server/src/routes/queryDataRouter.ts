var express = require('express');
const getDataRouter = require('express').Router();
const getDataController = require('../controllers/getDataController');

/**
 * This file contains the routes for a call to query or obtain a dataset. 
 * If an API call is made to /getData then the request is routed to the getDataController
 * to continue processing of the request.
 */
getDataRouter.get('/getData', getDataController.createRequestForData);

getDataRouter.get('/getData', function (req, res) {
    res.status(200).json("getData reached");
});

module.exports = getDataRouter