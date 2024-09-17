import { Component, Input } from '@angular/core';
import { faFileLines, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Component({
  selector: 'app-energy-opportunity-nebs-table',
  templateUrl: './energy-opportunity-nebs-table.component.html',
  styleUrl: './energy-opportunity-nebs-table.component.css'
})
export class EnergyOpportunityNebsTableComponent {
  @Input({required: true})
  assessment: IdbAssessment;

  faFileLines: IconDefinition = faFileLines;
  faWeightHanging: IconDefinition = faWeightHanging;
  
  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;


  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService
  ){

  }

  ngOnInit(){
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(_energyOpps => {
      this.energyOpportunities = _energyOpps;
    });
  }

  ngOnDestroy(){
    this.nonEnergyBenefitsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }
}
