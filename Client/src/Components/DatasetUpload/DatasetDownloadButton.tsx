import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
    datasets: IDatasetModel
}
export const DatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }

    //helper methods
    const variableArray = (): any => {
        var name = " "
        for (var i in datasets.data.variables) {
            name += datasets.data.variables[i].name + ", " //need to add the variable units, how?
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
    const downloadedTxtDataDisplayed: string =
        " Dataset name: " + datasets.dataset_name + "\n " +
        "Material: " + materialArray() + "\n " +
        "Publications/Source: \n " +
        "Authors: " + authorArray() + "\n " +
        "Title: " + datasets.reference.title + "\n " +
        "Year: " + datasets.reference.year + "\n " +
        "Export source: " + " databoom.concordia.ca \n " +
        "Export date: " + new Date().toLocaleString() + "\n " +
        "Variables: " + variableArray() + "\n " +
        "Data: " + dataContentArray() + ", " + datasets.data.dataPointComments + "\n " +
        "Comments: \n" + datasets.data.comments + " \n "


    const handleTxtDownload = () => {
        download("dataset.txt", downloadedTxtDataDisplayed)
    }
    const handleJSONDownload = () => {
        download("dataset.txt", JSON.stringify(downloadedJSONDataDisplayed, null, 4))
    }
    /**
     * const handleCSVDownload= ()=>{
     *      insert csv parsing function
     * }
     * 
     * const handleXLSDownload = ()=>{
     *      insert xls parsing function
     * }
     */
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
    /** ----TO DO once all the file download types are working----
     * 
     * if (fileType: "Txt"){
     *      return handleTxtDownload()
     * }
     * else if (fileType: "JSON"){
     *      return handleJSONDownload()
     * }
     * else if (fileType: "CSV"){
     *      return handleCSVDownload()
     * }
     * else if (fileType: "XLS"){
     *      return handleXLSDownload()
     * }
     */
    return (
        // <Button id="download-txt" onClick={handleTxtDownload} color="primary" variant="contained"> Download </Button>
        handleTxtDownload()
    )

}
