import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faPlus, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessment-nebs-form',
  templateUrl: './assessment-nebs-form.component.html',
  styleUrl: './assessment-nebs-form.component.css'
})
export class AssessmentNebsFormComponent {

  faPlus: IconDefinition = faPlus;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit> = [];
  nonEnergyBenefitsSub: Subscription;
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService, private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
      // this.setNEBs();
    })

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  async addNEB() {
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.guid, this.assessment.guid);
    let assessmentNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
      return neb.assessmentId == this.assessment.guid;
    });
    newNonEnergyBenefit.name = 'NEB #' + (assessmentNebs.length + 1);
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
  }
}
