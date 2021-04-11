import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { useDimensionsSelector } from '../../../src/Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import React, { useEffect, useState } from 'react'

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

    const variableArray = (): any => {
        var variables = ""
        for (var i in datasets.data.variables) {
            variables += datasets.data.variables[i].name + "  [" + getUnitNameById(dimensions, datasets.data.variables[i].unitId) + "], "
        }
        variables += "comment"
        return variables
    }
    const materialArray = (): any => {
        var materials = ""
        for (var i in datasets.material) {
            materials += datasets.material[i].composition + " \'" + datasets.material[i].details + "\', "
        }
        materials = materials.slice(0, -2)
        return materials
    }
    const authorArray = (): any => {
        var authors = ""
        for (var i in datasets.reference.authors) {
            if (datasets.reference.authors[i].middleName)
                authors += datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].middleName + " " + datasets.reference.authors[i].lastName + ", "
            else
                authors += datasets.reference.authors[i].firstName + " " + datasets.reference.authors[i].lastName + ", "
        }
        authors = authors.slice(0, -2)
        return authors
    }
    const dataContentArray = (): any => {
        var dataPoint = ""
        for (var i in datasets.data.contents) {
            dataPoint += datasets.data.contents[i].point + ", "
            if (datasets.data.dataPointComments)
                dataPoint += datasets.data.dataPointComments[i] + "\n"
            else
                dataPoint = dataPoint.slice(0, -2) + "\n"
        }
        return dataPoint
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
    const downloadedCSVDataDisplayed = (): any => {
        var output =
            "#Dataset name, " + datasets.dataset_name + "\n" +
            "#Material, " + materialArray() + "\n" +
            "#Data type, " + datasets.data_type + "\n" +
            "#Category, " + categoryName() + "\n" +
            "#Subcategory, " + subcategoryName() + "\n" +
            "#\n" +
            "#Publications/Source\n" +
            "#Authors, " + authorArray() + "\n" +
            "#Title, " + datasets.reference.title + "\n" +
            "#Type, " + datasets.reference.type + "\n" +
            "#Publisher, " + datasets.reference.publisher + "\n"
            if (datasets.reference.volume) { output += "#Volume, " + datasets.reference.volume + "\n" }
            if (datasets.reference.pages) { output += "#Pages, " + datasets.reference.pages + "\n" }
            if (datasets.reference.doi) { output += "#DOI, " + datasets.reference.doi + "\n" }
            if (datasets.reference.issue) { output += "#Issue, " + datasets.reference.issue + "\n" }
            output +=
                "#Year, " + datasets.reference.year + "\n" +
                "#\n" +
                "#Export source, " + " databoom.concordia.ca \n" +
                "#Export date, " + new Date().toLocaleString() + "\n" +
                "#\n" +
                variableArray() + "\n" +
                dataContentArray() + "\n" +
                "#Comments: \n" + datasets.data.comments
        return output
    }

    const handleCSVDownload = () => {
        download("csvdataset.csv", downloadedCSVDataDisplayed())
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
    )

}
