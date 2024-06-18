import { NebOption, NebOptionValue } from "../shared/constants/nonEnergyBenefitOptions";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbNonEnergyBenefit extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    kpiId: string,
    includeNote: boolean,
    notes: string,
    energyOpportunityId: string,
    annualKpiImpact: number,
    nebOptionValue: NebOptionValue
}

export function getNewIdbNonEnergyBenefit(userId: string, companyId: string, facilityId: string, assessmentId: string, energyOpportunityId: string, nebOption: NebOption): IdbNonEnergyBenefit {
    let nebOptionValue: NebOptionValue;
    let name: string = 'New NEB';
    if(nebOption){
        nebOptionValue = nebOption.optionValue;
        name = nebOption.label;
    }
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: name,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        kpiId: undefined,
        notes: undefined,
        energyOpportunityId: energyOpportunityId,
        includeNote: false,
        annualKpiImpact: undefined,
        nebOptionValue: nebOptionValue
    }
}