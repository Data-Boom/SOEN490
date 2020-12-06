var Validator = require('jsonschema').Validator;
// var v = new Validator();

var schema = {
    "id": "/baseSchema",
    "type": "object",
    "properties":{
        "reference": {
          "$ref":"/referenceSchema"            
        },
          "datasetName": {"type": "string"},
          "material":{
                "$ref": "/materialSchema"
          },
          "category":{"type": "string"},
          "subcategory":{"type": "string"},
          "data":{
              "$ref": "/dataSchema"
          }

    }
    
};
var referenceSchema= {
    "id": "/referenceSchema",
    "type": "object",
    "properties":{
        "type":{"type": "string"},
        "publisher": {"type": "string"},
        "authors": {
            "$ref": "/authorsSchema"
        },
        "title": {"type": "string"},
        "volume": {"type": "integer"},
        "pages":{"type": "integer"},
        "year":{"type": "integer"}
    }
};

var materialSchema={
    "id": "/materialSchema",
    "type": "array",
    "items":{
        "$ref": "/m2Schema"
    }
};

var m2schema ={
    "id" : "/m2Schema",
    "type": "object",
    "properties":{
        "composition": {"type":"string"},
        "details": {"type":"string"}
    }
};

var dataSchema ={
    "id" : "/dataSchema",
    "type": "object",
    "properties":{
        "variables": {
            "$ref": "/variableSchema"
        },
        "contents": {
            "$ref": "/contentsSchema"
        },
        "comments": {"type": "string"}
    }
};
var variableSchema= {
    "id": "/variableSchema",
    "type": "array",
    "properties":{
        "$ref": "/v2Schema"
    }
};
var v2Schema ={
    "id" : "/v2Schema",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "repr": {"type": "string"},
        "units": {"type": "string"}
    }
};
var contentsSchema ={
    "id": "/contentsSchema",
    "type": "array",
    "properties": {
        "$ref": "/c2Schema"
    }
};
var c2Schema ={
    "id": "/c2Schema",
    "type": "object",
    "properties": {
        "points" : {
            "type": "array",
            "items" : {"type": "number"},
        },
        "comments": {"type": "string"}
    }
};