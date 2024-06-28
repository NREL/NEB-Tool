import { Component, Input } from '@angular/core';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { AssessmentReport, getAssessmentReport } from '../calculations/assessmentReport';

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrl: './assessment-report.component.css'
})
export class AssessmentReportComponent {
  @Input({ required: true })
  assessment: IdbAssessment;

  company: IdbCompany;
  facility: IdbFacility;
  assessmentReport: AssessmentReport;
  constructor(private facilityIdbService: FacilityIdbService, private companyIdbService: CompanyIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {
  }

  ngOnInit() {
    this.company = this.companyIdbService.getByGUID(this.assessment.companyId);
    this.facility = this.facilityIdbService.getByGUID(this.assessment.facilityId);
  }

  ngOnChanges() {
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.assessment.companyId);
    this.assessmentReport = getAssessmentReport(this.assessment, allEnergyOpportunities, allNonEnergyBenefits, companyPerformanceMetrics);
  }
}
