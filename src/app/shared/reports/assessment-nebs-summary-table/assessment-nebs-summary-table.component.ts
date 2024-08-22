import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { AssessmentNebSummary, getAssessmentNebSummary } from '../calculations/assessmentNebSummary';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Component({
  selector: 'app-assessment-nebs-summary-table',
  templateUrl: './assessment-nebs-summary-table.component.html',
  styleUrl: './assessment-nebs-summary-table.component.css'
})
export class AssessmentNebsSummaryTableComponent {
  @Input({ required: true })
  assessmentId: string;

  assessment: IdbAssessment;
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  assessmentNebSummary: AssessmentNebSummary;
  constructor(
    private assessmentIdbService: AssessmentIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService
  ) {

  }

  ngOnInit() {
    this.assessment = this.assessmentIdbService.getByGuid(this.assessmentId);
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nebs => {
      this.nonEnergyBenefits = _nebs;
      this.setAssessmentNebSummary();
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(_energyOpportunities => {
      this.energyOpportunities = _energyOpportunities;
      this.setAssessmentNebSummary();
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }


  setAssessmentNebSummary() {
    if (this.nonEnergyBenefits && this.energyOpportunities) {
      this.assessmentNebSummary = getAssessmentNebSummary(this.assessmentId, this.nonEnergyBenefits, this.energyOpportunities);
    }
  }



}
