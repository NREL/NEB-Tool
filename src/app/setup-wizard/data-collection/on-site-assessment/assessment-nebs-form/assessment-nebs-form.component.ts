import { Component } from '@angular/core';
import { IconDefinition, faPlus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessment-nebs-form',
  templateUrl: './assessment-nebs-form.component.html',
  styleUrl: './assessment-nebs-form.component.css'
})
export class AssessmentNebsFormComponent {

  faPlus: IconDefinition = faPlus;
  faSearchPlus: IconDefinition = faSearchPlus;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  newNebName: string;
  displayNebModal: boolean = false;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private setupWizardService: SetupWizardService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    })
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }

  async addNEB() {
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, undefined, [], true);
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  openNebModal() {
    this.setupWizardService.displayAddNebsModal.next({ assessmentId: this.assessment.guid, energyOpportunityId: undefined });
  }
}
