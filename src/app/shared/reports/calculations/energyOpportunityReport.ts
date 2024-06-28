import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { NebReport, getNebReport } from "./nebReport";

///ENERGY REPORT
export function getEnergyOpportunityReport(energyOpportunity: IdbEnergyOpportunity, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, companyPerformanceMetrics: Array<KeyPerformanceMetric>): EnergyOpportunityReport {
    let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == energyOpportunity.guid
    });
    let nebReports: Array<NebReport> = new Array();
    energyOpportunityNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, companyPerformanceMetrics);
        nebReports.push(nebReport);
    })
    let totalEnergyCostSavings: number = 0;
    if (energyOpportunity.includeSavings && energyOpportunity.costSavings) {
        totalEnergyCostSavings = energyOpportunity.costSavings;
    }

    let totalNebSavings: number = _.sumBy(nebReports, (nebReport: NebReport) => {
        return nebReport.totalCostSavings
    });
    let totalCostSavings: number = totalEnergyCostSavings + totalNebSavings;
    let paybackWithNebs: number = (energyOpportunity.implementationCost / totalCostSavings);
    let paybackWithoutNebs: number = (energyOpportunity.implementationCost / totalEnergyCostSavings);



    return {
        energyOpportunity: energyOpportunity,
        nebReports: nebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings,
        paybackWithNebs: paybackWithNebs,
        paybackWithoutNebs: paybackWithoutNebs
    }
}


export interface EnergyOpportunityReport {
    energyOpportunity: IdbEnergyOpportunity
    nebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalNebSavings: number,
    totalCostSavings: number,
    paybackWithNebs: number,
    paybackWithoutNebs: number
}
