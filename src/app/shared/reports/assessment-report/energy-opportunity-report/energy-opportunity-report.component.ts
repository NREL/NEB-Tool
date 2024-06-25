import { Component, Input } from '@angular/core';
import { IconDefinition, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { NebReport, getNebReport } from 'src/app/models/reports';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';

@Component({
  selector: 'app-energy-opportunity-report',
  templateUrl: './energy-opportunity-report.component.html',
  styleUrl: './energy-opportunity-report.component.css'
})
export class EnergyOpportunityReportComponent {
  @Input({ required: true })
  energyOpportunity: IdbEnergyOpportunity;

  faFileLines: IconDefinition = faFileLines;

  nebReports: Array<NebReport>
  constructor(private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {

  }

  ngOnInit() {
    this.setNebReports();
  }

  setNebReports(){
    this.nebReports = new Array();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = allNonEnergyBenefits.filter(neb => {
      return neb.energyOpportunityId == this.energyOpportunity.guid
    });
    let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.energyOpportunity.companyId);
    nonEnergyBenefits.forEach(neb => {
      let nebReport: NebReport = getNebReport(neb, companyPerformanceMetrics);
      this.nebReports.push(nebReport);
    });
  }
}
