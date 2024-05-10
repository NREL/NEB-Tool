import { Component, Input } from '@angular/core';
import { IconDefinition, faCircle, faCircleCheck, faFileLines, faSave, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
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
  faSearchPlus: IconDefinition = faSearchPlus;
  faSave: IconDefinition = faSave;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<KeyPerformanceIndicator>;
  projects: Array<IdbProject>;
  projectsSub: Subscription;

  displayProjectsModal: boolean = false;
  previousProjectIds: Array<string>;
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

  saveNonEnergyBenefit() {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.setupWizardService.nonEnergyBenefits.getValue();
    let findNebIndex: number = nonEnergyBenefits.findIndex(neb => {
      return neb.guid == this.nonEnergyBenefit.guid
    });
    nonEnergyBenefits[findNebIndex] = this.nonEnergyBenefit;
    this.setupWizardService.nonEnergyBenefits.next(nonEnergyBenefits);
  }

  deleteNonEnergyBenefit() {
    this.projects.forEach(prj => {
      prj.nonEnergyBenefitIds = prj.nonEnergyBenefitIds.filter(guid => {
        return guid != this.nonEnergyBenefit.guid
      });
    });
    this.setupWizardService.projects.next(this.projects);

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
    document.getElementById('project_' + projectGUID).scrollIntoView({ behavior: "smooth" })

  }

  showProjectsModal() {
    this.previousProjectIds = this.nonEnergyBenefit.projectIds;
    this.displayProjectsModal = true;
  }

  closeProjectsModal(cancel?: boolean) {
    if (cancel) {
      this.nonEnergyBenefit.projectIds = this.previousProjectIds;
    }
    this.displayProjectsModal = false;
  }

  toggleProject(projectGUID: string) {
    if (this.nonEnergyBenefit.projectIds.includes(projectGUID)) {
      this.nonEnergyBenefit.projectIds = this.nonEnergyBenefit.projectIds.filter(selectedGUID => {
        return selectedGUID != projectGUID;
      });
    } else {
      this.nonEnergyBenefit.projectIds.push(projectGUID);
    }
  }

  saveProjects() {
    this.projects.forEach(project => {
      let inNEB: boolean = this.nonEnergyBenefit.projectIds.findIndex(prjId => {
        return prjId == project.guid;
      }) != -1;
      let inProject: boolean = project.nonEnergyBenefitIds.findIndex(nebId => {
        return nebId == this.nonEnergyBenefit.guid;
      }) != -1;
      if (inNEB && !inProject) {
        project.nonEnergyBenefitIds.push(this.nonEnergyBenefit.guid);
      } else if (!inNEB && inProject) {
        project.nonEnergyBenefitIds = project.nonEnergyBenefitIds.filter(nebId => {
          return nebId != this.nonEnergyBenefit.guid;
        })
      }
    });
    this.setupWizardService.projects.next(this.projects);
    this.saveNonEnergyBenefit();
    this.closeProjectsModal();
  }
}
