import { Component, Input } from '@angular/core';
import { IconDefinition, faCircle, faCircleCheck, faFileLines, faNoteSticky, faSave, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicator } from 'src/app/shared/constants/keyPerformanceIndicators';

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
  faFileLines: IconDefinition = faFileLines;
  faCircleCheck: IconDefinition = faCircleCheck;
  faCircle: IconDefinition = faCircle;
  faSearchPlus: IconDefinition = faSearchPlus;
  faSave: IconDefinition = faSave;
  faNoteSticky: IconDefinition = faNoteSticky;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<KeyPerformanceIndicator>;
  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  displayEnergyOpportunitiesModal: boolean = false;
  previousEnergyOpportunitiesIds: Array<string>;
  kpi: KeyPerformanceIndicator;
  highlightNebGuidSub: Subscription;
  highlightNebGuid: string;
  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private companyIdbService: CompanyIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private dbChangesService: DbChangesService,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.nonEnergyBenefit = this.nonEnergyBenefitsIdbService.getByGuid(this.nebGuid);

    this.keyPerformanceIndicators = this.companyIdbService.selectedCompany.getValue().keyPerformanceIndicators;
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(_opportunities => {
      this.energyOpportunities = _opportunities;
    });
    this.setKPI()

    this.highlightNebGuidSub = this.setupWizardService.highlightNebGuid.subscribe(_highlightNebGuid => {
      this.highlightNebGuid = _highlightNebGuid;
      if (this.highlightNebGuid) {
        setTimeout(() => {
          this.setupWizardService.highlightNebGuid.next(undefined);
        }, 5000)
      }
    });
  }

  ngOnDestroy() {
    this.energyOpportunitiesSub.unsubscribe();
    this.highlightNebGuidSub.unsubscribe();
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

  highlightOpportunity(opportunityGUID: string) {
    document.getElementById('opportunity_' + opportunityGUID).scrollIntoView({ behavior: "smooth" });
    this.setupWizardService.highlightOpportunityGuid.next(opportunityGUID);
  }

  showEnergyOpportunitiesModal() {
    this.previousEnergyOpportunitiesIds = this.nonEnergyBenefit.energyOpportunityIds;
    this.displayEnergyOpportunitiesModal = true;
  }

  closeEnergyOpportunitiesModal(cancel?: boolean) {
    if (cancel) {
      this.nonEnergyBenefit.energyOpportunityIds = this.previousEnergyOpportunitiesIds;
    }
    this.displayEnergyOpportunitiesModal = false;
  }

  toggleEnergyOpportunity(energyOpportunityGUID: string) {
    if (this.nonEnergyBenefit.energyOpportunityIds.includes(energyOpportunityGUID)) {
      this.nonEnergyBenefit.energyOpportunityIds = this.nonEnergyBenefit.energyOpportunityIds.filter(selectedGUID => {
        return selectedGUID != energyOpportunityGUID;
      });
    } else {
      this.nonEnergyBenefit.energyOpportunityIds.push(energyOpportunityGUID);
    }
  }

  async saveEnergyOpportunities() {
    for (let i = 0; i < this.energyOpportunities.length; i++) {
      let energyOpportunity: IdbEnergyOpportunity = this.energyOpportunities[i];
      let needsUpdate: boolean = false
      let inNEB: boolean = this.nonEnergyBenefit.energyOpportunityIds.findIndex(oppId => {
        return oppId == energyOpportunity.guid;
      }) != -1;
      let inOpportunity: boolean = energyOpportunity.nonEnergyBenefitIds.findIndex(nebId => {
        return nebId == this.nonEnergyBenefit.guid;
      }) != -1;
      if (inNEB && !inOpportunity) {
        needsUpdate = true;
        energyOpportunity.nonEnergyBenefitIds.push(this.nonEnergyBenefit.guid);
      } else if (!inNEB && inOpportunity) {
        needsUpdate = true;
        energyOpportunity.nonEnergyBenefitIds = energyOpportunity.nonEnergyBenefitIds.filter(nebId => {
          return nebId != this.nonEnergyBenefit.guid;
        });
        await this.energyOpportunityIdbService.asyncUpdate(energyOpportunity)
      }
    };
    await this.saveChanges();
    this.closeEnergyOpportunitiesModal();
  }

  toggleNote() {
    this.nonEnergyBenefit.includeNote = !this.nonEnergyBenefit.includeNote;
    this.saveChanges();
  }

  setKPI() {
    this.kpi = this.keyPerformanceIndicators.find(kpi => {
      return kpi.kpiOptionValue == this.nonEnergyBenefit.kpiId;
    });
    this.saveChanges();
  }
}
