import { KeyPerformanceIndicatorValue } from "./keyPerformanceIndicators2"
import { KeyPerformanceMetricValue } from "./keyPerformanceMetrics"

export interface NebOption {
    label: string,
    value: string,
    riskReduction: boolean,
    valuePropositionIncrease: boolean,
    decreaseCosts: boolean,
    isQualitative: boolean,
    howToCalculate: string,
    KPM: KeyPerformanceMetricValue,
    KPI: KeyPerformanceIndicatorValue
};

export const StrategicRelationshipNEBs: Array<NebOption> = [
    {
        label: "Improved image or reputation",
        value: "improvedImageOrReputation",
        riskReduction: true,
        valuePropositionIncrease: true,
        decreaseCosts: true,
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: "contributeCompanyVision",
        KPI: "strategicRelationshipImpact"
    },
    {
        label: "Increased Productivity",
        value: "increaseProductivity",
        riskReduction: true,
        valuePropositionIncrease: true,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "productivityRateThroughput",
        KPI: "productivity"
    },
    {
        label: "Increased Productivity",
        value: "increasedProductivity",
        riskReduction: true,
        valuePropositionIncrease: true,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "productionCosts",
        KPI: "productivity"
    },
    {
        label: "More productive time equipment is running without nonconforming product",
        value: "moreProductiveEquipment",
        riskReduction: true,
        valuePropositionIncrease: true,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "equipmentDowntime",
        KPI: "machineUtilization"
    },
    {
        label: "Reduced raw material loss",
        value: "reducedRawMaterialLoss",
        riskReduction: false,
        valuePropositionIncrease: true,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "percentProductionYield",
        KPI: "materialUtilization"
    },
    {
        label: "Reduce Energy",
        value: "reduceEnergy",
        riskReduction: true,
        valuePropositionIncrease: false,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "energyCostPerUnit",
        KPI: "energyCost"
    },
    {
        label: "Reduce Hazardous Waste",
        value: "reduceHazardousWaste",
        riskReduction: true,
        valuePropositionIncrease: false,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "disposalCosts",
        KPI: "wasteReductionHazardous"
    },
    {
        label: "Reduce Hazardous Waste",
        value: "reduceHazardousWaste",
        riskReduction: true,
        valuePropositionIncrease: false,
        decreaseCosts: true,
        isQualitative: false,
        howToCalculate: "",
        KPM: "disposalCosts",
        KPI: "wasteReductionHazardous"
    }
]