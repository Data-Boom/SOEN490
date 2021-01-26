
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
  dateAccessed?: Date,
  datePublished?: Date,
  publisher: string,
  authors: IAuthor[],
  title: string,
  volume: number,
  pages: number,
  year: number,
}

export interface IMaterial {
  composition: string,
  details: string,
  id?: number
}

export interface IVariable {
  name: string,
  repr: string,
  units: string,
}

export const newVariable: IVariable = {
  name: '',
  repr: '',
  units: '',
}

export interface IContent {
  point: number[],
  comments: string,
}

export interface IData {
  variables: IVariable[],
  contents: IContent[],
  comments: string,
}

export interface IDatasetModel {
  reference: IReference,
  dataset_name: string,
  material: IMaterial[],
  category: string,
  subcategory: string,
  data_type: string,
  data: IData,
  id: number | undefined
}

// will build a type that is IDatasetModel without reference and data
export type IDatasetMeta = Omit<IDatasetModel, 'reference' | 'data'>

export const defaultDatasetModel: IDatasetModel = {
  category: '',
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
    pages: 0,
    publisher: '',
    title: '',
    type: '',
    volume: 0,
    year: 0
  },
  subcategory: '',
  id: undefined
}

export const tempData: IData = {
  "variables": [
    {
      "name": "initial density",
      "repr": "rho_0",
      "units": "g/cc"
    },
    {
      "name": "initial temperature",
      "repr": "T_0",
      "units": "K"
    },
    {
      "name": "initial pressure",
      "repr": "P_0",
      "units": "GPa"
    },
    {
      "name": "shock velocity",
      "repr": "U_s",
      "units": "km/s"
    },
    {
      "name": "particle velocity",
      "repr": "U_p",
      "units": "km/s"
    },
    {
      "name": "pressure",
      "repr": "P",
      "units": "GPa"
    },
    {
      "name": "specific volume",
      "repr": "v",
      "units": "cc/g"
    },
    {
      "name": "density",
      "repr": "rho",
      "units": "g/cc"
    },
    {
      "name": "compression ratio",
      "repr": "v/v_0",
      "units": ""
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
      ],
      "comments": "im1"
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
      ],
      "comments": "im2"
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
      ],
      "comments": "im3364363636"
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
      ],
      "comments": "im234234234"
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
      ],
      "comments": "im644"
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
      ],
      "comments": "im125235252"
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
      ],
      "comments": "im5756756751"
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
      ],
      "comments": "im6786786874361"
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
      ],
      "comments": "im1i676i57u4y3"
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
      ],
      "comments": "im23r23t2463461"
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
      ],
      "comments": "i45y4y4y45ym1"
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
    "pages": 19,
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
  "category": "cell size",
  "subcategory": "width",
  "data_type": "hugoniot",
  "data": tempData
}
