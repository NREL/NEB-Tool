import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
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

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;
  assessmentId: string;
  constructor(private setupWizardService: SetupWizardService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.assessmentId = params['id'];
    });

    this.nonEnergyBenefitsSub = this.setupWizardService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      if (this.assessmentId) {
        this.nonEnergyBenefits = _nonEnergyBenefits.filter(neb => {
          return neb.assessmentId == this.assessmentId
        });
      }
    });
  }

  addNEB() {
    let assessments: Array<IdbAssessment> = this.setupWizardService.assessments.getValue();
    let currentAssessment: IdbAssessment = assessments.find(assessment => {
      return assessment.guid == this.assessmentId;
    })
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(currentAssessment.userId, currentAssessment.companyId, currentAssessment.guid, currentAssessment.guid);
    newNonEnergyBenefit.name = 'NEB #' + (this.nonEnergyBenefits.length + 1);
    let allNEBs: Array<IdbNonEnergyBenefit> = this.setupWizardService.nonEnergyBenefits.getValue();
    allNEBs.push(newNonEnergyBenefit)
    this.setupWizardService.nonEnergyBenefits.next(allNEBs);
  }
}
