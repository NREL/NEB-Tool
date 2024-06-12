import { KeyPerformanceIndicatorValue } from "./KeyPerformanceIndicatorOption";

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
    'disposalCosts' |
    'percentTotalOrCost' |
    'consumptionCost' |
    'quantity' |
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
    'talentTurnoverRate';


export interface KeyPerformanceMetric {
    label: string,
    htmlLabel: string,
    value: KeyPerformanceMetricValue,
    kpiValue: KeyPerformanceIndicatorValue
};



export const KeyPerformanceMetrics: Array<KeyPerformanceMetric> = [
    {
        label: "Contribution to company's vision or strategy",
        htmlLabel: "Contribution to company's vision or strategy",
        value: "contributeCompanyVision",
        kpiValue: "strategicRelationshipImpact"
    },
    {
        label: "Sales growth ($)",
        htmlLabel: "Sales growth (&dollar;)",
        value: "salesGrowth",
        kpiValue: "strategicRelationshipImpact"
    },
    {
        label: "Customer Satisfaction Ratings",
        htmlLabel: "Customer Satisfaction Ratings",
        value: "customerSatisfactionRatings",
        kpiValue: "strategicRelationshipImpact"
    },
    {
        label: "Lost Customer Sales ($)",
        htmlLabel: "Lost Customer Sales (&dollar;)",
        value: "lostCustomerSales",
        kpiValue: "strategicRelationshipImpact"
    },
    {
        label: "Customer Churn Rate",
        htmlLabel: "Customer Churn Rate",
        value: "customerChurnRate",
        kpiValue: "strategicRelationshipImpact"
    },
    {
        label: "Supplier Satisfaction Ratings",
        htmlLabel: "Supplier Satisfaction Ratings",
        value: "supplierSatisfactionRatings",
        kpiValue: "strategicRelationshipImpact"
    },
    {
        label: "Productivity rate: Throughput",
        htmlLabel: "Productivity rate: Throughput",
        value: "productivityRateThroughput",
        kpiValue: "productivity"
    },
    {
        label: "Production Costs",
        htmlLabel: "Production Costs",
        value: "productionCosts",
        kpiValue: "productivity"
    },
    {
        label: "Cycle Time - Time to make goods",
        htmlLabel: "Cycle Time - Time to make goods",
        value: "cycleTimeToMakeGoods",
        kpiValue: "productivity"
    },
    {
        label: "Percent On time to due date",
        htmlLabel: "&percent; On time to due date",
        value: "percentOnTimeToDueDate",
        kpiValue: "productivity"
    },
    {
        label: "Revenue ($) / employee",
        htmlLabel: "Revenue (&dollar;) / employee",
        value: "revenuePerEmployee",
        kpiValue: "productivity"
    },
    {
        label: "Per-unit product cost",
        htmlLabel: "Per-unit product cost",
        value: "perUnitProductCost",
        kpiValue: "productivity"
    },
    {
        label: "Work in process",
        htmlLabel: "Work in process",
        value: "workInProcess",
        kpiValue: "productivity"
    },
    {
        label: "Num. Equipment caused defects",
        htmlLabel: "&num; Equipment caused defects",
        value: "numberEquipmentCausedDefects",
        kpiValue: "machineUtilization"
    },
    {
        label: "Equipment Downtime",
        htmlLabel: "Equipment Downtime",
        value: "equipmentDowntime",
        kpiValue: "machineUtilization"
    },
    {
        label: "Percent Capacity utilization",
        htmlLabel: "&percent; Capacity utilization",
        value: "percentCapacityUtilization",
        kpiValue: "machineUtilization"
    },
    {
        label: "Overall Equipment Effectiveness (OEE)",
        htmlLabel: "Overall Equipment Effectiveness (OEE)",
        value: "overallEquipmentEffectiveness",
        kpiValue: "machineUtilization"
    },
    {
        label: "Fork truck (industrial trucks) breakdown downtime time",
        htmlLabel: "Fork truck (industrial trucks) breakdown downtime time",
        value: "forkTruckBreakdownTime",
        kpiValue: "machineUtilization"
    },
    {
        label: "Useful equipment life extended (yrs)",
        htmlLabel: "Useful equipment life extended (yrs)",
        value: "usefulEquipmentLifeExtended",
        kpiValue: "machineUtilization"
    },
    {
        label: "Time to introduce new products or services",
        htmlLabel: "Time to introduce new products or services",
        value: "timeToIntroduceNewProducts",
        kpiValue: "machineUtilization"
    },
    {
        label: "($) Defective Production",
        htmlLabel: "(&dollar;) Defective Production",
        value: "defectiveProductionDollar",
        kpiValue: "quality"
    },
    {
        label: "Defect Rate-PPM or DPM",
        htmlLabel: "Defect Rate-PPM or DPM",
        value: "defectRatePPMorDPM",
        kpiValue: "quality"
    },
    {
        label: "QTY Customer Complaints (quality)",
        htmlLabel: "QTY Customer Complaints (quality)",
        value: "qualityCustomerComplaints",
        kpiValue: "quality"
    },
    {
        label: "$ Customer Returns (quality)",
        htmlLabel: "$dollar; Customer Returns (quality)",
        value: "qualityCustomerReturns",
        kpiValue: "quality"
    },
    {
        label: "Percent Production (manufacturing) yield",
        htmlLabel: "&percent; Production (manufacturing) yield",
        value: "percentProductionYield",
        kpiValue: "quality"
    },
    {
        label: "Percent Shrinkage",
        htmlLabel: "&percent; Shrinkage",
        value: "percentShrinkage",
        kpiValue: "quality"
    },
    {
        label: "Dollar Consumables",
        htmlLabel: "&dollar; Consumables",
        value: "dollarConsumables",
        kpiValue: "quality"
    },
    {
        label: "Percent Optimized space",
        htmlLabel: "&percent; Optimized space",
        value: "percentOptimizedSpace",
        kpiValue: "improveSpaceUtilization"
    },
    {
        label: "Maintenance Cost",
        htmlLabel: "Maintenance Cost",
        value: "maintenanceCost",
        kpiValue: "reduceExpenseCost"
    },
    {
        label: "Engineering support (dollars or hours)",
        htmlLabel: "Engineering support (&dollar; or hours)",
        value: "engineeringSupport",
        kpiValue: "reduceExpenseCost"
    },
    {
        label: "Energy Cost per Unit",
        htmlLabel: "Energy Cost per Unit",
        value: "energyCostPerUnit",
        kpiValue: "energyCost"
    },
    {
        label: "Disposal Costs",
        htmlLabel: "Disposal Costs",
        value: "disposalCosts",
        kpiValue: "wasteReductionHazardous"
    },
    {
        label: "Disposal Costs",
        htmlLabel: "Disposal Costs",
        value: "disposalCosts",
        kpiValue: "wasteReductionNonHazardous"
    },
    {
        label: "Percent Total or Costs",
        htmlLabel: "&percent; Total or Costs",
        value: "percentTotalOrCost",
        kpiValue: "reduceNonconformingProductWaste"
    },
    {
        label: "Consumption Cost",
        htmlLabel: "Consumption Cost",
        value: "consumptionCost",
        kpiValue: "waterConsumption"
    },
    {
        label: "Consumption Cost",
        htmlLabel: "Consumption Cost",
        value: "consumptionCost",
        kpiValue: "sewageVolume"
    },
    {
        label: "Quantity",
        htmlLabel: "Quantity",
        value: "quantity",
        kpiValue: "chemicalEmissions"
    },
    {
        label: "Quantity",
        htmlLabel: "Quantity",
        value: "quantity",
        kpiValue: "reduceRefrigerantGasEmissions"
    },
    {
        label: "(OSHA) Total recordable incident rate (TRIR)",
        htmlLabel: "(OSHA) Total recordable incident rate (TRIR)",
        value: "TRIR",
        kpiValue: "safety"
    },
    {
        label: "OSHA Recordable Incidents",
        htmlLabel: "OSHA Recordable Incidents",
        value: "oshaRecordableIncidents",
        kpiValue: "safety"
    },
    {
        label: "Total Safety Non-Recordables, Incidents, Near Misses",
        htmlLabel: "Total Safety Non-Recordables, Incidents, Near Misses",
        value: "oshaNonRecordables",
        kpiValue: "safety"
    },
    {
        label: "Days away from work",
        htmlLabel: "Days away from work",
        value: "daysAwayFromWork",
        kpiValue: "safety"
    },
    {
        label: "Lost time inury rate (LTIFR)",
        htmlLabel: "Lost time injury rate (LTIFR)",
        value: "lostTimeInjuryRate",
        kpiValue: "safety"
    },
    {
        label: "Hearing Conservation Program Copmliance - Reduce Occupational Exposure",
        htmlLabel: "Hearing Conservation Program Copmliance - Reduce Occupational Exposure",
        value: "hearingConservationProgram",
        kpiValue: "safety"
    },
    {
        label: "Hearing Conservation Program Copmliance - Reduce Occupational Exposure",
        htmlLabel: "Hearing Conservation Program Copmliance - Reduce Occupational Exposure",
        value: "hearingConservationProgram",
        kpiValue: "employeeEngagementWorkingEnvironment"
    },
    {
        label: "Number of particles",
        htmlLabel: "Number of particles",
        value: "numberOfParticles",
        kpiValue: "employeeEngagementWorkingEnvironment"
    },
    {
        label: "Workspace or factory floor comfort",
        htmlLabel: "Workspace or factory floor comfort",
        value: "workspaceOrFactoryFloorComfort",
        kpiValue: "employeeEngagementWorkingEnvironment"
    },
    {
        label: "Absenteeism",
        htmlLabel: "Absenteeism",
        value: "absenteeism",
        kpiValue: "employeeEngagementWorkingEnvironment"
    },
    {
        label: "Employee Engagement/Satisfaction",
        htmlLabel: "Employee Engagement/Satisfaction",
        value: "employeeEngagementSatisfaction",
        kpiValue: "employeeEngagementWorkforceDevelopment"
    },
    {
        label: "Employee Retention Rate",
        htmlLabel: "Employee Retention Rate",
        value: "employeeRetentionRate",
        kpiValue: "employeeEngagementWorkforceDevelopment"
    },
    {
        label: "Talent Turnover Rate",
        htmlLabel: "Talent Turnover Rate",
        value: "talentTurnoverRate",
        kpiValue: "employeeEngagementWorkforceDevelopment"
    },
]