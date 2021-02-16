/*export interface IDimensionModel {
  name: string,
  id?: number,
  baseUnitId: number,
  units: IUnitModel[],
}

export interface IUnitModel {
  name: string,
  id?: number,
  conversionFormula: string,
}*/

import { IDimensionModel, IUnitModel } from "../../../../Server/src/models/interfaces/IDimension"

export const newUnit: IUnitModel = {
  name: '',
  conversionFormula: ''
}

export const IMeters: IUnitModel = {
  name: 'm',
  id: 0,
  conversionFormula: 'u'
}

export const ICentimeters: IUnitModel = {
  name: 'cm',
  id: 1,
  conversionFormula: 'u / 100'
}

export const ILengthModel: IDimensionModel = {
  name: "length",
  id: 0,
  baseUnitId: 0,
  units: [IMeters, ICentimeters]
}

export const IkPa: IUnitModel = {
  name: 'kPa',
  id: 0,
  conversionFormula: 'u'
}

export const Iatm: IUnitModel = {
  name: 'atm',
  id: 1,
  conversionFormula: 'u / 101.325'
}

export const IPressureModel: IDimensionModel = {
  name: "pressure",
  id: 1,
  baseUnitId: 1,
  units: [IkPa, Iatm]
}

export const IExampleDimenstions: IDimensionModel[] = [ILengthModel, IPressureModel]