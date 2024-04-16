export interface KeyPerformanceIndicator {
    kpiOptionValue: string,
    units: string,
    baselineUsePerYear: number,
    costPerUnit: number
};

export function getKeyPerformanceIndicator(kpi_option: KPI_Option): KeyPerformanceIndicator {
    return {
        kpiOptionValue: kpi_option.value,
        units: kpi_option.unitOptions[0],
        baselineUsePerYear: undefined,
        costPerUnit: undefined
    }
}

export enum KPI_Category {
    Sustainability = 'Sustainability',
    Safety = 'Safety',
    Maintenance = 'Maintenance',
    Production = 'Production',
    Quality = 'Quality',
    EmployeeRetention = 'Employee Retention'
};

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
        category: KPI_Category.Sustainability,
        isQualitative: true,
        unitOptions: ['kWh']
    },
    {
        value: 'naturalGasUse',
        label: 'Natural Gas Use',
        category: KPI_Category.Sustainability,
        isQualitative: true,
        unitOptions: ['MMBtu']
    },
    {
        value: 'co2eEmissions',
        label: 'CO<sub>2</sub>e Emissions',
        category: KPI_Category.Sustainability,
        isQualitative: true,
        unitOptions: ['kg']
    },
    {
        value: 'waterUse',
        label: 'Water Use',
        category: KPI_Category.Sustainability,
        isQualitative: true,
        unitOptions: ['kgal']
    },
    {
        value: 'sewer',
        label: 'Sewer',
        category: KPI_Category.Sustainability,
        isQualitative: true,
        unitOptions: ['kgal']
    },
    {
        value: 'accidents',
        label: 'Accidents',
        category: KPI_Category.Safety,
        isQualitative: true,
        unitOptions: ['Incidents']
    },
    {
        value: 'newMisses',
        label: 'Near Misses',
        category: KPI_Category.Safety,
        isQualitative: true,
        unitOptions: ['Incidents']
    },
    {
        value: 'breakdowns',
        label: 'Breakdowns',
        category: KPI_Category.Maintenance,
        isQualitative: true,
        unitOptions: ['Incidents']
    },
    {
        value: 'production',
        label: 'Production',
        category: KPI_Category.Production,
        isQualitative: true,
        unitOptions: ['Units']
    },
    {
        value: 'defects',
        label: 'Defects',
        category: KPI_Category.Quality,
        isQualitative: true,
        unitOptions: ['Units']
    },
    {
        value: 'employeeHappiness',
        label: 'Employee Happines',
        category: KPI_Category.EmployeeRetention,
        isQualitative: false,
        unitOptions: []
    },
];