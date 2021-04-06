import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'
import * as XLSX from 'xlsx';

interface IProps {
    datasets: IDatasetModel
}

export const XLSdatasetDownloadButton = (props: IProps) => {
    const { datasets } = { ...props }
    const dimensions = useDimensionsSelector()

    //helper methods
    const variableArray = (): any => {
        var name = []
        for (var i in datasets.data.variables) {
            name.push(datasets.data.variables[i].name + " " + getUnitNameById(dimensions, datasets.data.variables[i].unitId))
        }
        name.push("comments")
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
        var name = []
        for (var i in datasets.data.contents) {
            name.push(datasets.data.contents[i].point)
        }
        name.push(datasets.data.dataPointComments)
        return name
    }

    const downloadedXLSDataDisplayed = [
        ["Dataset name", datasets.dataset_name],
        ["Material", materialArray()],
        ["Data type", datasets.data_type],
        ["Category", datasets.category],
        ["Subcategory ", datasets.subcategory],
        ["Publication/sources"],
        ["Authors", authorArray()],
        ["Title ", datasets.reference.title],
        ["Type", datasets.reference.type],
        ["Publisher", datasets.reference.publisher],
        ["Volume", datasets.reference.volume],
        ["Pages ", datasets.reference.pages],
        ["DOI ", datasets.reference.doi],
        ["Issue ", datasets.reference.issue],
        ["Year ", datasets.reference.year],
        ["Export source ", "databoom.concordia.ca"],
        ["Export date ", new Date().toLocaleString()],
        variableArray(),
        dataContentArray()
    ]
    const handleXLSDownload = () => {
        const fileName = "xlsdataset.xls"
        const worksheet = XLSX.utils.aoa_to_sheet(downloadedXLSDataDisplayed)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "downloadedXLSDataDisplayed")

        XLSX.writeFile(workbook, fileName)
    }
    return (
        <Button id="download-xls" onClick={handleXLSDownload} color="primary" variant="contained"> XLS </Button>
    )

}
