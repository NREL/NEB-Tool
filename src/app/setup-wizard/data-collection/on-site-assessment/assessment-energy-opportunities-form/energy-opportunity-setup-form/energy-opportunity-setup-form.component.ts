import { Component, Input } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IconDefinition, faFileLines, faSearchPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EnergyOpportunityType, FanOpportunities } from 'src/app/shared/constants/energyOpportunityOptions';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { Subscription } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import * as _ from 'lodash';

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
  faTrash: IconDefinition = faTrash;
  faSearchPlus: IconDefinition = faSearchPlus;

  opportunityTypes: Array<EnergyOpportunityType> = FanOpportunities;
  displayDeleteModal: boolean = false;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;

  energyOpportunityNebGuids: Array<string> = [];
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
      this.setEnergyOpportunityNebGuids();
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
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
    this.setupWizardService.displayAddNebsModal.next({
      assessmentId: this.energyOpportunity.assessmentId,
      energyOpportunityId: this.energyOpportunity.guid
    });
  }

  setEnergyOpportunityNebGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.energyOpportunity && this.nonEnergyBenefits) {
      let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == this.energyOpportunity.guid
      });
      let tmpOpportunityNebs: Array<string> = energyOpportunityNebs.map(neb => {
        return neb.guid
      });
      if (tmpOpportunityNebs.length != this.energyOpportunityNebGuids.length) {
        this.energyOpportunityNebGuids = tmpOpportunityNebs;
      } else {
        let xor: Array<string> = _.xor(this.energyOpportunityNebGuids, tmpOpportunityNebs)
        if (xor.length != 0) {
          this.energyOpportunityNebGuids = tmpOpportunityNebs;
        }
      }
    } else {
      this.energyOpportunityNebGuids = [];
    }

  }
}
