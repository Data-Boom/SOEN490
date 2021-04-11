import { getUnitNameById } from '../../Common/Helpers/DimensionHelpers'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'

export const variableArray = (dimensions: any, datasets: IDatasetModel): any => {
    var variables = ""
    for (var i in datasets.data.variables) {
        variables += datasets.data.variables[i].name + "  [" + getUnitNameById(dimensions, datasets.data.variables[i].unitId) + "], "
    }
    variables += "comment"
    return variables
}
export const materialArray = (datasets: IDatasetModel): any => {
    var materials = ""
    for (var i in datasets.material) {
        materials += datasets.material[i].composition + " \'" + datasets.material[i].details + "\', "
    }
    materials = materials.slice(0, -2)
    return materials
}
export const authorArray = (datasets: IDatasetModel): any => {
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
export const dataContentArray = (datasets: IDatasetModel): any => {
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

export const categoryName = (categories: any, datasets: IDatasetModel) => {
    let category_name: string
    categories.map(category => {
        if (category.id == datasets.category) {
            category_name = category.name
        }
    })
    return category_name
}

export const subcategoryName = (categories: any, datasets: IDatasetModel) => {
    let subcategory_name: string
    let temp
    categories.map(category => {
        if (category.id == datasets.category) {
            temp = category
            temp.subcategories.map(subcategory => {
                if (subcategory.id == datasets.subcategory) {
                    subcategory_name = subcategory.name
                }
            })
        }
    })
    return subcategory_name
}
//stolen from https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
export const download = (filename: string, text: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}