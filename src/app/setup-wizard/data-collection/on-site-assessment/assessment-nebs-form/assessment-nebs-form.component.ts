import { Component, TRANSLATIONS } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faPlus, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

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
  constructor(private assessmentIdbService: AssessmentIdbService, private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService) {
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
    //only want to update neb list if changes made
    //otherwise forms get re-init when the list updates
    if (this.assessment && this.nonEnergyBenefits) {
      let assessmentNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == this.assessment.guid
      });
      let tmpAssessmentNebs: Array<string> = assessmentNebs.map(neb => {
        return neb.guid
      });
      if (tmpAssessmentNebs.length != this.assessmentNebGuids.length) {
        this.assessmentNebGuids = tmpAssessmentNebs;
      } else {
        let notEqual: boolean = false;
        for(let i = 0; i < this.assessmentNebGuids.length; i++){
          if(tmpAssessmentNebs[i] != this.assessmentNebGuids[i]){
            notEqual = true;
          }
        }
        this.assessmentNebGuids = tmpAssessmentNebs;
      }
    } else {
      this.assessmentNebGuids = [];
    }

  }


  async addNEB() {
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.guid, this.assessment.guid);
    newNonEnergyBenefit.name = 'NEB #' + (this.assessmentNebGuids.length + 1);
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }
}
