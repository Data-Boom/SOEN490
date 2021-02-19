import { IContent, IData, IDatasetModel, IVariable } from "./IDatasetModel"

interface IRemotePublicationModel {
  name: string,
  DOI: string,
  pages: string,
  volume: number,
  issue: number,
  year: number,
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
  name: string,
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
  return remoteDatasets && remoteDatasets.map(remoteDataset => toLocalDatasetModel(remoteDataset)) || []
}

export const toLocalDatasetModel = (remoteDataset: IRemoteDatasetModel): IDatasetModel => {
  if (!remoteDataset) {
    return null
  }
  //todo add comments on the dataset upload form

  const dataset: IDatasetModel = {
    category: remoteDataset.dataset_info.category,
    subcategory: remoteDataset.dataset_info.subcategory,
    data: toLocalDataPoints(remoteDataset.dataPoints || [], remoteDataset.dataPointComments || []),
    data_type: remoteDataset.dataset_info.datasetDataType,
    dataset_name: remoteDataset.dataset_info.name,
    material: remoteDataset.materials,
    reference: {
      authors: remoteDataset.publication.authors,
      doi: remoteDataset.publication.DOI,
      pages: remoteDataset.publication.pages,
      publisher: remoteDataset.publication.publisher,
      title: remoteDataset.publication.name,
      type: remoteDataset.publication.publicationType,
      volume: remoteDataset.publication.volume,
      issue: remoteDataset.publication.issue,
      year: remoteDataset.publication.year,
    }, id: remoteDataset.dataset_id
  }

  return dataset
}

export const toLocalDataPoints = (remotePoints: IRemoteDataPointModel[], dataComments: string[]): IData => {
  const data: IData = {} as any
  data.variables = remotePoints.map((remotePoint) => toVariable(remotePoint))
  data.contents = toContents(remotePoints, dataComments)
  return data
}

const toVariable = (remotePoint: IRemoteDataPointModel): IVariable => {
  return { name: remotePoint.name, units: remotePoint.units, repr: remotePoint.representation }
}

const toContents = (remotePoints: IRemoteDataPointModel[], dataComments: string[]): IContent[] => {
  const contents: IContent[] = []

  const totalContentAmount: number = remotePoints[0].values.length
  for (let i = 0; i < totalContentAmount; i++) {
    contents.push({ point: buildContent(remotePoints, i), comments: dataComments[i] })
  }
  return contents
}

const buildContent = (remotePoints: IRemoteDataPointModel[], rowIndex: number): number[] => {
  const points: number[] = []
  const variableCount: number = remotePoints.length
  for (let i = 0; i < variableCount; i++) {
    const contentPoint = remotePoints[i].values[rowIndex]
    points.push(contentPoint)
  }

  return points
}