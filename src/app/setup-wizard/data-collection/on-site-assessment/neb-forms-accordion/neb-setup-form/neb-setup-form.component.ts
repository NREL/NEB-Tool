import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faScaleUnbalancedFlip, faTrash, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit, PerformanceMetricImpact } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';

@Component({
  selector: 'app-neb-setup-form',
  templateUrl: './neb-setup-form.component.html',
  styleUrl: './neb-setup-form.component.css'
})
export class NebSetupFormComponent {
  @Input({ required: true })
  nebGuid: string;


  nonEnergyBenefit: IdbNonEnergyBenefit;


  faTrash: IconDefinition = faTrash;
  faWeightHanging: IconDefinition = faWeightHanging;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faUser: IconDefinition = faUser;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;

  kpi: IdbKeyPerformanceIndicator;

  previousEnergyOpportunitiesIds: Array<string>;

  includedMetrics: Array<PerformanceMetricImpact>;
  excludedMetrics: Array<KeyPerformanceMetric>;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
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
    this.nonEnergyBenefit.performanceMetricImpacts.forEach(performanceMetricImpact => {
      let keyPerformanceMetric: KeyPerformanceMetric = this.keyPerformanceIndicatorIdbService.getKeyPerformanceMetric(this.nonEnergyBenefit.companyId, performanceMetricImpact.kpmValue);
      if (keyPerformanceMetric.includeMetric) {
        this.includedMetrics.push(performanceMetricImpact);
      } else {
        this.excludedMetrics.push(keyPerformanceMetric);
      }
    });
  }

  goToMetric(metric: KeyPerformanceMetric) {
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.companyId, metric.kpiValue);
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-detail/' + keyPerformanceIndicator.guid)
  }


  openContactModal(viewContact: IdbContact) {
    this.setupWizardService.displayContactModal.next({ context: 'nonEnergyBenefit', viewContact: viewContact, contextGuid: this.nonEnergyBenefit.guid });
  }
}
