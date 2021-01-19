import React from 'react'

const emptySample = () => {
    const sample = {
        "reference": {
          "type": "",
          "publisher": "",
          "authors": [
            {
              "firstname": "",
              "middlename": "",
              "lastname": ""
            },
            {
              "firstname": "",
              "middlename": "",
              "lastname": ""
            }
          ],
          "title": "",
          "volume": 0,
          "pages": 0,
          "year": 0
        },
        "dataset name": "",
        "material": [
          {
            "composition": "",
            "details": ""
          },
          {
            "composition": "",
            "details": ""
          }
        ],
        "category": "",
        "subcategory": "",
        "data type": "",
        "data": {
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
              ],
              "comments": ""
            },
            {
              "point": [
              ],
              "comments": ""
            }
          ],
          "comments": ""
        }
      }
    const js= JSON.parse(sample);
    return js;
}


export default emptySample
