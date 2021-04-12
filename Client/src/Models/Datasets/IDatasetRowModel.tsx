export interface IDatasetRowModel {
  id: number,
  name: string,
  isInitiallyHidden: boolean,
  color: string,
  shape: string,
}

export const newDatasetRow: IDatasetRowModel = {
  id: null,
  name: null,
  isInitiallyHidden: false,
  color: "#000000",
  shape: "circle"
}

export const shapes: string[] = ["circle", "square", "triangle", "star"]
