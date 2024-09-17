import { EnergyUnitOptions, MassUnitOptions, PowerUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from "./unitOptions";

export type UtilityType = 'Electricity' | 'Natural Gas' | 'Other Fuels' | 'Water' | 'Waste Water' | 'Steam' | 'Compressed Air';
export const UtilityTypes: Array<UtilityType> = ['Electricity', 'Natural Gas', 'Other Fuels', 'Water', 'Waste Water', 'Steam', 'Compressed Air'];

// Define utility type - unit relationship
export interface UtilityOption {
    utilityType: UtilityType,
    energyUnitOptions: Array<UnitOption>,
    powerUnitOptions: Array<UnitOption>
}

export const UtilityOptions: Array<UtilityOption> = [
    {utilityType: 'Electricity', energyUnitOptions: EnergyUnitOptions, powerUnitOptions: PowerUnitOptions},
    {utilityType: 'Natural Gas', energyUnitOptions: EnergyUnitOptions, powerUnitOptions: PowerUnitOptions},
    {utilityType: 'Other Fuels', energyUnitOptions: EnergyUnitOptions, powerUnitOptions: PowerUnitOptions},
    {utilityType: 'Water', energyUnitOptions: VolumeLiquidOptions, powerUnitOptions: PowerUnitOptions},
    {utilityType: 'Waste Water', energyUnitOptions: VolumeLiquidOptions, powerUnitOptions: PowerUnitOptions},
    {utilityType: 'Steam', energyUnitOptions: MassUnitOptions, powerUnitOptions: PowerUnitOptions},
    {utilityType: 'Compressed Air', energyUnitOptions: VolumeGasOptions, powerUnitOptions: PowerUnitOptions},
];