export interface IVariableModel {
    type: string,
    variableNames: string[],
    units: string[]
}

export const IWidthModel: IVariableModel = {
    type: 'initial pressure',
    variableNames: ['cell length', 'cell width', 'critical tube diameter', 'minimum tube diameter'],
    units: ['kPa', 'cm', 'm']
}

export const ITemperatureModel: IVariableModel = {
    type: 'initial temperature',
    variableNames: ['initial temperature', 'temperature'],
    units: ['K', "°C"]
}

export const IVelocityModel: IVariableModel = {
    type: 'equivalence ratio',
    variableNames: ['velocity', 'shock velocity', 'particle velocity'],
    units: ['N/A', 'mm/μs', 'm/s']
}

export const IPressureModel: IVariableModel = {
    type: 'percent He',
    variableNames: ['pressure', 'initial pressure'],
    units: ['N/A', 'MPa', 'GPa', 'bar', 'atm']
}

export const IDensityModel: IVariableModel = {
    type: 'cell width',
    variableNames: ['density', 'initial density'],
    units: ['mm', 'g/cc']
}

export const IUnitlessModel: IVariableModel = {
    type: 'unitless',
    variableNames: ['equivalence ratio', 'dilution ratio', 'mole fraction', 'compression ratio'],
    units: ['N/A']
}

export const IPercentageModel: IVariableModel = {
    type: 'percentage',
    variableNames: ['percent N2', 'percent air', 'percent steam', 'percent Ar',
        'percent He', 'percent CO2', 'percent He and CO2', 'percent He and H2O',
        'percent C2H4', 'percent H2', 'percent C2H2', 'percent CO', 'percent CF3H',
        'percent CF4', 'percent additive'],
    units: ['%']
}

export const ISpecificVolumeModel: IVariableModel = {
    type: 'specific volume',
    variableNames: ['specific volume'],
    units: ['cc/g', 'm^3/kg']
}

export const IEnergyModel: IVariableModel = {
    type: 'energy',
    variableNames: ['critical energy', 'cylindrical critical energy'],
    units: ['j']
}

export const IChargeModel: IVariableModel = {
    type: 'charge',
    variableNames: ['critical charge'],
    units: ['kg tetryl']
}


export const IVariableUnits: IVariableModel[] = [IWidthModel, ITemperatureModel, IVelocityModel, IPressureModel, IDensityModel, IUnitlessModel, IPercentageModel, ISpecificVolumeModel, IEnergyModel, IChargeModel]