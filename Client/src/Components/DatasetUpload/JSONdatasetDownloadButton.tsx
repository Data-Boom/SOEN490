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
    const variableArray = (): any => {
        var name = " "
        for (var i in datasets.data.variables) {
            name += datasets.data.variables[i].name + " " + getUnitNameById(dimensions, datasets.data.variables[i].unitId) + " , "
        }
        return name
    }
    const materialArray = (): any => {
        var name = " "
        for (var i in datasets.material) {
            name += datasets.material[i].composition + " " + datasets.material[i].details + ", "
        }
        return name
    }
    const authorArray = (): any => {
        var name = " "
        for (var i in datasets.reference.authors) {
            name += datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].lastName + " "
        }
        return name
    }
    const dataContentArray = (): any => {
        var name = " "
        for (var i in datasets.data.contents) {
            name += datasets.data.contents[i].point + " "
        }
        return name
    }

    const downloadedJSONDataDisplayed = {
        "Dataset name ": datasets.dataset_name,
        "Material ": materialArray(),
        "Publications/Source": {},
        "Authors ": authorArray(),
        "Title ": datasets.reference.title,
        "Year ": datasets.reference.year,
        "Export source ": " databoom.concordia.ca ",
        "Export date ": new Date().toLocaleString(),
        "Variables ": variableArray(),
        "Data ": dataContentArray() + " " + datasets.data.dataPointComments,
        "Comments": datasets.data.comments
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
        //handleTxtDownload()
    )

}
