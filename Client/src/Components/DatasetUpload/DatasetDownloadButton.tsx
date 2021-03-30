import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
    datasets: IDatasetModel
}
export const DatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }

    //helper methods
    const vArray = (): any => {
        var name = " "
        for (var i in datasets.data.variables) {
            name += datasets.data.variables[i].name + ", " //need to add the variable units, how?
        }
        return name
    }
    const mArray = (): any => {
        var name = " "
        for (var i in datasets.material) {
            name += datasets.material[i].composition + " " + datasets.material[i].details + ", "
        }
        return name
    }
    const authArray = (): any => {
        var name = " "
        for (var i in datasets.reference.authors) {
            name += datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].lastName + " "
        }
        return name
    }
    const dArray = (): any => {
        var name = " "
        for (var i in datasets.data.contents) {
            name += datasets.data.contents[i].point + " "
        }
        return name
    }

    const hardCodedShit = {
        "Dataset name": datasets.dataset_name,
        "Material": mArray(),
        "Publications/Source": {},
        "Authors": authArray(),
        "Title": datasets.reference.title,
        //"Journal": datasets.reference.
        "Year": datasets.reference.year,
        "Export source": " databoom.concordia.ca",
        "Export date": new Date().toLocaleString(),
        "Variables": vArray(),
        "data": dArray()
    }

    const handleJsonDownload = () => {
        download("dataset.txt", JSON.stringify(hardCodedShit, null, 4))
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
        <Button id="download-txt" onClick={handleJsonDownload} color="primary" variant="contained"> Download </Button>
    )

}
