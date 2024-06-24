import { Component, Input } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IconDefinition, faCircleCheck, faFileLines, faPlus, faSave, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { EnergyOpportunityType, FanOpportunities } from 'src/app/shared/constants/energyOpportunityOptions';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { Subscription, firstValueFrom } from 'rxjs';
import { SuggestedNEBs } from 'src/app/shared/constants/suggestedNEBs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';

@Component({
  selector: 'app-energy-opportunity-setup-form',
  templateUrl: './energy-opportunity-setup-form.component.html',
  styleUrl: './energy-opportunity-setup-form.component.css'
})
export class EnergyOpportunitySetupFormComponent {
  @Input({ required: true })
  energyOpportunityGuid: string;


  energyOpportunity: IdbEnergyOpportunity;

  faFileLines: IconDefinition = faFileLines;
  faSave: IconDefinition = faSave;
  faTrash: IconDefinition = faTrash;
  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faCircleCheck: IconDefinition = faCircleCheck;
  faWeightHanging: IconDefinition = faWeightHanging;

  opportunityTypes: Array<EnergyOpportunityType> = FanOpportunities;
  displayDeleteModal: boolean = false;
  displaySuggestedNEBsModal: boolean = false;

  suggestedNEBs: Array<IdbNonEnergyBenefit>;
  previousSelectedNEBs: Array<string> = [];

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;
  highlightOpportunityGuid: string;
  highlightOpportunityGuidSub: Subscription;
  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private dbChangesService: DbChangesService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    this.energyOpportunity = this.energyOpportunityIdbService.getByGuid(this.energyOpportunityGuid);
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
    });
    this.suggestedNEBs = JSON.parse(JSON.stringify(SuggestedNEBs));
    this.highlightOpportunityGuidSub = this.setupWizardService.highlightOpportunityGuid.subscribe(_opportunityGuid => {
      this.highlightOpportunityGuid = _opportunityGuid;
      if (this.highlightOpportunityGuid) {
        setTimeout(() => {
          this.setupWizardService.highlightOpportunityGuid.next(undefined);
        }, 5000)
      }
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
    this.highlightOpportunityGuidSub.unsubscribe();
  }

  async deleteEnergyOpportunity() {
    await this.dbChangesService.deleteEnergyOpportunity(this.energyOpportunity)
    this.closeDeleteModal();
  }

  async saveEnergyOpportunity() {
    await this.energyOpportunityIdbService.asyncUpdate(this.energyOpportunity);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  showSuggestedNEBs() {
    this.previousSelectedNEBs = this.energyOpportunity.nonEnergyBenefitIds;
    this.displaySuggestedNEBsModal = true;
  }

  closeSuggestedNEBs(cancel?: boolean) {
    if (cancel) {
      this.energyOpportunity.nonEnergyBenefitIds = this.previousSelectedNEBs;
    }
    this.displaySuggestedNEBsModal = false;
  }

  async addSuggestedNEBs() {
    // let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.setupWizardService.nonEnergyBenefits.getValue();
    for (let i = 0; i < this.suggestedNEBs.length; i++) {
      let suggestedNEB: IdbNonEnergyBenefit = this.suggestedNEBs[i];
      if (this.energyOpportunity.nonEnergyBenefitIds.includes(suggestedNEB.guid)) {
        let existingIndex: number = this.nonEnergyBenefits.findIndex(neb => {
          return neb.assessmentId == this.energyOpportunity.assessmentId && suggestedNEB.guid == neb.guid;
        });
        if (existingIndex == -1) {
          let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.assessmentId);
          newNonEnergyBenefit.name = suggestedNEB.name;
          newNonEnergyBenefit.kpiId = suggestedNEB.kpiId;
          newNonEnergyBenefit.energyOpportunityIds.push(this.energyOpportunity.guid);
          // nonEnergyBenefits.push(newNonEnergyBenefit);
          await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit))

          this.energyOpportunity.nonEnergyBenefitIds = this.energyOpportunity.nonEnergyBenefitIds.filter(nebGuid => {
            return nebGuid != suggestedNEB.guid
          });
          this.energyOpportunity.nonEnergyBenefitIds.push(newNonEnergyBenefit.guid);
        } else {
          if (!this.nonEnergyBenefits[existingIndex].energyOpportunityIds.includes(this.energyOpportunity.guid)) {
            this.nonEnergyBenefits[existingIndex].energyOpportunityIds.push(this.energyOpportunity.guid);
            await firstValueFrom(this.nonEnergyBenefitsIdbService.updateWithObservable(this.nonEnergyBenefits[existingIndex]));
          }
        }
      }
    };


    for (let i = 0; i < this.nonEnergyBenefits.length; i++) {
      let neb: IdbNonEnergyBenefit = this.nonEnergyBenefits[i];
      if (neb.assessmentId == this.energyOpportunity.assessmentId) {
        if (neb.energyOpportunityIds.includes(this.energyOpportunity.guid) && !this.energyOpportunity.nonEnergyBenefitIds.includes(neb.guid)) {
          neb.energyOpportunityIds = neb.energyOpportunityIds.filter(opportunityId => {
            return opportunityId != this.energyOpportunity.guid
          });
          await firstValueFrom(this.nonEnergyBenefitsIdbService.updateWithObservable(neb));
        }
      }
    }
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
    await this.saveEnergyOpportunity();
    this.closeSuggestedNEBs();
  }

  toggleSuggestedNEB(nebGUID: string) {
    if (this.energyOpportunity.nonEnergyBenefitIds.includes(nebGUID)) {
      this.energyOpportunity.nonEnergyBenefitIds = this.energyOpportunity.nonEnergyBenefitIds.filter(selectedGUID => {
        return selectedGUID != nebGUID;
      });
    } else {
      this.energyOpportunity.nonEnergyBenefitIds.push(nebGUID);
    }
  }

  highlightNEB(nebGUID: string) {
    document.getElementById('neb_' + nebGUID).scrollIntoView({ behavior: "smooth" })
    this.setupWizardService.highlightNebGuid.next(nebGUID);
  }
}
