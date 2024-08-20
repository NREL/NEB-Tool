import { EnergyUnitOptions, MassUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from "./unitOptions";

export type UtilityType = 'Electricity' | 'Natural Gas' | 'Other Fuels' | 'Water' | 'Waste Water' | 'Steam' | 'Compressed Air';
export const UtilityTypes: Array<UtilityType> = ['Electricity', 'Natural Gas', 'Other Fuels', 'Water', 'Waste Water', 'Steam', 'Compressed Air'];

// Define utility type - unit relationship
export interface UtilityOption {
    utilityType: UtilityType,
    unitOptions: Array<UnitOption>
}

export const utilityOptions: Array<UtilityOption> = [
    {utilityType: 'Electricity', unitOptions: EnergyUnitOptions},
    {utilityType: 'Natural Gas', unitOptions: EnergyUnitOptions},
    {utilityType: 'Other Fuels', unitOptions: EnergyUnitOptions},
    {utilityType: 'Water', unitOptions: VolumeLiquidOptions},
    {utilityType: 'Waste Water', unitOptions: VolumeLiquidOptions},
    {utilityType: 'Steam', unitOptions: MassUnitOptions},
    {utilityType: 'Compressed Air', unitOptions: VolumeGasOptions},
];