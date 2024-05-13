import { Component, Input } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbProject } from 'src/app/models/project';
import { IconDefinition, faCircleCheck, faFileLines, faPlus, faSave, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { FanProjects, ProjectType } from 'src/app/shared/constants/projectOptions';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { Subscription } from 'rxjs';
import { SuggestedNEBs } from 'src/app/shared/constants/suggestedNEBs';

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
  previousSelectedNEBs: Array<string> = [];

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;
  highlighProjectGuid: string;
  highlighProjectGuidSub: Subscription;
  constructor(
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.nonEnergyBenefitsSub = this.setupWizardService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
    });
    this.suggestedNEBs = JSON.parse(JSON.stringify(SuggestedNEBs));
    this.highlighProjectGuidSub = this.setupWizardService.highlighProjectGuid.subscribe(_projectGuid => {
      this.highlighProjectGuid = _projectGuid;
      if (this.highlighProjectGuid) {
        setTimeout(() => {
          this.setupWizardService.highlighProjectGuid.next(undefined);
        }, 5000)
      }
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
    this.highlighProjectGuidSub.unsubscribe();
  }

  deleteProject() {
    this.nonEnergyBenefits.forEach(nonEnergyBenefit => {
      nonEnergyBenefit.projectIds = nonEnergyBenefit.projectIds.filter(prjId => {
        return prjId != this.project.guid
      })
    });
    this.setupWizardService.nonEnergyBenefits.next(this.nonEnergyBenefits);

    let projects: Array<IdbProject> = this.setupWizardService.projects.getValue();
    projects = projects.filter(_project => {
      return _project.guid != this.project.guid
    });
    this.setupWizardService.projects.next(projects);
    this.closeDeleteModal();
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
    this.previousSelectedNEBs = this.project.nonEnergyBenefitIds;
    this.displaySuggestedNEBsModal = true;
  }

  closeSuggestedNEBs(cancel?: boolean) {
    if (cancel) {
      this.project.nonEnergyBenefitIds = this.previousSelectedNEBs;
    }
    this.displaySuggestedNEBsModal = false;
  }

  addSuggestedNEBs() {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.setupWizardService.nonEnergyBenefits.getValue();
    this.suggestedNEBs.forEach(suggestedNEB => {
      if (this.project.nonEnergyBenefitIds.includes(suggestedNEB.guid)) {
        let existingIndex: number = nonEnergyBenefits.findIndex(neb => {
          return neb.assessmentId == this.project.assessmentId && suggestedNEB.guid == neb.guid;
        });
        if (existingIndex == -1) {
          let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.project.userId, this.project.companyId, this.project.facilityId, this.project.assessmentId);
          newNonEnergyBenefit.name = suggestedNEB.name;
          newNonEnergyBenefit.kpiId = suggestedNEB.kpiId;
          newNonEnergyBenefit.projectIds.push(this.project.guid);
          nonEnergyBenefits.push(newNonEnergyBenefit);
          this.project.nonEnergyBenefitIds = this.project.nonEnergyBenefitIds.filter(nebGuid => {
            return nebGuid != suggestedNEB.guid
          });
          this.project.nonEnergyBenefitIds.push(newNonEnergyBenefit.guid);
        } else {
          if (!nonEnergyBenefits[existingIndex].projectIds.includes(this.project.guid)) {
            nonEnergyBenefits[existingIndex].projectIds.push(this.project.guid);
          }
        }
      }
    });

    nonEnergyBenefits.forEach(neb => {
      if (neb.assessmentId == this.project.assessmentId) {
        if (neb.projectIds.includes(this.project.guid) && !this.project.nonEnergyBenefitIds.includes(neb.guid)) {
          neb.projectIds = neb.projectIds.filter(prjId => {
            return prjId != this.project.guid
          });
        }
      }
    });
    this.setupWizardService.nonEnergyBenefits.next(nonEnergyBenefits);
    this.closeSuggestedNEBs();

  }

  toggleSuggestedNEB(nebGUID: string) {
    if (this.project.nonEnergyBenefitIds.includes(nebGUID)) {
      this.project.nonEnergyBenefitIds = this.project.nonEnergyBenefitIds.filter(selectedGUID => {
        return selectedGUID != nebGUID;
      });
    } else {
      this.project.nonEnergyBenefitIds.push(nebGUID);
    }
  }

  highlightNEB(nebGUID: string) {
    document.getElementById('neb_' + nebGUID).scrollIntoView({ behavior: "smooth" })
    this.setupWizardService.highlighNebGuid.next(nebGUID);
  }
}