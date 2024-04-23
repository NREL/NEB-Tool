export interface UnitSettings {
    includeElectricity: boolean,
    electricityUnit: string,
    electricityPrice: number,

    includeNaturalGas: boolean,
    naturalGasUnit: string,
    naturalGasPrice: number,
    
    includeSteam: boolean,
    steamUnit: string,
    steamPrice: number,
    
    includeOtherFuel: boolean,
    otherFuelUnit: string,
    otherFuelPrice: number,

    includeCompressedAir: boolean,
    compressedAirUnit: string,
    compressedAirPrice: number,

}

export function getDefaultUnitSettings(): UnitSettings {
    return {
        //TODO: Default Unit Prices
        includeElectricity: true,
        electricityUnit: 'kWh',
        electricityPrice: 0,
    
        includeNaturalGas: true,
        naturalGasUnit: 'MMBtu',
        naturalGasPrice: 0,
        
        includeSteam: false,
        steamUnit: 'lb',
        steamPrice: 0,
        
        includeOtherFuel: false,
        otherFuelUnit: 'MMBtu',
        otherFuelPrice: 0,
    
        includeCompressedAir: false,
        compressedAirUnit: 'SCF',
        compressedAirPrice: 0,
    }
}