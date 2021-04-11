import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React from 'react'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'
import * as XLSX from 'xlsx';
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { useEffect, useState } from 'react'

interface IProps {
    datasets: IDatasetModel
}

export const XLSdatasetDownloadButton = (props: IProps) => {
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

    const variableArray = (): any => {
        var name = []
        for (var i in datasets.data.variables) {
            name.push(datasets.data.variables[i].name + " " + getUnitNameById(dimensions, datasets.data.variables[i].unitId))
        }
        name.push("comments")
        return name
    }
    const materialArray = (): any => {
        var name = []
        name.push("Material")
        for (var i in datasets.material) {
            name.push(datasets.material[i].composition + " " + datasets.material[i].details)
        }
        return name
    }
    const authorArray = (): any => {
        var name = []
        name.push("Author")
        for (var i in datasets.reference.authors) {
            name.push(datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].lastName)
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
    let cgName: string
    let scgName: string
    let cat
    const categoryName = () => {
        categories.map(category => {
            if (category.id == datasets.category) {
                cgName = category.name
            }
        })
        return cgName
    }

    const subcategoryName = () => {
        categories.map(category => {
            if (category.id == datasets.category) {
                cat = category
                cat.subcategories.map(subcategory => {
                    if (subcategory.id == datasets.subcategory) {
                        scgName = subcategory.name
                    }
                })
            }
        })
        return scgName
    }

    const downloadedXLSDataDisplayed = [
        ["Dataset name", datasets.dataset_name],
        materialArray(),
        ["Data type", datasets.data_type],
        ["Category", categoryName()],
        ["Subcategory ", subcategoryName()],
        ["Publication/sources"],
        authorArray(),
        ["Title ", datasets.reference.title],
        ["Type", datasets.reference.type],
        ["Publisher", datasets.reference.publisher],
        ["Volume", datasets.reference.volume],
        ["Pages ", datasets.reference.pages],
        ["DOI ", datasets.reference.doi],
        ["Issue ", datasets.reference.issue],
        ["Year ", datasets.reference.year],
        [" "],
        ["Export source ", "databoom.concordia.ca"],
        ["Export date ", new Date().toLocaleString()],
        [" "],
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
