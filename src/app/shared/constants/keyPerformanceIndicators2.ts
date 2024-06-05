export type PrimaryKPI = 'Strategic Relationship Impact' | 'Operations' | 'Sustainability (Environmental Impact)' | 'Employee and Workplace Environment';
export const PrimaryKPIs: Array<PrimaryKPI> = ['Strategic Relationship Impact', 'Operations', 'Sustainability (Environmental Impact)', 'Employee and Workplace Environment']
export type KeyPerformanceIndicatorValue =
    'strategicRelationshipImpact' |
    'productivity' |
    'machineUtilization' |
    'quality' |
    'materialUtilization' |
    'safety' |
    'reduceRefrigerantGasEmissions' |
    'chemicalEmissions' |
    'dustEmissions' |
    'sewageVolume' |
    'waterConsumption' |
    'reduceNonconformingProductWaste' |
    'wasteReductionNonHazardous' |
    'wasteReductionHazardous' |
    'energyCost' |
    'reduceExpenseCost' |
    'improveSpaceUtilization' |
    'employeeEngagementWorkforceDevelopment' |
    'employeeEngagementWorkingEnvironment';

export interface KeyPerformanceIndicator {
    primaryKPI: PrimaryKPI,
    label: string,
    htmlLabel: string,
    value: KeyPerformanceIndicatorValue
};

export const KeyPerformanceIndicators: Array<KeyPerformanceIndicator> = [
    {
        primaryKPI: 'Strategic Relationship Impact',
        label: 'Strategic Relationship Impact',
        htmlLabel: 'Strategic Relationship Impact',
        value: 'strategicRelationshipImpact'
    },
    {
        primaryKPI: 'Operations',
        label: 'Productivity',
        htmlLabel: 'Productivity',
        value: 'productivity'
    },
    {
        primaryKPI: 'Operations',
        label: 'Machine Utilization',
        htmlLabel: 'Machine Utilization',
        value: 'machineUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Quality',
        htmlLabel: 'Quality',
        value: 'quality'
    },
    {
        primaryKPI: 'Operations',
        label: 'Material Utilization',
        htmlLabel: 'Material Utilization',
        value: 'materialUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Improve Space Utilization',
        htmlLabel: 'Improve Space Utilization',
        value: 'improveSpaceUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Reduce Expense Cost',
        htmlLabel: 'Reduce Expense Cost',
        value: 'reduceExpenseCost'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Energy Cost',
        htmlLabel: 'Energy Cost',
        value: 'energyCost'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Waste Reduction: Hazardous',
        htmlLabel: 'Waste Reduction: Hazardous',
        value: 'wasteReductionHazardous'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Waste Reduction: Non-Hazardous',
        htmlLabel: 'Waste Reduction: Non-Hazardous',
        value: 'wasteReductionNonHazardous'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Reduce Nonconforming and Product Waste',
        htmlLabel: 'Reduce Nonconforming &amp; Product Waste',
        value: 'reduceNonconformingProductWaste'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Water Consumption',
        htmlLabel: 'Water Consumption',
        value: 'waterConsumption'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Sewage Volume',
        htmlLabel: 'Sewage Volume',
        value: 'sewageVolume'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Dust Emissions',
        htmlLabel: 'Dust Emissions',
        value: 'dustEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'CO, CO2, NOx, SOx emissions',
        htmlLabel: 'CO, CO<sub>2</sub>, NO<sub>x</sub>, SO<sub>x</sub> emissions',
        value: 'chemicalEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Reduce Refrigerant Gas Emissions',
        htmlLabel: 'Reduce Refrigerant Gas Emissions',
        value: 'reduceRefrigerantGasEmissions'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Safety',
        htmlLabel: 'Safety',
        value: 'safety'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Employee Engagement - Working Environment',
        htmlLabel: 'Employee Engagement - Working Environment',
        value: 'employeeEngagementWorkingEnvironment'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Employee Engagement - Workforce Development',
        htmlLabel: 'Employee Engagement - Workforce Development',
        value: 'employeeEngagementWorkforceDevelopment'
    },
]