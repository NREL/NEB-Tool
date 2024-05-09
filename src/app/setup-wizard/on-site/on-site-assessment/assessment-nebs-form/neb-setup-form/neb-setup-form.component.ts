import { Component, Input } from '@angular/core';
import { IconDefinition, faCircle, faCircleCheck, faFileLines, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbProject } from 'src/app/models/project';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicator } from 'src/app/shared/constants/keyPerformanceIndicators';

@Component({
  selector: 'app-neb-setup-form',
  templateUrl: './neb-setup-form.component.html',
  styleUrl: './neb-setup-form.component.css'
})
export class NebSetupFormComponent {
  @Input({ required: true })
  nonEnergyBenefit: IdbNonEnergyBenefit;


  faTrash: IconDefinition = faTrash;
  faWeightHanging: IconDefinition = faWeightHanging;
  faFileLines: IconDefinition = faFileLines;
  faCircleCheck: IconDefinition = faCircleCheck;
  faCircle: IconDefinition = faCircle;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<KeyPerformanceIndicator>;
  projects: Array<IdbProject>;
  projectsSub: Subscription;

  constructor(
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.keyPerformanceIndicators = this.setupWizardService.company.getValue().keyPerformanceIndicators;
    this.projectsSub = this.setupWizardService.projects.subscribe(_projects => {
      this.projects = _projects;
    })
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }

  deleteNonEnergyBenefit() {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.setupWizardService.nonEnergyBenefits.getValue();
    nonEnergyBenefits = nonEnergyBenefits.filter(_nonEnergyBenefit => {
      return _nonEnergyBenefit.guid != this.nonEnergyBenefit.guid
    });
    this.setupWizardService.nonEnergyBenefits.next(nonEnergyBenefits);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  highlightProject(projectGUID: string) {

  }
}
