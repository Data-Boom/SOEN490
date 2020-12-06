//Running and installing [npm i jsonschema] is required for this page to work
//More details and examples about json schema validator can be found at:
// https://github.com/tdegrunt/jsonschema#readme

var Validator = require('jsonschema').Validator;
// var v = new Validator();

var schema = {
    "id": "/baseSchema",
    "type": "object",
    "properties": {
        "reference": {
            "$ref": "/referenceSchema"
        },
        "datasetName": { "type": "string" },
        "material": {
            "$ref": "/materialSchema"
        },
        "category": { "type": "string" },
        "subcategory": { "type": "string" },
        "data": {
            "$ref": "/dataSchema"
        }

    },
    "required": ["reference", "datasetName", "material", "data"]

};
var referenceSchema = {
    "id": "/referenceSchema",
    "type": "object",
    "properties": {
        "type": { "type": "string" },
        "publisher": { "type": "string" },
        "authors": {
            "$ref": "/authorsSchema"
        },
        "title": { "type": "string" },
        "volume": { "type": "integer" },
        "pages": { "type": "integer" },
        "year": { "type": "integer" }
    },
    "required": ["authors"]
};

var materialSchema = {
    "id": "/materialSchema",
    "type": "array",
    "items": {
        "$ref": "/m2Schema"
    }
};

var m2schema = {
    "id": "/m2Schema",
    "type": "object",
    "properties": {
        "composition": { "type": "string" },
        "details": { "type": "string" }
    },
    "required": ["composition", "details"]
};

var dataSchema = {
    "id": "/dataSchema",
    "type": "object",
    "properties": {
        "variables": {
            "$ref": "/variableSchema"
        },
        "contents": {
            "$ref": "/contentsSchema"
        },
        "comments": { "type": "string" }
    }
};
var counter = 0;
var variableSchema = {
    "id": "/variableSchema",
    "type": "array",
    "properties": {
        "$ref": "/v2Schema"
    }
};
var v2Schema = {
    "id": "/v2Schema",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "repr": { "type": "string" },
        "units": { "type": "string" }
    },
    "required": ["name", "repr", "units"]
};
var contentsSchema = {
    "id": "/contentsSchema",
    "type": "array",
    "properties": {
        "$ref": "/c2Schema"
    }
};
var c2Schema = {
    "id": "/c2Schema",
    "type": "object",
    "properties": {
        "points": {
            "type": "array",
            "items": { "type": "number" },
        },
        "comments": { "type": "string" }
    },
    "required": ["points"]
};