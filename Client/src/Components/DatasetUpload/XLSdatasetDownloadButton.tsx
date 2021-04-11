import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'
import * as XLSX from 'xlsx';
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import React, { useEffect, useState } from 'react'

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


    const materialArray = (): any => {
        var name = []
        name.push("Material")
        for (var i in datasets.material) {
            name.push(datasets.material[i].composition + " \'" + datasets.material[i].details + "\'")
        }
        return name
    }
    const authorArray = (): any => {
        var name = []
        name.push("Author")
        for (var i in datasets.reference.authors) {
            if (datasets.reference.authors[i].middleName) {
                name.push(datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].middleName + " " + datasets.reference.authors[i].lastName)
            }
            else {
                name.push(datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].lastName)

            }
        }
        return name
    }
    const variableArray = (): any => {
        var name = []
        for (var i in datasets.data.variables) {
            name.push(datasets.data.variables[i].name + "  [" + getUnitNameById(dimensions, datasets.data.variables[i].unitId) + "] ")
        }
        name.push("comments")
        return name
    }
    const categoryName = () => {
        let cgName = []
        cgName.push("Categories")
        categories.map(category => {
            if (category.id == datasets.category) {
                cgName.push(category.name)
            }
        })
        return cgName
    }
    const subcategoryName = () => {
        let scgName = []
        let cat
        scgName.push("Subcategories")
        categories.map(category => {
            if (category.id == datasets.category) {
                cat = category
                cat.subcategories.map(subcategory => {
                    if (subcategory.id == datasets.subcategory) {
                        scgName.push(subcategory.name)
                    }
                })
            }
        })
        return scgName
    }
    const compileDataArray = (): any => {
        var dataPoint = []
        var allData = []
        allData.push(["Dataset name", datasets.dataset_name])
        allData.push(materialArray())
        allData.push(["Data type", datasets.data_type])
        allData.push(categoryName())
        allData.push(subcategoryName())
        allData.push(["Publication/sources"])
        allData.push(authorArray())
        allData.push(["Title", datasets.reference.title])
        allData.push(["Type", datasets.reference.type])
        allData.push(["Publisher", datasets.reference.publisher])
        if (datasets.reference.volume)
            allData.push(["Volume", datasets.reference.volume])
        if (datasets.reference.pages)
            allData.push(["Pages", datasets.reference.pages])
        if (datasets.reference.doi)
            allData.push(["DOI", datasets.reference.doi])
        if (datasets.reference.issue)
            allData.push(["Issue", datasets.reference.issue])
        allData.push(["Year", datasets.reference.year])
        allData.push([" "])
        allData.push(["Export source ", "databoom.concordia.ca"])
        allData.push(["Export date ", new Date().toLocaleString()])
        allData.push([" "])
        allData.push(variableArray())

        for (var i in datasets.data.contents) {
            dataPoint = []
            for (var j in datasets.data.contents[i].point) {
                dataPoint.push(datasets.data.contents[i].point[j])
            }
            if (datasets.data.dataPointComments)
                dataPoint.push(datasets.data.dataPointComments[i])

            allData.push(dataPoint)
        }
        console.log(allData)
        return allData
    }
    const handleXLSDownload = () => {
        const fileName = "xlsdataset.xls"
        const worksheet = XLSX.utils.aoa_to_sheet(compileDataArray())
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "downloadedXLSDataDisplayed")

        XLSX.writeFile(workbook, fileName)
    }
    return (
        <Button id="download-xls" onClick={handleXLSDownload} color="primary" variant="contained"> XLS </Button>
    )

}
