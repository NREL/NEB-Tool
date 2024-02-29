export interface UnitSettings {
    unitsOfMeasure: 'Imperial' | 'Metric' | 'Custom',
    electricityUnit: string,
    energyUnit: string,
    volumeGasUnit: string,
    volumeLiquidUnit: string,
    massUnit: string
}

export function getDefaultUnitSettings(): UnitSettings {
    return {
        unitsOfMeasure: 'Imperial',
        electricityUnit: 'kWh',
        energyUnit: 'kWh',
        volumeGasUnit: 'SCF',
        volumeLiquidUnit: 'gal',
        massUnit: 'lb'
    }
}