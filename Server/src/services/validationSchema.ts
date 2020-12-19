export const schemaValidator = {
    'baseSchema': {
        "id": "/baseSchema",
        "type": "object",
        "properties": {
            "reference": {
                "$ref": "/referenceValidationSchema"
            },
            "datasetName": { "type": "string" },
            "material": {
                "$ref": "/materialValidationSchema"
            },
            "category": { "type": "string" },
            "subcategory": { "type": "string" },
            "data": {
                "$ref": "/dataValidationSchema"
            }
        },
        "required": ["reference", "datasetName", "material", "data"]
    },


    'referenceValidationSchema': {
        "id": "/referenceValidationSchema",
        "type": "object",
        "properties": {
            "type": { "type": "string" },
            "publisher": { "type": "string" },
            "authors": {
                "$ref": "/authorsValidationSchema"
            },
            "title": { "type": "string" },
            "volume": { "type": "integer" },
            "pages": { "type": "integer" },
            "year": { "type": "integer" }
        },
        "required": ["authors"]
    },

    'authorsValidationSchema': {
        "id": "/authorsValidationSchema",
        "type": "object",
        "properties": {
            "firstname": { "type": "string" },
            "middlename": { "type": "string" },
            "lasttname": { "type": "string" }
        },
        "required": ["firstname", "lastname"]
    },

    'materialValidationSchema': {
        "id": "/materialValidationSchema",
        "type": "array",
        "items": {
            "$ref": "/materialDetailsValidationSchema"
        }
    },

    'materialDetailsValidationSchema': {
        "id": "/materialDetailsValidationSchema",
        "type": "object",
        "properties": {
            "composition": { "type": "string" },
            "details": { "type": "string" }
        },
        "required": ["composition", "details"]
    },

    'dataValidationSchema': {
        "id": "/dataValidationSchema",
        "type": "object",
        "properties": {
            "variables": {
                "$ref": "/variableValidationSchema"
            },
            "contents": {
                "$ref": "/contentsValidationSchema"
            },
            "comments": { "type": "string" }
        }
    },

    'variableValidationSchema': {
        "id": "/variableValidationSchema",
        "type": "array",
        "properties": {
            "$ref": "/variableDetailsValidationSchema"
        }
    },

    'variableDetailsValidationSchema': {
        "id": "/variableDetailsValidationSchema",
        "type": "object",
        "properties": {
            "name": { "type": "string" },
            "repr": { "type": "string" },
            "units": { "type": "string" }
        },
        "required": ["name", "repr", "units"]
    },

    'contentsValidationSchema': {
        "id": "/contentsValidationSchema",
        "type": "array",
        "properties": {
            "$ref": "/contentsDetailsValidationSchema"
        }
    },

    'contentsDetailsValidationSchema': {
        "id": "/contentsDetailsValidationSchema",
        "type": "object",
        "properties": {
            "points": {
                "type": "array",
                "items": { "type": "number" },
            },
            "comments": { "type": "string" }
        },
        "required": ["points"]
    },

}