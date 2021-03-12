export interface IAuthor {
  firstName: string,
  middleName: string,
  lastName: string,
}

export const newAuthor: IAuthor = {
  firstName: '',
  lastName: '',
  middleName: ''
}

export interface IReference {
  type: string,
  doi?: string,
  publisher: string,
  authors: IAuthor[],
  title: string,
  volume: number,
  issue: number,
  pages: string,
  year: number,
}

export interface IMaterial {
  composition: string,
  details: string,
  id?: number
}

export interface IVariable {
  name: string,
  dimensionId: number,
  unitId: number,
}

export const newVariable: IVariable = {
  name: '',
  dimensionId: null,
  unitId: null,
}

export interface IContent {
  point: number[]
}

export interface IData {
  variables: IVariable[],
  contents: IContent[],
  dataPointComments?: string[],
  comments: string,
}

export interface IDatasetModel {
  reference: IReference,
  dataset_name: string,
  material: IMaterial[],
  category: number,
  subcategory: number,
  data_type: string,
  data: IData,
  id: number | undefined,
}

// will build a type that is IDatasetModel without reference and data
export type IDatasetMeta = Omit<IDatasetModel, 'reference' | 'data'>

export const defaultDatasetModel: IDatasetModel = {
  data: {
    comments: '',
    contents: [],
    variables: []
  },
  data_type: '',
  dataset_name: '',
  material: [],
  reference: {
    authors: [newAuthor],
    pages: null,
    publisher: '',
    title: '',
    type: '',
    volume: null,
    issue: null,
    year: 0
  },
  category: null,
  subcategory: null,
  id: undefined
}

export const tempData: IData = {
  "variables": [
    {
      "name": "initial density",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "initial temperature",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "initial pressure",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "shock velocity",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "particle velocity",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "pressure",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "specific volume",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "density",
      "dimensionId": 0,
      "unitId": 0
    },
    {
      "name": "compression ratio",
      "dimensionId": 0,
      "unitId": 0
    }
  ],
  "contents": [
    {
      "point": [
        2.113,
        273.15,
        0.0,
        5.235,
        1.026,
        11.349,
        0.3805,
        2.628,
        0.804
      ]
    },
    {
      "point": [
        2.123,
        273.15,
        0.0,
        6.013,
        1.380,
        17.617,
        0.3629,
        2.755,
        0.770
      ]
    },
    {
      "point": [
        2.123,
        273.15,
        0.0,
        6.320,
        1.972,
        26.459,
        0.3241,
        3.086,
        0.688
      ]
    },
    {
      "point": [
        2.143,
        273.15,
        0.0,
        6.551,
        2.607,
        36.599,
        0.2809,
        3.560,
        0.602
      ]
    },
    {
      "point": [
        2.141,
        273.15,
        0.0,
        6.704,
        2.779,
        39.888,
        0.2735,
        3.657,
        0.585
      ]
    },
    {
      "point": [
        2.146,
        273.15,
        0.0,
        7.960,
        3.370,
        57.567,
        0.2687,
        3.722,
        0.577
      ]
    },
    {
      "point": [
        2.142,
        273.15,
        0.0,
        8.762,
        3.748,
        70.343,
        0.2672,
        3.743,
        0.572
      ]
    },
    {
      "point": [
        2.134,
        273.15,
        0.0,
        8.836,
        3.801,
        71.672,
        0.2670,
        3.745,
        0.570
      ]
    },
    {
      "point": [
        2.135,
        273.15,
        0.0,
        9.208,
        3.948,
        77.614,
        0.2676,
        3.737,
        0.571
      ]
    },
    {
      "point": [
        2.136,
        273.15,
        0.0,
        9.627,
        4.138,
        85.091,
        0.2669,
        3.746,
        0.570
      ]
    },
    {
      "point": [
        2.136,
        273.15,
        0.0,
        9.566,
        4.290,
        87.657,
        0.2582,
        3.873,
        0.552
      ]
    }
  ],
  "comments": "References 5,6,14\nAverage density = 2.134 g/cc"
}

export const exampleExportDatasetModel: IDatasetModel = {
  "reference": {
    "type": "book",
    "publisher": "University of California Press",
    "authors": [
      {
        "firstName": "Stanley",
        "middleName": "P.",
        "lastName": "Marsh"
      },
      {
        "firstName": "John",
        "middleName": "L.",
        "lastName": "Mclain"
      }
    ],
    "title": "LASL shock Hugoniot data",
    "volume": 5,
    "issue": 1,
    "pages": "19",
    "year": 1980
  },
  "id": 1234,
  "dataset_name": "CARBON_graphite,pressed, Initial density = 2.13 g/cc",
  "material": [
    {
      "composition": "C",
      "details": "carbon, graphite, pressed graphite", "id": 0
    },
    {
      "composition": "O2",
      "details": "Oxygen", "id": 1
    }
  ],
  "category": 2,
  "subcategory": 2,
  "data_type": "hugoniot",
  "data": tempData
}
