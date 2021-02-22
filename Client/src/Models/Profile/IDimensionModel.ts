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

export const Iatm: IUnitModel = {
  name: 'atm',
  id: 0,
  conversionFormula: 'u'
}

export const IkPa: IUnitModel = {
  name: 'kPa',
  id: 1,
  conversionFormula: 'u * 101.325'
}

export const IPsi: IUnitModel = {
  name: 'psi',
  id: 2,
  conversionFormula: 'u * 14.696'
}

export const IPressureModel: IDimensionModel = {
  name: "pressure",
  id: 1,
  baseUnitId: 0,
  units: [Iatm, IkPa, IPsi]
}

export const IKelvin: IUnitModel = {
  name: 'K',
  id: 0,
  conversionFormula: 'u'
}

export const ICelcius: IUnitModel = {
  name: 'C',
  id: 1,
  conversionFormula: 'u + 273.15'
}

export const IFahrenheit: IUnitModel = {
  name: 'F',
  id: 2,
  conversionFormula: '(u − 273.15) × 9/5 + 32'
}

export const ITemperatureModel: IDimensionModel = {
  name: "temperature",
  id: 2,
  baseUnitId: 0,
  units: [IKelvin, ICelcius, IFahrenheit]
}

export const IExampleDimenstions: IDimensionModel[] = [ILengthModel, IPressureModel, ITemperatureModel]