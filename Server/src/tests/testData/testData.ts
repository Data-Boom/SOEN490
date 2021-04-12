export const validTestData = {
    "reference": {
        "type": "book",
        "publisher": "University of California Press",
        "authors": [
            {
                "firstName": "alpha",
                "lastName": "testing"
            },
            {
                "firstName": "John",
                "middleName": "L.",
                "lastName": "Mclain"
            }
        ],
        "title": "Dataset Insert Daily",
        "doi": "10.1794/TEXTHERE.926855",
        "volume": 5,
        "issue": 1,
        "pages": "19",
        "year": 1980
    },
    "dataset_name": "My Test: CARBON_graphite,pressed, Initial density = 2.13 g/cc",
    "material": [
        {
            "composition": "CO2",
            "details": "CO2"
        },
        {
            "composition": "C4OS",
            "details": "Chaos"
        }
    ],
    "subcategory": 1,
    "data_type": "HUGoniot",
    "data": {
        "variables": [
            {
                "name": "initial density",
                "unitId": 1
            },
            {
                "name": "initial temperature",
                "unitId": 4
            },
            {
                "name": "initial pressure",
                "unitId": 5
            },
            {
                "name": "shock velocity",
                "unitId": 6
            },
            {
                "name": "particle velocity",
                "unitId": 6
            },
            {
                "name": "pressure",
                "unitId": 5
            },
            {
                "name": "specific volume",
                "unitId": 3
            },
            {
                "name": "density",
                "unitId": 1
            },
            {
                "name": "compression ratio",
                "unitId": 2
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
    },
    "user": {
        "account_id": 1
    }
}

export const inValidTestData = {

    "reference": {
        "publisher": "University of California Press",
        "authors": [
            {
                "firstName": "alpha",
                "lastName": "testing"
            },
            {
                "firstName": "John",
                "middleName": "L.",
                "lastName": "Mclain"
            }
        ],
        "title": "Dataset Insert Daily",
        "doi": "10.1794/TEXTHERE.926855",
        "volume": 5,
        "issue": 1,
        "pages": "19",
        "year": 1980
    },
    "dataset_name": "My Test: CARBON_graphite,pressed, Initial density = 2.13 g/cc",
    "material": [
        {
            "composition": "c",
            "details": "CARBON, graphite, pressed graphite"
        },
        {
            "composition": "C4OS",
            "details": "Chaos"
        }
    ],
    "subcategory": 1,
    "data_type": "HUGoniot",
    "data": {
        "variables": [
            {
                "name": "initial density",
                "unitId": 1
            },
            {
                "name": "initial temperature",
                "unitId": 4
            },
            {
                "name": "initial pressure",
                "unitId": 5
            },
            {
                "name": "shock velocity",
                "unitId": 6
            },
            {
                "name": "particle velocity",
                "unitId": 6
            },
            {
                "name": "pressure",
                "unitId": 5
            },
            {
                "name": "specific volume",
                "unitId": 3
            },
            {
                "name": "density",
                "unitId": 1
            },
            {
                "name": "compression ratio",
                "unitId": 2
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
    },
    "user": {
        "account_id": 1
    }
}

export const validGraphStateData1 = [{
    "datasets": [
        {
            "id": 1,
            "color": "red",
            "shape": "square",
            "isHidden": false
        },
        {
            "color": "green",
            "id": 2,
            "isHidden": true,
            "shape": "triangle",
        }
    ],
    "name": "Test Graph",
    "axes": [
        {
            "variableName": "temperature",
            "logarithmic": true,
            "zoomStartIndex": 100,
            "zoomEndIndex": 100,
            "units": "C"
        },
        {
            "variableName": "width",
            "logarithmic": true,
            "zoomStartIndex": 100,
            "zoomEndIndex": 100,
            "units": "mm"
        }
    ],
    "id": 1
}]

export const validGraphStateData2 = [{
    "datasets": [
        {
            "id": 1,
            "color": "red",
            "shape": "square",
            "isHidden": false
        }
    ],
    "name": "Test Graph #2",
    "axes": [
        {
            "variableName": "temperature",
            "logarithmic": true,
            "zoomEndIndex": 100,
            "zoomStartIndex": 100,
            "units": "C"
        }
    ],
    "id": 2
}]

export const oneFavoriteDataset = [
    {
        reference: {
            title: "Someone's Favorite Publisher",
            doi: null,
            pages: null,
            volume: null,
            issue: null,
            year: 1900,
            publisher: 'University of California Press',
            type: 'Book',
            authors: []
        },
        id: 2,
        dataset_name: "Someone's Favorite",
        data_type: 'Not Specified',
        category: 1,
        subcategory: 1,
        material: [],
        data: {
            comments: "",
            contents: [],
            dataPointComments: null,
            variables: []
        },
    }
]

export const oneUploadedDatasetID = [
    {
        "datasetId": 2,
        "approved": true
    }
]