import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { AssessmentReport, getAssessmentReport } from 'src/app/shared/reports/calculations/assessmentReport';

@Component({
  selector: 'app-on-site-assessment-results',
  templateUrl: './on-site-assessment-results.component.html',
  styleUrl: './on-site-assessment-results.component.css'
})
export class OnSiteAssessmentResultsComponent {

  assessmentSub: Subscription;
  assessment: IdbAssessment;

  assessmentReport: AssessmentReport;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService

  ) {

  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
      this.setAssessmentReport();
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }

  setAssessmentReport(){
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.assessment.companyId);
    this.assessmentReport = getAssessmentReport(this.assessment, allEnergyOpportunities, allNonEnergyBenefits, companyPerformanceMetrics);
  }
}
