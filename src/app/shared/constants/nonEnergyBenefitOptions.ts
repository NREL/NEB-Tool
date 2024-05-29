import { KeyPerformanceIndicatorValue } from "./keyPerformanceIndicators2"
import { KeyPerformanceMetricValue } from "./keyPerformanceMetrics"

export interface NebOption {
    label: string,
    value: number,
    riskReduction: boolean,
    valuePropositionIncrease: boolean,
    decreaseCosts: boolean,
    isQualitative: boolean,
    howToCalculate: string,
    KPM: KeyPerformanceMetricValue,
    KPI: KeyPerformanceIndicatorValue
};

export const StrategicRelationshipNEBs: Array<NebOption> = [
]