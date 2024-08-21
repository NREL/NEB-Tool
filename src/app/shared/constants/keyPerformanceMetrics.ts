import { getGUID } from "../helpFunctions";
import { KeyPerformanceIndicatorValue } from "./keyPerformanceIndicatorOptions";

export function getPerformanceMetrics(keyPerformanceIndicatorValue: KeyPerformanceIndicatorValue, kpiGuid: string): Array<KeyPerformanceMetric> {
    if (keyPerformanceIndicatorValue != 'other') {
        let filteredMetricOptions: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions.filter(metric => {
            return metric.kpiValue == keyPerformanceIndicatorValue;
        });
        return filteredMetricOptions.map(option => {
            return {
                ...option,
                baselineValue: undefined,
                costPerValue: undefined,
                baselineCost: undefined,
                isCustom: false,
                kpiGuid: kpiGuid,
                guid: getGUID()

            }
        })
    } else {
        let customKPM: KeyPerformanceMetric = getCustomKPM(keyPerformanceIndicatorValue, kpiGuid);
        return [customKPM]
    }
}

export function getCustomKPM(keyPerformanceIndicatorValue: KeyPerformanceIndicatorValue, kpiGuid: string): KeyPerformanceMetric {
    return {
        label: 'Custom KPM',
        htmlLabel: 'Custom KPM',
        value: 'custom',
        kpiValue: keyPerformanceIndicatorValue,
        isQuantitative: true,
        baselineValue: undefined,
        costPerValue: undefined,
        totalUnit: 'unit',
        baselineCost: undefined,
        isCustom: true,
        kpiGuid: kpiGuid,
        guid: getGUID()
    }

}

export type KeyPerformanceMetricValue =
    'contributeCompanyVision' |
    'salesGrowth' |
    'customerSatisfactionRatings' |
    'customerChurnRate' |
    'supplierSatisfactionRatings' |
    'lostCustomerSales' |
    'productivityRateThroughput' |
    'productionCosts' |
    'cycleTimeToMakeGoods' |
    'percentOnTimeToDueDate' |
    'revenuePerEmployee' |
    'perUnitProductCost' |
    'workInProcess' |
    'numberEquipmentCausedDefects' |
    'equipmentDowntime' |
    'percentCapacityUtilization' |
    'overallEquipmentEffectiveness' |
    'forkTruckBreakdownTime' |
    'usefulEquipmentLifeExtended' |
    'timeToIntroduceNewProducts' |
    'defectiveProductionDollar' |
    'defectRatePPMorDPM' |
    'qualityCustomerComplaints' |
    'qualityCustomerReturns' |
    'percentProductionYield' |
    'percentShrinkage' |
    'dollarConsumables' |
    'percentOptimizedSpace' |
    'maintenanceCost' |
    'engineeringSupport' |
    'energyCostPerUnit' |
    'hazardousDisposalCosts' |
    'nonHazardousDisposalCosts' |
    'percentTotalOrCost' |
    'consumptionCostWater' |
    'consumptionCostSewage' |
    'percentOrTotalChemicalEmissions' |
    'percentOrTotalRefrigerantEmissions' |
    'TRIR' |
    'oshaRecordableIncidents' |
    'oshaNonRecordables' |
    'daysAwayFromWork' |
    'lostTimeInjuryRate' |
    'hearingConservationProgram' |
    'numberOfParticles' |
    'workspaceOrFactoryFloorComfort' |
    'absenteeism' |
    'employeeEngagementSatisfaction' |
    'employeeRetentionRate' |
    'talentTurnoverRate' |
    'totalLbsDust' |
    'custom';


export interface KeyPerformanceMetric extends KeyPerformanceMetricOption {
    baselineValue: number,
    costPerValue: number,
    baselineCost: number,
    isCustom: boolean,
    kpiGuid: string,
    guid: string,
}


export interface KeyPerformanceMetricOption {
    label: string,
    htmlLabel: string,
    value: KeyPerformanceMetricValue,
    kpiValue: KeyPerformanceIndicatorValue,
    isQuantitative: boolean,
    totalUnit?: string
};


export function convertOptionTypeToMetricType(option: KeyPerformanceMetricOption): KeyPerformanceMetric {
    return {
        ...option,
        baselineValue: undefined,
        costPerValue: undefined,
        baselineCost: undefined,
        isCustom: false,
        kpiGuid: undefined,
        guid: undefined,
    }
}


