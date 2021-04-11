import { Button } from '@material-ui/core'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'
import { useDimensionsSelector } from '../../Stores/Slices/DimensionsSlice'
import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { download, categoryName, subcategoryName } from './DownloadHelper'

interface IProps {
    datasets: IDatasetModel
}
export const JSONdatasetDownloadButton = (props: IProps) => {
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

    const variableNameArray = (): any => {
        var name = []
        for (var i in datasets.data.variables) {
            name.push(
                {
                    "name": datasets.data.variables[i].name,
                    "units": getUnitNameById(dimensions, datasets.data.variables[i].unitId)
                })
        }
        name.push("comments")
        return name
    }
    const materialArray = (): any => {
        var name = []
        for (var i in datasets.material) {
            name.push(
                {
                    "composition ": datasets.material[i].composition,
                    "details": datasets.material[i].details
                }
            )
        } return name
    }
    const authorArray = (): any => {
        var name = []
        for (var i in datasets.reference.authors) {
            if (datasets.reference.authors[i].middleName) {
                name.push(
                    {
                        "firstname ": datasets.reference.authors[i].firstName,
                        "middlename": datasets.reference.authors[i].middleName,
                        "lastname ": datasets.reference.authors[i].lastName
                    }
                )
            }
            else {
                name.push(
                    {
                        "firstname ": datasets.reference.authors[i].firstName,
                        "lastname ": datasets.reference.authors[i].lastName
                    }
                )
            }

        }
        return name
    }
    const dataContentArray = (): any => {
        var name = []
        for (var i in datasets.data.contents) {
            if (datasets.data.dataPointComments)
                name.push(
                    {
                        "point": datasets.data.contents[i].point,
                        "comment": datasets.data.dataPointComments[i]
                    }
                )
            else
                name.push(
                    {
                        "point": datasets.data.contents[i].point
                    }
                )

        }
        return name
    }
    // let cgName: string
    // let scgName: string
    // let cat
    // const categoryName = () => {
    //     categories.map(category => {
    //         if (category.id == datasets.category) {
    //             cgName = category.name
    //         }
    //     })
    //     return cgName
    // }

    // const subcategoryName = () => {
    //     categories.map(category => {
    //         if (category.id == datasets.category) {
    //             cat = category
    //             cat.subcategories.map(subcategory => {
    //                 if (subcategory.id == datasets.subcategory) {
    //                     scgName = subcategory.name
    //                 }
    //             })
    //         }
    //     })
    //     return scgName
    // }
    const downloadedJSONDataDisplayed =
    {
        "Dataset name ": datasets.dataset_name,
        "Material": materialArray(),
        "Data type": datasets.data_type,
        "Category": categoryName(categories, datasets),
        "Subcategory ": subcategoryName(categories, datasets),
        "reference": {
            "Authors ": [authorArray()],
            "Title ": datasets.reference.title,
            "Type": datasets.reference.type,
            "Publisher": datasets.reference.publisher,
            "Volume, ": datasets.reference.volume,
            "Pages, ": datasets.reference.pages,
            "DOI ": datasets.reference.doi,
            "Issue ": datasets.reference.issue,
            "Year ": datasets.reference.year
        },
        "Export source ": "databoom.concordia.ca",
        "Export date ": new Date().toLocaleString(),
        "Data": {
            "variables": variableNameArray(),
            "contents": dataContentArray(),
            "comments": datasets.data.comments
        }
    }

    const handleJSONDownload = () => {
        download("jsondataset.JSON", JSON.stringify(downloadedJSONDataDisplayed, null, 4))
    }
    return (
        <Button id="download-json" onClick={handleJSONDownload} color="primary" variant="contained"> JSON </Button>
    )

}
