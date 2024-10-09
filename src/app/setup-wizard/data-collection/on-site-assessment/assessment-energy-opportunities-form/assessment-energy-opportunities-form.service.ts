import { Injectable } from '@angular/core';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class AssessmentEnergyOpportunitiesFormService {

  convertValue = new ConvertValue();
  
  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService) { }

  async updateEnergyOpportunityEnergyUse(energyOpportunities: Array<IdbEnergyOpportunity>, companyEnergyUnit: string) {
    for (const energyOpportunity of energyOpportunities) {
      // Update energy opportunity energy savings
      if (companyEnergyUnit === 'MMBtu') {
        energyOpportunity.energySavings = this.convertValue.convertValue(
          energyOpportunity.energySavings,
          'kWh',
          'MMBtu').convertedValue;
      } else {
        energyOpportunity.energySavings = this.convertValue.convertValue(
          energyOpportunity.energySavings,
          'MMBtu',
          'kWh').convertedValue;
      }
      await this.energyOpportunityIdbService.asyncUpdate(energyOpportunity);
    }
  }
}
