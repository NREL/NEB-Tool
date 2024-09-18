import { EnergyUnitOptions, MassUnitOptions, PowerUnitOptions, SteamUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from "./unitOptions";

export type UtilityType = 'Electricity' | 'Natural Gas' | 'Other Fuels' | 'Water' | 'Waste Water' | 'Steam' | 'Compressed Air';
export const UtilityTypes: Array<UtilityType> = ['Electricity', 'Natural Gas', 'Other Fuels', 'Water', 'Waste Water', 'Steam', 'Compressed Air'];

// Define utility type - unit relationship
export interface UtilityOption {
    utilityType: UtilityType,
    energyUnitOptions: Array<UnitOption>,
    energyDefaultUnit: UnitOption,
    powerUnitOptions: Array<UnitOption>,
    powerDefaultUnit: UnitOption
}

const kWh: UnitOption = EnergyUnitOptions.find(unitOption => unitOption.value === 'kWh')!;
const MMBtu: UnitOption = EnergyUnitOptions.find(unitOption => unitOption.value === 'MMBtu')!;
const kgal: UnitOption = VolumeLiquidOptions.find(unitOption => unitOption.value === 'kgal')!;
const klb: UnitOption = MassUnitOptions.find(unitOption => unitOption.value === 'klb')!;
const kSCF: UnitOption = VolumeGasOptions.find(unitOption => unitOption.value === 'kSCF')!;

export const UtilityOptions: Array<UtilityOption> = [
    {
        utilityType: 'Electricity', energyUnitOptions: EnergyUnitOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kWh,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Natural Gas', energyUnitOptions: EnergyUnitOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: MMBtu,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Other Fuels', energyUnitOptions: EnergyUnitOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: MMBtu,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Water', energyUnitOptions: VolumeLiquidOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kgal,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Waste Water', energyUnitOptions: VolumeLiquidOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kgal,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Steam', energyUnitOptions: SteamUnitOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: klb,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Compressed Air', energyUnitOptions: VolumeGasOptions, powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kSCF,
        powerDefaultUnit: undefined
    },
];