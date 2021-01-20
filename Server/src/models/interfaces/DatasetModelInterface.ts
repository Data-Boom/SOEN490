export interface IDatasetIDModel {
    dataset_id: number
}

export interface IPublicationModel {
    publication_name: string
    publication_doi: string
    publication_pages: number
    publication_volume: number
    publication_year: number
    publication_datePublished: Date
    publication_dateAccessed: Date
    publisher_name: string
    publicationtype_name: string
    authors: IAuthorModel[]
}

export interface IAuthorModel {
    author_firstName: string
    author_lastName: string
    author_middleName: string
}

export interface IDatasetInfoModel {
    dataset_name: string
    dataset_comments: string
    datasetdatatype_name: string
    category_name: string
    subcategory_name: string
}

export interface IMaterialModel {
    material_details: string
    composition_name: string
}

export interface IDataPointModel {
    datapoints_name: string
    datapoints_values: number[]
    units_units: string
    representations_repr: string
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
