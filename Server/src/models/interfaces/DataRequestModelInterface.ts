export interface IDataRequestModel {
    datasetId: number[]
    material: string[]
    firstName: string
    lastName: string
    year: number
    categoryId: number
    subcategoryId: number
}

export interface IUserUploadsModel {
    uploadedBy: number
    favoritesOf: number
}
