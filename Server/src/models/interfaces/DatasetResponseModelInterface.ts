export interface IDatasetModel {
    dataset_id: number
    dataset_name: string
    dataset_comments: string
    datasetdatatype_name: string
    category_name: string
    subcategory_name: string
}

export interface IDataPointCommentModel {
    datapointcomments_comments: string[]
    dataset_id: number
}

export interface IDatasetResponseModel {
    publications: IPublicationModel[]
    authors: IAuthorModel[]
    dataset: IDatasetModel[]
    materials: IMaterialModel[]
    dataPoints: IDataPointModel[]
    dataPointComments: IDataPointCommentModel[]
}

export interface IDatasetIDModel {
    dataset_id: number
}

export interface IPublicationModel {
    name: string
    DOI: string
    pages: number
    volume: number
    year: number
    datePublished: Date
    dateAccessed: Date
    publisher: string
    publicationType: string
    authors: IAuthorModel[]
}

export interface IAuthorModel {
    firstName: string
    lastName: string
    middleName: string
}

export interface IDatasetInfoModel {
    name: string
    comments: string
    datasetDataType: string
    category: string
    subcategory: string
}

export interface IMaterialModel {
    details: string
    composition: string
}

export interface IDataPointModel {
    type: string
    values: number[]
    units: string
    representation: string
    dataset_id: number
}

export interface IClientDatasetModel {
    publication: IPublicationModel
    dataset_id: number
    dataset_info: IDatasetInfoModel
    materials: IMaterialModel[]
    dataPoints: IDataPointModel[]
    dataPointComments: string[]
}

