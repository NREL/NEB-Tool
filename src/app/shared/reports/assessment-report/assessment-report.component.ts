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
import { NebReport, getNebReport } from 'src/app/models/reports';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';

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

  energyOpportunities: Array<IdbEnergyOpportunity>;
  nebReports: Array<NebReport>;
  constructor(private facilityIdbService: FacilityIdbService, private companyIdbService: CompanyIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {

  }

  ngOnInit() {
    this.company = this.companyIdbService.getByGUID(this.assessment.companyId);
    this.facility = this.facilityIdbService.getByGUID(this.assessment.facilityId);
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    this.energyOpportunities = allEnergyOpportunities.filter(energyOpportunity => {
      return energyOpportunity.assessmentId == this.assessment.guid
    });
    this.setNebReports();
  }


  setNebReports(){
    this.nebReports = new Array();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = allNonEnergyBenefits.filter(neb => {
      return neb.assessmentId == this.assessment.guid && !neb.energyOpportunityId;
    });
    let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.assessment.companyId);
    nonEnergyBenefits.forEach(neb => {
      let nebReport: NebReport = getNebReport(neb, companyPerformanceMetrics);
      this.nebReports.push(nebReport);
    });
  }
}
