import { Injectable } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { UnitSettings } from 'src/app/models/unitSettings';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class PreAssessmentSetupService {
  convertValue = new ConvertValue();

  constructor(private assessmentIdbService: AssessmentIdbService) { }

  async updateAssessmentEnergyUse(assessmentIds: Array<string>, companyEnergyUnit: string) {
    for (const assessmentID of assessmentIds) {
      let assessment = await this.assessmentIdbService.getByGuid(assessmentID);
      let use = 0;
      assessment.utilityTypes.forEach(utilityType => {
        let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
          _energyUse => _energyUse.utilityType == utilityType);
        if (utilityEnergyUse.include) {
          // calculate use
          let convertedUse = this.convertValue.convertValue(
            utilityEnergyUse.energyUse,
            utilityEnergyUse.unit,
            companyEnergyUnit).convertedValue;
          use += convertedUse;
        }
      });
      assessment.energyUse = use;
      await this.saveChanges(assessment);
    }
  }

  async updateAssessmentEnergyCost(assessmentIds: Array<string>, facilityUnitSettings: UnitSettings) {
    for (const assessmentID of assessmentIds) {
      let assessment = await this.assessmentIdbService.getByGuid(assessmentID);
      let use = 0, cost = 0;
      assessment.utilityTypes.forEach(utilityType => {
        let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
          _energyUse => _energyUse.utilityType == utilityType);
        if (utilityEnergyUse.include) {
          // calculate cost
          let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
          let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
          let convertedCost = this.convertValue.convertValue(
            utilityEnergyUse.energyUse,
            utilityEnergyUse.unit,
            facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
          cost += convertedCost;
        }
      });
      assessment.cost = cost;
      await this.saveChanges(assessment);
    }
  }

  async saveChanges(assessment: IdbAssessment) {
    await this.assessmentIdbService.asyncUpdate(assessment);
  }
}
