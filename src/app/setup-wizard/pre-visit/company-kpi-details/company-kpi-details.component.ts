import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { Subscription } from 'rxjs';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import * as _ from 'lodash';

@Component({
  selector: 'app-company-kpi-details',
  templateUrl: './company-kpi-details.component.html',
  styleUrl: './company-kpi-details.component.css'
})
export class CompanyKpiDetailsComponent {

  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  company: IdbCompany;
  companySub: Subscription;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;
  companyKpiGuids: Array<string> = [];

  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private companyIdbService: CompanyIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
      this.setCompanyKpiGuids();
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
      this.setCompanyKpiGuids();
    });
  }

  setCompanyKpiGuids() {
    if (this.company && this.keyPerformanceIndicators) {
      let companyKpis: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.filter(kpi => {
        return kpi.companyId == this.company.guid
      });
      let _companyKpiGuids: Array<string> = companyKpis.map(kpi => {
        return kpi.guid
      });
      //just want to update array of guids if it has changed otherwise template/forms 
      //re-render on saveChanges call in form
      let uniqGuids: Array<string> = _.xor(_companyKpiGuids, this.companyKpiGuids);
      if (uniqGuids.length != 0) {
        this.companyKpiGuids = _companyKpiGuids;
      }
    }
  }


  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
  }

  goToFacility() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }
}
