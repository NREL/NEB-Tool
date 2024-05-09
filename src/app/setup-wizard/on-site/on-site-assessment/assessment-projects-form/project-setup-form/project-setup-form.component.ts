import { Component, Input } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbProject } from 'src/app/models/project';
import { IconDefinition, faCircleCheck, faFileLines, faPlus, faSave, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { FanProjects, ProjectType } from 'src/app/shared/constants/projectOptions';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-setup-form',
  templateUrl: './project-setup-form.component.html',
  styleUrl: './project-setup-form.component.css'
})
export class ProjectSetupFormComponent {
  @Input({ required: true })
  project: IdbProject;


  faFileLines: IconDefinition = faFileLines;
  faSave: IconDefinition = faSave;
  faTrash: IconDefinition = faTrash;
  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faCircleCheck: IconDefinition = faCircleCheck;
  faWeightHanging: IconDefinition = faWeightHanging;

  projectTypes: Array<ProjectType> = FanProjects;
  displayDeleteModal: boolean = false;
  displaySuggestedNEBsModal: boolean = false;

  suggestedNEBs: Array<IdbNonEnergyBenefit>;
  selectedNEBs: Array<string> = [];

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;
  constructor(
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.nonEnergyBenefitsSub = this.setupWizardService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
      console.log(this.nonEnergyBenefits);
    });
    this.suggestedNEBs = this.setupWizardService.suggestedNEBs;
    this.selectedNEBs = this.project.nonEnergyBenefitIds;
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
  }

  deleteProject() {
    let projects: Array<IdbProject> = this.setupWizardService.projects.getValue();
    projects = projects.filter(_project => {
      return _project.guid != this.project.guid
    });
    this.setupWizardService.projects.next(projects);
  }

  saveProject() {
    let projects: Array<IdbProject> = this.setupWizardService.projects.getValue();
    let projectIndex: number = projects.findIndex(prj => { return prj.guid == this.project.guid });
    projects[projectIndex] = this.project;
    this.setupWizardService.projects.next(projects);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  showSuggestedNEBs() {
    this.displaySuggestedNEBsModal = true;
  }

  closeSuggestedNEBs() {
    this.displaySuggestedNEBsModal = false;
  }

  addSuggestedNEBs() {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.setupWizardService.nonEnergyBenefits.getValue();
    this.suggestedNEBs.forEach(nonEnergyBenefit => {
      if (this.selectedNEBs.includes(nonEnergyBenefit.guid)) {
        let nonEnergyBenefitCpy: IdbNonEnergyBenefit = JSON.parse(JSON.stringify(nonEnergyBenefit));
        nonEnergyBenefitCpy.assessmentId = this.project.assessmentId;
        nonEnergyBenefitCpy.userId = this.project.userId;
        nonEnergyBenefitCpy.facilityId = this.project.facilityId;
        nonEnergyBenefitCpy.companyId = this.project.companyId;
        nonEnergyBenefitCpy.projectIds.push(this.project.guid);
        nonEnergyBenefits.push(nonEnergyBenefitCpy);
      }
    });
    this.setupWizardService.nonEnergyBenefits.next(nonEnergyBenefits);
    this.closeSuggestedNEBs();

  }

  toggleSuggestedNEB(nebGUID: string) {
    if (this.selectedNEBs.includes(nebGUID)) {
      this.selectedNEBs = this.selectedNEBs.filter(selectedGUID => {
        return selectedGUID != nebGUID;
      });
    } else {
      this.selectedNEBs.push(nebGUID);
    }
  }

  highlightNEB(nebGUID: String) {

  }
}
