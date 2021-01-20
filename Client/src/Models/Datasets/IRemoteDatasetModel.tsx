import { IDatasetModel } from "./IDatasetModel"

export interface IPublicationModel {
  publication_name: string,
  publication_doi: string,
  publication_pages: number,
  publication_volume: number,
  publication_year: number,
  publication_datePublished: Date,
  publication_dateAccessed: Date,
  dataset_id: number,
  publisher_name: string,
  publicationtype_name: string
}

export interface IAuthorModel {
  author_firstName: string,
  author_lastName: string,
  author_middleName: string,
  dataset_id: number
}

export interface IRemoteDatasetModel {
  dataset_id: number,
  dataset_name: string,
  dataset_comments: string,
  datasetdatatype_name: string,
  category_name: string,
  subcategory_name: string
}

export interface IMaterialModel {
  material_details: string,
  composition_name: string,
  dataset_id: number
}

export interface IDataPointModel {
  datapoints_name: string,
  datapoints_values: number[],
  units_units: string,
  representations_repr: string,
  dataset_id: number
}

export interface IDataPointCommentModel {
  datapointcomments_comments: string[],
  dataset_id: number
}

export interface IDatasetResponseModel {
  publications: IPublicationModel[],
  authors: IAuthorModel[],
  dataset: IRemoteDatasetModel[],
  materials: IMaterialModel[],
  dataPoints: IDataPointModel[],
  dataPointComments: IDataPointCommentModel[]
}

export const datasetResponseToDatasetArray = (response: IDatasetResponseModel): IDatasetModel[] => {
  const datasets: IDatasetModel[] = []
  // for (let i = 0; i < response.dataset.length; i++) {
  //   datasets.push({
  //     category: response.dataset[i].category_name,
  //     subcategory: response.dataset[i].subcategory_name,
  //     data: {
  //       comments: response.dataPointComments[i],
  //       variables: response.dataPoints[i].
  //     }
  //   })
  // }

  return []
}