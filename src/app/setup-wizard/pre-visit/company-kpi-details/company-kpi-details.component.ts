import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faBullseye, faChartBar, faChevronLeft, faChevronRight, faCircleQuestion, faContactBook, faPlus, faScaleUnbalancedFlip, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import * as _ from 'lodash';
import { PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';

@Component({
  selector: 'app-company-kpi-details',
  templateUrl: './company-kpi-details.component.html',
  styleUrl: './company-kpi-details.component.css'
})
export class CompanyKpiDetailsComponent {

  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  keyPerformanceIndicator: IdbKeyPerformanceIndicator;
  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  faCircleQuestion: IconDefinition = faCircleQuestion;
  faBullseye: IconDefinition = faBullseye;
  faPlus: IconDefinition = faPlus;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  companySub: Subscription;
  company: IdbCompany;

  keyPerformanceIndicatorSub: Subscription;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;

  indicatorIndex: number;
  numCompanyKpis: number;

  displayContactModal: boolean = false;
  viewContact: IdbContact;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
    this.activatedRoute.params.subscribe(params => {
      let kpiGuid: string = params['id'];
      this.keyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getByGuid(kpiGuid);
      this.setIndexValues();
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async saveChanges() {
    if (this.keyPerformanceIndicator.optionValue == 'other') {
      this.keyPerformanceIndicator.htmlLabel = this.keyPerformanceIndicator.label;
      this.keyPerformanceIndicator.performanceMetrics.forEach(metric => {
        metric.htmlLabel = metric.label;
      })
    }
    await this.keyPerformanceIndicatorIdbService.asyncUpdate(this.keyPerformanceIndicator);
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }

  calculateCost() {
    this.keyPerformanceIndicator.performanceMetrics.forEach(metric => {
      metric.baselineCost = (metric.costPerValue * metric.baselineValue);
    });
    this.saveChanges();
  }

  goBack() {
    if (this.indicatorIndex == 0) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-select');
    } else {
      let companyKpis: Array<IdbKeyPerformanceIndicator> = this.getCompanyKPIs();
      this.goToKPI(companyKpis[this.indicatorIndex - 1].guid);
    }
  }

  goNext() {
    if (this.numCompanyKpis - 1 == this.indicatorIndex) {
      this.goToFacility();
    } else {
      let companyKpis: Array<IdbKeyPerformanceIndicator> = this.getCompanyKPIs();
      this.goToKPI(companyKpis[this.indicatorIndex + 1].guid);
    }
  }

  goToKPI(kpiGUID: string) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-detail/' + kpiGUID);
  }

  goToFacility() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }

  setIndexValues() {
    let companyKpis: Array<IdbKeyPerformanceIndicator> = this.getCompanyKPIs();
    this.numCompanyKpis = companyKpis.length;
    this.indicatorIndex = companyKpis.findIndex(kpi => {
      return kpi.guid == this.keyPerformanceIndicator.guid
    });
  }

  getCompanyKPIs(): Array<IdbKeyPerformanceIndicator> {
    return this.keyPerformanceIndicators.filter(kpi => {
      return kpi.companyId == this.company.guid
    });
  }

  openContactModal(contact: IdbContact) {
    this.viewContact = contact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
  }
}