export const KeyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = [
    {
        label: "Contribution to company's vision or strategy",
        htmlLabel: "Contribution to company's vision or strategy",
        value: "contributeCompanyVision",
        kpiValue: "strategicRelationshipImpact",
        isQuantitative: false,
    },
    {
        label: "Sales growth ($)",
        htmlLabel: "Sales growth (&dollar;)",
        value: "salesGrowth",
        kpiValue: "strategicRelationshipImpact",
        isQuantitative: false,
    },
    {
        label: "Customer Satisfaction Ratings",
        htmlLabel: "Customer Satisfaction Ratings",
        value: "customerSatisfactionRatings",
        kpiValue: "strategicRelationshipImpact",
        isQuantitative: false,
    },
    {
        label: "Lost Customer Sales ($)",
        htmlLabel: "Lost Customer Sales (&dollar;)",
        value: "lostCustomerSales",
        kpiValue: "strategicRelationshipImpact",
        isQuantitative: false,
    },
    {
        label: "Customer Churn Rate",
        htmlLabel: "Customer Churn Rate",
        value: "customerChurnRate",
        kpiValue: "strategicRelationshipImpact",
        isQuantitative: false,
    },
    {
        label: "Supplier Satisfaction Ratings",
        htmlLabel: "Supplier Satisfaction Ratings",
        value: "supplierSatisfactionRatings",
        kpiValue: "strategicRelationshipImpact",
        isQuantitative: false,
    },
    {
        label: "Productivity rate: Throughput",
        htmlLabel: "Productivity rate: Throughput",
        value: "productivityRateThroughput",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Production Costs",
        htmlLabel: "Production Costs",
        value: "productionCosts",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Cycle Time - Time to make goods",
        htmlLabel: "Cycle Time - Time to make goods",
        value: "cycleTimeToMakeGoods",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Percent On time to due date",
        htmlLabel: "&#37; On time to due date",
        value: "percentOnTimeToDueDate",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Revenue ($) / employee",
        htmlLabel: "Revenue (&dollar;) / employee",
        value: "revenuePerEmployee",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Per-unit product cost",
        htmlLabel: "Per-unit product cost",
        value: "perUnitProductCost",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Work in process",
        htmlLabel: "Work in process",
        value: "workInProcess",
        kpiValue: "productivity",
        isQuantitative: false,
    },
    {
        label: "Num. Equipment caused defects",
        htmlLabel: "&num; Equipment caused defects",
        value: "numberEquipmentCausedDefects",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        totalUnit: 'defect',
    },
    {
        label: "Equipment Downtime",
        htmlLabel: "Equipment Downtime",
        value: "equipmentDowntime",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        totalUnit: 'hr',
    },
    {
        label: "Percent Capacity utilization",
        htmlLabel: "&#37; Capacity utilization",
        value: "percentCapacityUtilization",
        kpiValue: "machineUtilization",
        isQuantitative: false,
    },
    {
        label: "Overall Equipment Effectiveness (OEE)",
        htmlLabel: "Overall Equipment Effectiveness (OEE)",
        value: "overallEquipmentEffectiveness",
        kpiValue: "machineUtilization",
        isQuantitative: false,
    },
    {
        label: "Fork truck (industrial trucks) breakdown downtime time",
        htmlLabel: "Fork truck (industrial trucks) breakdown downtime time",
        value: "forkTruckBreakdownTime",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        totalUnit: 'hr',
    },
    {
        label: "Useful equipment life extended (yrs)",
        htmlLabel: "Useful equipment life extended (yrs)",
        value: "usefulEquipmentLifeExtended",
        kpiValue: "machineUtilization",
        isQuantitative: false,
    },
    {
        label: "Time to introduce new products or services",
        htmlLabel: "Time to introduce new products or services",
        value: "timeToIntroduceNewProducts",
        kpiValue: "machineUtilization",
        isQuantitative: false,
    },
    {
        label: "($) Defective Production",
        htmlLabel: "(&dollar;) Defective Production",
        value: "defectiveProductionDollar",
        kpiValue: "quality",
        isQuantitative: true,
        totalUnit: 'product',
    },
    {
        label: "Defect Rate-PPM or DPM",
        htmlLabel: "Defect Rate-PPM or DPM",
        value: "defectRatePPMorDPM",
        kpiValue: "quality",
        isQuantitative: true,
        totalUnit: 'product',
    },
    {
        label: "QTY Customer Complaints (quality)",
        htmlLabel: "QTY Customer Complaints (quality)",
        value: "qualityCustomerComplaints",
        kpiValue: "quality",
        isQuantitative: false,
    },
    {
        label: "$ Customer Returns (quality)",
        htmlLabel: "&#36; Customer Returns (quality)",
        value: "qualityCustomerReturns",
        kpiValue: "quality",
        isQuantitative: true,
        totalUnit: 'return',
    },
    {
        label: "Percent Production (manufacturing) yield",
        htmlLabel: "&#37; Production (manufacturing) yield",
        value: "percentProductionYield",
        kpiValue: "materialUtilization",
        isQuantitative: false,
    },
    {
        label: "Percent Shrinkage",
        htmlLabel: "&#37; Shrinkage",
        value: "percentShrinkage",
        kpiValue: "materialUtilization",
        isQuantitative: false,
    },
    {
        label: "Dollar Consumables",
        htmlLabel: "&#36; Consumables",
        value: "dollarConsumables",
        kpiValue: "materialUtilization",
        isQuantitative: true,
        totalUnit: 'consumable'
    },
    {
        label: "Percent Optimized space",
        htmlLabel: "&#37; Optimized space",
        value: "percentOptimizedSpace",
        kpiValue: "improveSpaceUtilization",
        isQuantitative: true,
        totalUnit: 'ft2',
    },
    {
        label: "Maintenance Cost",
        htmlLabel: "Maintenance Cost",
        value: "maintenanceCost",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: 'hr'
    },
    {
        label: "Engineering support (dollars or hours)",
        htmlLabel: "Engineering support (&#36; or hours)",
        value: "engineeringSupport",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: 'hr'
    },
    {
        label: "Energy Cost per Unit",
        htmlLabel: "Energy Cost per Unit",
        value: "energyCostPerUnit",
        kpiValue: "energyCost",
        isQuantitative: true,
        totalUnit: 'MMBtu'
    },
    {
        label: "Hazardous Disposal Costs",
        htmlLabel: "Hazardous Disposal Costs",
        value: "hazardousDisposalCosts",
        kpiValue: "wasteReductionHazardous",
        isQuantitative: true,
        totalUnit: 'gal'
    },
    {
        label: "Non-Hazardous Disposal Costs",
        htmlLabel: "Non-Hazardous Disposal Costs",
        value: "nonHazardousDisposalCosts",
        kpiValue: "wasteReductionNonHazardous",
        isQuantitative: true,
        totalUnit: 'gal'
    },
    {
        label: "Percent Total or Costs",
        htmlLabel: "&#37; Total or Costs",
        value: "percentTotalOrCost",
        kpiValue: "reduceNonconformingProductWaste",
        isQuantitative: false,
    },
    {
        label: "Consumption Cost",
        htmlLabel: "Consumption Cost",
        value: "consumptionCostWater",
        kpiValue: "waterConsumption",
        isQuantitative: true,
        totalUnit: 'gal'
    },
    {
        label: "Consumption Cost",
        htmlLabel: "Consumption Cost",
        value: "consumptionCostSewage",
        kpiValue: "sewageVolume",
        isQuantitative: true,
        totalUnit: 'gal',
    },
    {
        label: "Percent Total lbs.",
        htmlLabel: "Percent Total lbs.",
        value: "totalLbsDust",
        kpiValue: "dustEmissions",
        isQuantitative: true,
        totalUnit: 'lb',
    },
    {
        label: "Quantity",
        htmlLabel: "Quantity",
        value: "percentOrTotalChemicalEmissions",
        kpiValue: "chemicalEmissions",
        isQuantitative: false,
    },
    {
        label: "Quantity",
        htmlLabel: "Quantity",
        value: "percentOrTotalRefrigerantEmissions",
        kpiValue: "reduceRefrigerantGasEmissions",
        isQuantitative: false,
    },
    {
        label: "(OSHA) Total recordable incident rate (TRIR)",
        htmlLabel: "(OSHA) Total recordable incident rate (TRIR)",
        value: "TRIR",
        kpiValue: "safety",
        isQuantitative: false,
    },
    {
        label: "OSHA Recordable Incidents",
        htmlLabel: "OSHA Recordable Incidents",
        value: "oshaRecordableIncidents",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'incident',
    },
    {
        label: "Total Safety Non-Recordables, Incidents, Near Misses",
        htmlLabel: "Total Safety Non-Recordables, Incidents, Near Misses",
        value: "oshaNonRecordables",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'incident',
    },
    {
        label: "Days away from work",
        htmlLabel: "Days away from work",
        value: "daysAwayFromWork",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'day'
    },
    {
        label: "Lost time inury rate (LTIFR)",
        htmlLabel: "Lost time injury rate (LTIFR)",
        value: "lostTimeInjuryRate",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'day'
    },
    {
        label: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        htmlLabel: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        value: "hearingConservationProgram",
        kpiValue: "safety",
        isQuantitative: false,
    },
    {
        label: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        htmlLabel: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        value: "hearingConservationProgram",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: false,
    },
    {
        label: "Number of particles",
        htmlLabel: "Number of particles",
        value: "numberOfParticles",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: false,
    },
    {
        label: "Workspace or factory floor comfort",
        htmlLabel: "Workspace or factory floor comfort",
        value: "workspaceOrFactoryFloorComfort",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: false,
    },
    {
        label: "Absenteeism",
        htmlLabel: "Absenteeism",
        value: "absenteeism",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: false,
    },
    {
        label: "Employee Engagement/Satisfaction",
        htmlLabel: "Employee Engagement/Satisfaction",
        value: "employeeEngagementSatisfaction",
        kpiValue: "employeeEngagementWorkforceDevelopment",
        isQuantitative: false,
    },
    {
        label: "Employee Retention Rate",
        htmlLabel: "Employee Retention Rate",
        value: "employeeRetentionRate",
        kpiValue: "employeeEngagementWorkforceDevelopment",
        isQuantitative: false,
    },
    {
        label: "Talent Turnover Rate",
        htmlLabel: "Talent Turnover Rate",
        value: "talentTurnoverRate",
        kpiValue: "employeeEngagementWorkforceDevelopment",
        isQuantitative: false,
    },
]