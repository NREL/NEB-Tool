import { Component } from '@angular/core';
import { IconDefinition, faPlus, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-assessment-nebs-form',
  templateUrl: './assessment-nebs-form.component.html',
  styleUrl: './assessment-nebs-form.component.css'
})
export class AssessmentNebsFormComponent {

  faPlus: IconDefinition = faPlus;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit> = [];
  assessmentNebGuids: Array<string> = [];
  nonEnergyBenefitsSub: Subscription;
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService, private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
      this.setAssessmentNebGuids();
    })

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
      this.setAssessmentNebGuids();
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  setAssessmentNebGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.assessment && this.nonEnergyBenefits) {
      let assessmentNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId == undefined
      });
      let tmpAssessmentNebs: Array<string> = assessmentNebs.map(neb => {
        return neb.guid
      });
      if (tmpAssessmentNebs.length != this.assessmentNebGuids.length) {
        this.assessmentNebGuids = tmpAssessmentNebs;
      } else {
        let xor: Array<string> = _.xor(this.assessmentNebGuids, tmpAssessmentNebs)
        if (xor.length != 0) {
          this.assessmentNebGuids = tmpAssessmentNebs;
        }
      }
    } else {
      this.assessmentNebGuids = [];
    }

  }

  addNEB() {
    this.setupWizardService.displayAddNebsModal.next({ assessmentId: this.assessment.guid, energyOpportunityId: undefined });
  }
}
