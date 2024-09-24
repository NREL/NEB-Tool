import { getNewIdbEntry, IdbEntry } from "./idbEntry"
import { EquipmentType, EquipmentTypes } from "../shared/constants/equipmentTypes"
import { UtilityType } from "../shared/constants/utilityTypes"

export interface IdbEnergyEquipment extends IdbEntry {
    userId: string,
    facilityId: string,
    companyId: string,
    equipmentName: string,
    notes: string,
    equipmentType: EquipmentType,
    utilityType: UtilityType,
    size: number,
    sizeUnit: string,
    autoCalculate: boolean,
    fuelConsumption: number,
    fuelVolumeUnit: string,
    fuelEnergyUnit: string,
    fuelHHV: number,
    operatingHours: number,
    loadFactor: number,
    efficiency: number,
    numberOfEquipment: number,
    annualEnergyUse: number,
}

export function getNewIdbEnergyEquipment(userId: string, companyId: string, facilityId: string): IdbEnergyEquipment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        equipmentName: 'New Industrial Equipment',
        equipmentType: "Pump",
        utilityType: "Electricity",
        size: 0,
        sizeUnit: "kW",
        autoCalculate: false,
        fuelConsumption: 0,
        fuelHHV: 0,
        fuelVolumeUnit: "gal",
        fuelEnergyUnit: "kWh",
        operatingHours: 0,
        loadFactor: 0,
        efficiency: 0.5,
        numberOfEquipment: 1,
        notes: undefined,
        annualEnergyUse: 0
    }
}