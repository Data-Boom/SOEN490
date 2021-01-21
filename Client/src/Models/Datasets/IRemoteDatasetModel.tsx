import { IContent, IData, IDatasetModel, IVariable } from "./IDatasetModel"

interface IRemotePublicationModel {
  name: string,
  DOI: string,
  pages: number,
  volume: number,
  year: number,
  datePublished: Date,
  dateAccessed: Date,
  publisher: string,
  publicationType: string,
  authors: IRemoteAuthorModel[],
}

interface IRemoteAuthorModel {
  firstName: string,
  lastName: string,
  middleName: string
}

interface IRemoteDatasetInfoModel {
  name: string,
  comments: string,
  datasetDataType: string,
  category: string,
  subcategory: string,
}

interface IRemoteMaterialModel {
  details: string,
  composition: string,
}

interface IRemoteDataPointModel {
  type: string,
  values: number[],
  units: string,
  representation: string,
  dataset_id: number,
}

export interface IRemoteDatasetModel {
  publication: IRemotePublicationModel,
  dataset_id: number,
  dataset_info: IRemoteDatasetInfoModel,
  materials: IRemoteMaterialModel[],
  dataPoints: IRemoteDataPointModel[],
  dataPointComments: string[],
}

export const toLocalDatasets = (remoteDatasets: IRemoteDatasetModel[]): IDatasetModel[] => {
  return remoteDatasets.map(remoteDataset => toLocalDatasetModel(remoteDataset))
}

export const toLocalDatasetModel = (remoteDataset: IRemoteDatasetModel): IDatasetModel => {
  if (!remoteDataset) {
    return null
  }
  //todo add comments on the dataset upload form

  const dataset: IDatasetModel = {
    category: remoteDataset.dataset_info.category,
    subcategory: remoteDataset.dataset_info.subcategory,
    data: toLocalDataPoints(remoteDataset.dataPoints, remoteDataset.dataPointComments),
    data_type: remoteDataset.dataset_info.datasetDataType,
    dataset_name: remoteDataset.dataset_info.name,
    material: remoteDataset.materials,
    reference: {
      authors: remoteDataset.publication.authors,
      pages: remoteDataset.publication.pages,
      publisher: remoteDataset.publication.publisher,
      title: remoteDataset.publication.name,
      type: remoteDataset.publication.publicationType,
      volume: remoteDataset.publication.volume,
      year: remoteDataset.publication.year,
    },
    dataset_id: remoteDataset.dataset_id
  }

  return dataset
}

const toLocalDataPoints = (remotePoints: IRemoteDataPointModel[], dataComments: string[]): IData => {
  const data: IData = {} as any
  data.variables = remotePoints.map((remotePoint) => toVariable(remotePoint))
  data.contents = toContents(remotePoints, dataComments)
  return data
}

const toVariable = (remotePoint: IRemoteDataPointModel): IVariable => {
  return { name: remotePoint.type, units: remotePoint.units, repr: remotePoint.representation }
}

const toContents = (remotePoint: IRemoteDataPointModel[], dataComments: string[]): IContent[] => {
  const contents: IContent[] = []

  for (let i = 0; i < remotePoint.length; i++) {
    contents.push({ point: remotePoint[i].values, comments: dataComments[i] })
  }
  return contents
}