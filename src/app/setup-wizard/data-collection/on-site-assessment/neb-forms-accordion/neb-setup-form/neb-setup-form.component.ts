import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronDown, faChevronRight, faContactBook, faPlus, faScaleUnbalancedFlip, faSearchPlus, faTrash, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { getNewKeyPerformanceIndicator, IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit, PerformanceMetricImpact } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetrics, KeyPerformanceMetricValue } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-neb-setup-form',
  templateUrl: './neb-setup-form.component.html',
  styleUrl: './neb-setup-form.component.css'
})
export class NebSetupFormComponent {
  @Input({ required: true })
  nebGuid: string;


  nonEnergyBenefit: IdbNonEnergyBenefit;


  faSearchPlus: IconDefinition = faSearchPlus;
  faTrash: IconDefinition = faTrash;
  faWeightHanging: IconDefinition = faWeightHanging;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faPlus: IconDefinition = faPlus;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;

  kpi: IdbKeyPerformanceIndicator;

  previousEnergyOpportunitiesIds: Array<string>;

  includedMetrics: Array<PerformanceMetricImpact>;
  excludedMetrics: Array<KeyPerformanceMetric>;
  untrackedMetrics: Array<KeyPerformanceMetric>;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  hideUntrackedMetrics: boolean = true;
  performanceMetricToAdd: KeyPerformanceMetric;
  displayAddPerformanceMetricModal: boolean = false;
  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private dbChangesService: DbChangesService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private contactIdbService: ContactIdbService,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.nonEnergyBenefit = this.nonEnergyBenefitsIdbService.getByGuid(this.nebGuid);
    this.setMetrics();

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }

  async saveChanges() {
    await this.nonEnergyBenefitsIdbService.asyncUpdate(this.nonEnergyBenefit);
  }

  async deleteNonEnergyBenefit() {
    await this.dbChangesService.deleteNonEnergyBenefit(this.nonEnergyBenefit);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  toggleNote() {
    this.nonEnergyBenefit.includeNote = !this.nonEnergyBenefit.includeNote;
    this.saveChanges();
  }

  setMetrics() {
    this.includedMetrics = new Array();
    this.excludedMetrics = new Array();
    this.untrackedMetrics = new Array();
    this.nonEnergyBenefit.performanceMetricImpacts.forEach(performanceMetricImpact => {
      let keyPerformanceMetric: KeyPerformanceMetric = this.keyPerformanceIndicatorIdbService.getKeyPerformanceMetric(this.nonEnergyBenefit.companyId, performanceMetricImpact.kpmValue);
      if (keyPerformanceMetric.includeMetric) {
        this.includedMetrics.push(performanceMetricImpact);
      } else {
        this.excludedMetrics.push(keyPerformanceMetric);
      }
    });

    let metricIds: Array<KeyPerformanceMetricValue> = this.nonEnergyBenefit.performanceMetricImpacts.map(metric => {
      return metric.kpmValue;
    });
    KeyPerformanceMetrics.forEach(metric => {
      let nebOption: NebOption = NebOptions.find(option => { return option.optionValue == this.nonEnergyBenefit.nebOptionValue });
      if (nebOption) {
        if (metricIds.includes(metric.value) == false && nebOption.KPM.includes(metric.value)) {
          this.untrackedMetrics.push(metric);
        }
      }
    });
  }

  goToMetric(metric: KeyPerformanceMetric) {
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.companyId, metric.kpiValue);
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-detail/' + keyPerformanceIndicator.guid)
  }

  async addMetric() {
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.companyId, this.performanceMetricToAdd.kpiValue);
    if (keyPerformanceIndicator) {
      //if exists turn on untracked metric
      keyPerformanceIndicator.performanceMetrics.forEach(_metric => {
        if (_metric.value == this.performanceMetricToAdd.value) {
          _metric.includeMetric = true
        }
      });
      await this.keyPerformanceIndicatorIdbService.asyncUpdate(keyPerformanceIndicator);
    } else {
      //add untracked KPI if doesn't exist
      let kpiOption: KeyPerformanceIndicatorOption = KeyPerformanceIndicatorOptions.find(option => {
        return option.optionValue == this.performanceMetricToAdd.kpiValue
      });
      keyPerformanceIndicator = getNewKeyPerformanceIndicator(this.nonEnergyBenefit.userId, this.nonEnergyBenefit.companyId, kpiOption, false);
      keyPerformanceIndicator.performanceMetrics.forEach(_metric => {
        if (_metric.value == this.performanceMetricToAdd.value) {
          _metric.includeMetric = true
        } else {
          _metric.includeMetric = false;
        }
      });
      await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(keyPerformanceIndicator));
      await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
      await this.nonEnergyBenefitsIdbService.addCompanyKpi(keyPerformanceIndicator);
      this.nonEnergyBenefit = this.nonEnergyBenefitsIdbService.getByGuid(this.nebGuid);
    }
    this.closeAddMetricModal();
    this.setMetrics();
  }

  openContactModal(viewContact: IdbContact) {
    this.setupWizardService.displayContactModal.next({ context: 'nonEnergyBenefit', viewContact: viewContact, contextGuid: this.nonEnergyBenefit.guid });
  }

  toggleUntrackedNebs() {
    this.hideUntrackedMetrics = !this.hideUntrackedMetrics;
  }

  selectMetricToAdd(metric: KeyPerformanceMetric) {
    this.performanceMetricToAdd = metric;
  }

  closeAddMetricModal() {
    this.displayAddPerformanceMetricModal = false;
    this.performanceMetricToAdd = undefined;

  }

  showUntrackedMetricsModal() {
    this.displayAddPerformanceMetricModal = true;
  }
}
