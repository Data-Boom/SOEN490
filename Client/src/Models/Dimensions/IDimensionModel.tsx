export interface IDimensionModel {
  name: string,
  id?: number,
  baseUnitId?: number,
  units?: IUnitModel[],
}

export interface IUnitModel {
  name: string,
  id?: number,
  conversionFormula: string
}

export const newUnit: IUnitModel = {
  conversionFormula: '',
  name: ''
}