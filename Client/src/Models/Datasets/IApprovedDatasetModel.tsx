import { IDatasetModel } from "./IDatasetModel"

export interface IApprovedDatasetModel extends IDatasetModel {
    datasetIsFlagged: number
    datasetFlaggedComment: string
}

const IExampleApprovedDatasetModel: IApprovedDatasetModel = {
    datasetIsFlagged: 1,
    datasetFlaggedComment: "yes",
    data: {
        comments: '',
        contents: [],
        variables: []
    },
    data_type: '',
    dataset_name: '',
    material: [],
    reference: {
        authors: [{
            firstName: '',
            lastName: '',
            middleName: ''
        }],
        pages: null,
        publisher: '',
        title: '',
        type: '',
        volume: null,
        issue: null,
        year: 0
    },
    category: null,
    subcategory: null,
    id: undefined
}

export const IExampleApprovedArray: IApprovedDatasetModel[] = [IExampleApprovedDatasetModel]

export interface IFlaggedDatasetQuery {
    datasetId: number,
    flaggedComments?: string,
    additionalComments?: string
}