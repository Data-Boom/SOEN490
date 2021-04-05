import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
    datasets: IDatasetModel
}
export const CSVdatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }

    //helper methods
    const variableArray = (): any => {
        var name = " "
        for (var i in datasets.data.variables) {
            name += "," + datasets.data.variables[i].name + ", " //need to add the variable units, how?
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
            name += "," + datasets.data.contents[i].point + ", \n"
        }
        return name
    }

    const downloadedCSVDataDisplayed: string =
        "Dataset name ," + datasets.dataset_name + "\n " +
        "Material ," + materialArray() + "\n " +
        "Publications/Source: \n " +
        "Authors ," + authorArray() + "\n " +
        "Title , " + datasets.reference.title + "\n " +
        "Year ," + datasets.reference.year + "\n " +
        "Export source ," + " databoom.concordia.ca \n " +
        "Export date ," + new Date().toLocaleString() + "\n " +
        variableArray() + "\n " +
        dataContentArray() + ", " + datasets.data.dataPointComments + "\n " +
        "Comments , \n" + datasets.data.comments + " \n "


    const handleCSVDownload = () => {
        download("csvdataset.csv", downloadedCSVDataDisplayed)
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
        <Button id="download-csv" onClick={handleCSVDownload} color="primary" variant="contained"> CSV </Button>
        //handleTxtDownload()
    )

}
