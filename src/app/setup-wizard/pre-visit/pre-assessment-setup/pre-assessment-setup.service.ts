import { Injectable } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { UnitSettings } from 'src/app/models/unitSettings';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class PreAssessmentSetupService {
  convertValue = new ConvertValue();

  constructor(private assessmentIdbService: AssessmentIdbService) { }

  async updateAssessmentEnergyUse(assessments: Array<IdbAssessment>, companyEnergyUnit: string) {
    for (const assessment of assessments) {
      let use = 0;
      assessment.utilityTypes.forEach(utilityType => {
        let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
          _energyUse => _energyUse.utilityType == utilityType);
        if (utilityEnergyUse.include) {
          // calculate use
          let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
          let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
          let convertedUse = 0;
          let selectedUtilityOption = UtilityOptions.find(
            _option => _option.utilityType == utilityType);
          let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
            _unitOption => _unitOption.value == utilityEnergyUse.energyUnit);
          if (selectedUtilityOption.isStandardEnergyUnit 
            && selectedUnitOption.isStandard !== false) {
              convertedUse = this.convertValue.convertValue(
                utilityEnergyUse.energyUse,
                utilityEnergyUse.energyUnit,
                companyEnergyUnit).convertedValue;
          } else {
            convertedUse = this.convertValue.convertValue(
              utilityEnergyUse.energyUse * utilityEnergyUse.energyHHV,
              utilityEnergyUse.energyUnitStandard,
              companyEnergyUnit).convertedValue;
          }
          use += convertedUse;
        }
      });
      assessment.energyUse = use;
      // Update assessment energy savings
      if (companyEnergyUnit === 'MMBtu') {
        assessment.energySavings = this.convertValue.convertValue(
          assessment.energySavings,
          'kWh',
          'MMBtu').convertedValue;
      } else {
        assessment.energySavings = this.convertValue.convertValue(
          assessment.energySavings,
          'MMBtu',
          'kWh').convertedValue;
      }
      await this.saveChanges(assessment);
    }
  }

  async updateAssessmentEnergyCost(assessments: Array<IdbAssessment>, facilityUnitSettings: UnitSettings) {
    for (const assessment of assessments) {
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
            utilityEnergyUse.energyUnit,
            facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
          cost += convertedCost * facilityUnitSettings[`${camelCaseType}Price`];
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
