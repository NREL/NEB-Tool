import { UtilityType, UtilityTypes } from "./utilityTypes";

export type AssessmentType = "Pump" | "Fan" | "Process heating" | "Steam" | "Compressed Air" | "Water" | "Treasure Hunt" | "Other";
export const assessmentTypes: Array<AssessmentType> = ["Pump",  "Fan", "Process heating", "Steam", "Compressed Air", "Water", "Treasure Hunt", "Other"];

// Define the ONE - MANY relationship between Assessment Type and Utility Type
export interface assessmentOption {
    assessmentType: AssessmentType,
    utilityTypes: Array<UtilityType>
}

export const assessmentOptions: Array<assessmentOption> = [
    {assessmentType: "Pump", utilityTypes: ['Electricity']},
    {assessmentType: "Fan", utilityTypes: ['Electricity']},
    {assessmentType: "Process heating", utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity']},
    {assessmentType: "Steam", utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity']},
    {assessmentType: "Compressed Air", utilityTypes: ['Electricity']},
    {assessmentType: "Water", utilityTypes: ['Water']},
    {assessmentType: "Treasure Hunt", utilityTypes: UtilityTypes},
    {assessmentType: "Other", utilityTypes: UtilityTypes}
];