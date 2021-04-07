import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'

interface IProps {
    datasets: IDatasetModel
}
export const JSONdatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }
    const dimensions = useDimensionsSelector()

    //helper methods
    const variableNameArray = (): any => {
        var name = []
        for (var i in datasets.data.variables) {
            name.push(
                {
                    "name": datasets.data.variables[i].name,
                    "units": getUnitNameById(dimensions, datasets.data.variables[i].unitId)
                })
        }
        return name
    }

    const materialArray = (): any => {
        var name = []
        for (var i in datasets.material) {
            name.push(
                {
                    "composition ": datasets.material[i].composition,
                    "details": datasets.material[i].details
                }
            )
        } return name
    }
    const authorArray = (): any => {
        var name = []
        for (var i = 0; i < datasets.reference.authors.length; i++) {
            name.push(
                {
                    "firstname ": datasets.reference.authors[i].firstName,
                    "middlename": datasets.reference.authors[i].middleName,
                    "lastname ": datasets.reference.authors[i].lastName
                }
            )
        }
        return name
    }
    const dataContentArray = (): any => {
        var name = []
        for (var i in datasets.data.contents) {
            name.push(
                {
                    "point": datasets.data.contents[i].point,
                    "comment": datasets.data.dataPointComments[i]
                }
            )
        }
        return name
    }

    const downloadedJSONDataDisplayed =
    {
        "Dataset name ": datasets.dataset_name,
        "Material": materialArray(),
        "Data type": datasets.data_type,
        "Category": datasets.category,
        "Subcategory ": datasets.subcategory,
        "reference": {
            "Authors ": [authorArray()],
            "Title ": datasets.reference.title,
            "Type": datasets.reference.type,
            "Publisher": datasets.reference.publisher,
            "Volume, ": datasets.reference.volume,
            "Pages, ": datasets.reference.pages,
            "DOI ": datasets.reference.doi,
            "Issue ": datasets.reference.issue,
            "Year ": datasets.reference.year
        },
        "Export source ": "databoom.concordia.ca",
        "Export date ": new Date().toLocaleString(),
        "Data": {
            "variables": variableNameArray(),
            "contents": dataContentArray(),
            "comments": datasets.data.comments
        }
    }

    const handleJSONDownload = () => {
        download("jsondataset.JSON", JSON.stringify(downloadedJSONDataDisplayed, null, 4))
    }

    //stolen from https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    function download(filename: string, text: string) {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }

    return (
        <Button id="download-json" onClick={handleJSONDownload} color="primary" variant="contained"> JSON </Button>

    )

}
