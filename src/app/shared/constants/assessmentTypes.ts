import { UnitOption } from "../shared-settings-forms/units-form/unitOptions";
import { UtilityType } from "./utilityTypes";

export type AssessmentType = "Pump" | "Fan" | "Process heating" | "Steam" | "Compressed Air" | "Water" | "Treasure Hunt" | "Other";
export const assessmentTypes: Array<AssessmentType> = ["Pump",  "Fan", "Process heating", "Steam", "Compressed Air", "Water", "Treasure Hunt", "Other"];

export interface assessmentOption {
    assessmentType: AssessmentType,
    utilityTypes: Array<UtilityType>,
    unitOptions: Array<UnitOption>
}

