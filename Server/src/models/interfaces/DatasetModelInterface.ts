export interface IDatasetIDModel {
    dataset_id: number
}

export interface IPublicationModel {
    title: string
    doi: string
    pages: number
    volume: number
    issue: number
    year: string
    publisher: string
    type: string
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
    unitId: number
    dimensionId: number
    representation: string
    dataset_id: number
}

export interface IClientDatasetModel {
    reference: IPublicationModel
    dataset_id: number
    dataset_info: IDatasetInfoModel
    materials: IMaterialModel[]
    dataPoints: IDataPointModel[]
    dataPointComments: string[]
}

export interface IApprovalDatasetModel extends IClientDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}
