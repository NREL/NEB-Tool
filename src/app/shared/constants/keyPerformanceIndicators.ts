export interface KeyPerformanceIndicator {
    kpiOptionValue: string,
    units: string,
    baselineUsePerYear: number,
    costPerUnit: number,
    isQualitative: boolean,
    category: KPI_Category
};

export function getKeyPerformanceIndicator(kpi_option: KPI_Option): KeyPerformanceIndicator {
    return {
        kpiOptionValue: kpi_option.value,
        units: kpi_option.unitOptions[0],
        baselineUsePerYear: undefined,
        costPerUnit: undefined,
        isQualitative: kpi_option.isQualitative,
        category: kpi_option.category
    }
}

export type KPI_Category = 'Sustainability' | 'Safety' | 'Maintenance' | 'Quality' | 'Employee Retention' | 'Production';
export const KPI_categories: Array<KPI_Category> = ['Sustainability', 'Safety', 'Maintenance', 'Quality', 'Employee Retention', 'Production'];
export interface KPI_Option {
    value: string,
    label: string,
    category: KPI_Category,
    unitOptions: Array<string>,
    isQualitative: boolean
};

export const KPI_Options: Array<KPI_Option> = [
    {
        value: 'electricityUse',
        label: 'Electricity Use',
        category: 'Sustainability',
        isQualitative: true,
        unitOptions: ['kWh']
    },
    {
        value: 'naturalGasUse',
        label: 'Natural Gas Use',
        category: 'Sustainability',
        isQualitative: true,
        unitOptions: ['MMBtu']
    },
    {
        value: 'co2eEmissions',
        label: 'CO<sub>2</sub>e Emissions',
        category: 'Sustainability',
        isQualitative: true,
        unitOptions: ['kg']
    },
    {
        value: 'waterUse',
        label: 'Water Use',
        category: 'Sustainability',
        isQualitative: true,
        unitOptions: ['kgal']
    },
    {
        value: 'sewer',
        label: 'Sewer',
        category: 'Sustainability',
        isQualitative: true,
        unitOptions: ['kgal']
    },
    {
        value: 'accidents',
        label: 'Accidents',
        category: 'Safety',
        isQualitative: true,
        unitOptions: ['Incidents']
    },
    {
        value: 'newMisses',
        label: 'Near Misses',
        category: 'Safety',
        isQualitative: true,
        unitOptions: ['Incidents']
    },
    {
        value: 'breakdowns',
        label: 'Breakdowns',
        category: 'Maintenance',
        isQualitative: true,
        unitOptions: ['Incidents']
    },
    {
        value: 'production',
        label: 'Production',
        category: 'Production',
        isQualitative: true,
        unitOptions: ['Units']
    },
    {
        value: 'defects',
        label: 'Defects',
        category: 'Quality',
        isQualitative: true,
        unitOptions: ['Units']
    },
    {
        value: 'employeeHappiness',
        label: 'Employee Happiness',
        category: 'Employee Retention',
        isQualitative: false,
        unitOptions: []
    },
];