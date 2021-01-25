export interface IGraphStateModel {
    datasets: IDisplayedDatasetModel[],
    name: string,
    axes: IAxisModel[],
    id: string
}

export interface IDisplayedDatasetModel {
    id: number,
    color: string,
    shape: string,
    isHidden: boolean
}

export interface IAxisModel {
    variableName: string,
    logarithmic: boolean,
    zoomStartIndex: number,
    zoomEndIndex: number,
    units: string
}

export interface IUploadGraphModel {
    id: number,
    name: string,
    datasetIds: string[],
    datasetColors: string[],
    datasetShapes: string[],
    datasetHiddenStatus: boolean[],
    axisVariable: string[],
    axisLog: boolean[],
    axisZoomStart: number[],
    axisZoomEnd: number[],
    axisUnits: string[]
}