import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBullseye, faCircleQuestion, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator, getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceIndicatorOption, PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-company-kpi-list',
  templateUrl: './company-kpi-list.component.html',
  styleUrl: './company-kpi-list.component.css'
})
export class CompanyKpiListComponent {

  faTrash: IconDefinition = faTrash;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  faPlus: IconDefinition = faPlus;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  company: IdbCompany;
  companySub: Subscription;


  kpiToDelete: IdbKeyPerformanceIndicator;
  displayDeleteModal: boolean = false;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;

  displayCustomKPIModal: boolean = false;
  customKPIName: string = '';
  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  kpiCategory: PrimaryKPI = 'Other';
  constructor(
    private companyIdbService: CompanyIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
  }

  openDeleteModal(kpi: IdbKeyPerformanceIndicator) {
    this.kpiToDelete = kpi;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.kpiToDelete = undefined;
  }

  async removeKPI() {
    await this.dbChangesService.deleteKPIs([this.kpiToDelete]);
    this.closeDeleteModal();
  }

  openAddCustomModal() {
    this.displayCustomKPIModal = true;
  }

  closeCustomKPIModal() {
    this.displayCustomKPIModal = false;
  }

  async confirmCreate() {
    let option: KeyPerformanceIndicatorOption = {
      primaryKPI: this.kpiCategory,
      label: this.customKPIName,
      htmlLabel: this.customKPIName,
      optionValue: 'other',
    }
    let newKPI: IdbKeyPerformanceIndicator = getNewKeyPerformanceIndicator(this.company.userId, this.company.guid, option);
    await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(newKPI));
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
    this.closeCustomKPIModal();
  }

  goToKpiDetails(kpi: IdbKeyPerformanceIndicator){
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-detail/' + kpi.guid);
  }

}
