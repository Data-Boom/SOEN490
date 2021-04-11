import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { useDimensionsSelector } from '../../../src/Stores/Slices/DimensionsSlice'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import React, { useEffect, useState } from 'react'
import { variableArray, authorArray, materialArray, dataContentArray, download, categoryName, subcategoryName } from './DownloadHelper'


interface IProps {
    datasets: IDatasetModel
}
export const CSVdatasetDownloadButton = (props: IProps) => {
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

    const downloadedCSVDataDisplayed = (): any => {
        var csvOutput
            =
            "#Dataset name, " + datasets.dataset_name + "\n" +
            "#Material, " + materialArray(datasets) + "\n" +
            "#Data type, " + datasets.data_type + "\n" +
            "#Category, " + categoryName(categories, datasets) + "\n" +
            "#Subcategory, " + subcategoryName(categories, datasets) + "\n" +
            "#\n" +
            "#Publications/Source\n" +
            "#Authors, " + authorArray(datasets) + "\n" +
            "#Title, " + datasets.reference.title + "\n" +
            "#Type, " + datasets.reference.type + "\n" +
            "#Publisher, " + datasets.reference.publisher + "\n"
        if (datasets.reference.volume) {
            csvOutput += "#Volume, " + datasets.reference.volume + "\n"
        }
        if (datasets.reference.pages) {
            csvOutput += "#Pages, " + datasets.reference.pages + "\n"
        }
        if (datasets.reference.doi) {
            csvOutput += "#DOI, " + datasets.reference.doi + "\n"
        }
        if (datasets.reference.issue) {
            csvOutput += "#Issue, " + datasets.reference.issue + "\n"
        }
        csvOutput +=
            "#Year, " + datasets.reference.year + "\n" +
            "#\n" +
            "#Export source, " + " databoom.concordia.ca \n" +
            "#Export date, " + new Date().toLocaleString() + "\n" +
            "#\n" +
            variableArray(dimensions, datasets) + "\n" +
            dataContentArray(datasets) + "\n" +
            "#Comments: \n" + datasets.data.comments
        return csvOutput

    }
    const handleCSVDownload = () => {
        download("csvdataset.csv", downloadedCSVDataDisplayed())
    }
    return (
        <Button id="download-csv" onClick={handleCSVDownload} color="primary" variant="contained"> CSV </Button>
    )

}
