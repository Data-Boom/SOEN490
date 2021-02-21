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
    dataset_name: string
    comments: string
    data_type: string
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
}

export interface IVariable {
    name: string,
    unitId: number,
    dimensionId: number
}

export interface IContent {
    point: number[],
    comments?: string,
}

export interface IData {
    variables: IVariable[],
    contents: IContent[],
    comments: string,
}

export interface IClientDatasetModel {
    reference: IPublicationModel
    id: number
    dataset_name: string
    data_type: string
    category: string
    subcategory: string
    material: IMaterialModel[]
    data: IData
    dataPointComments: string[]
}

export interface IApprovalDatasetModel extends IClientDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}
