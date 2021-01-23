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
    mode: string,
    zoom: number,
    units: any
}