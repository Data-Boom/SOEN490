import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'

interface IProps {
    datasets: IDatasetModel
}
export const TXTdatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }
    const dimensions = useDimensionsSelector()

    //helper methods
    const variableArray = (): any => {
        var name = " "
        for (var i in datasets.data.variables) {
            name += " " + datasets.data.variables[i].name + "  [" + getUnitNameById(dimensions, datasets.data.variables[i].unitId) + "], "
        }
        return name
    }
    const materialArray = (): any => {
        var name = " "
        for (var i in datasets.material) {
            name += datasets.material[i].composition + " ' " + datasets.material[i].details + " ', "
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
            name += datasets.data.contents[i].point + ",  "
        }
        return name
    }

    const downloadedTxtDataDisplayed: string =
        "#Dataset name: " + datasets.dataset_name + "\n " +
        "#Material: " + materialArray() + "\n " +
        "#Data type: " + datasets.data_type + "\n " +
        "#Category: " + datasets.category + "\n " +
        "#Subcategory: " + datasets.subcategory + "\n " +
        "#\n" +
        "#Publications/Source:\n " +
        "#Authors: " + authorArray() + "\n " +
        "#Title: " + datasets.reference.title + "\n " +
        "#Type: " + datasets.reference.type + "\n " +
        "#Publisher: " + datasets.reference.publisher + "\n " +
        "#Volume: " + datasets.reference.volume + "\n " +
        "#Pages: " + datasets.reference.pages + "\n " +
        "#DOI: " + datasets.reference.doi + "\n " +
        "#Issue: " + datasets.reference.issue + "\n " +
        "#Year: " + datasets.reference.year + "\n " +
        "# \n" +
        "#Export source: " + " databoom.concordia.ca \n " +
        "#Export date: " + new Date().toLocaleString() + "\n " +
        "# \n" +
        variableArray() + "\n " +
        dataContentArray() + " " + datasets.data.dataPointComments + "\n "
    //"Comments: \n" + datasets.data.comments + " \n "


    const handleTxtDownload = () => {
        download("txtdataset.txt", downloadedTxtDataDisplayed)
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
        <Button id="download-txt" onClick={handleTxtDownload} color="primary" variant="contained"> TXT </Button>
        //handleTxtDownload()
    )

}
