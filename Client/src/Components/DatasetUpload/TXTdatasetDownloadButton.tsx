import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useState, useEffect } from 'react'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { variableArray, authorArray, materialArray, dataContentArray, categoryName, subcategoryName, download } from './DownloadHelper'

interface IProps {
    datasets: IDatasetModel
}
export const TXTdatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }
    const dimensions = useDimensionsSelector()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const callListCategories = async () => {
            const getCategories = await listCategories()
            setCategories(getCategories || [])
        }
        callListCategories()
    }, [])

    const downloadedTXTDataDisplayed = (): any => {
        var txtOutput
            =
            "#Dataset name: " + datasets.dataset_name + "\n" +
            "#Material: " + materialArray(datasets) + "\n" +
            "#Data type: " + datasets.data_type + "\n" +
            "#Category: " + categoryName(categories, datasets) + "\n" +
            "#Subcategory: " + subcategoryName(categories, datasets) + "\n" +
            "#\n" +
            "#Publications/Source:\n" +
            "#Authors: " + authorArray(datasets) + "\n" +
            "#Title: " + datasets.reference.title + "\n" +
            "#Type: " + datasets.reference.type + "\n" +
            "#Publisher: " + datasets.reference.publisher + "\n"
        if (datasets.reference.volume) {
            txtOutput += "#Volume: " + datasets.reference.volume + "\n"
        }
        if (datasets.reference.pages) {
            txtOutput += "#Pages: " + datasets.reference.pages + "\n"
        }
        if (datasets.reference.doi) {
            txtOutput += "#DOI: " + datasets.reference.doi + "\n"
        }
        if (datasets.reference.issue) {
            txtOutput += "#Issue: " + datasets.reference.issue + "\n"
        }
        txtOutput +=
            "#Year: " + datasets.reference.year + "\n" +
            "#\n" +
            "#Export source: " + " databoom.concordia.ca \n" +
            "#Export date: " + new Date().toLocaleString() + "\n" +
            "#\n" +
            variableArray(dimensions, datasets) + "\n" +
            dataContentArray(datasets) + "\n" +
            "#Comments: \n" + datasets.data.comments
        return txtOutput

    }
    const handleTxtDownload = async () => {
        download("txtdataset.txt", downloadedTXTDataDisplayed())
    }
    return (
        <Button id="download-txt" onClick={handleTxtDownload} color="primary" variant="contained"> TXT </Button>
    )

}
