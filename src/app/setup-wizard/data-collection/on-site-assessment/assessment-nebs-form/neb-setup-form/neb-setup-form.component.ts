import { Component, Input } from '@angular/core';
import { IconDefinition, faCircle, faCircleCheck, faFileLines, faNoteSticky, faSave, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
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
  faNoteSticky: IconDefinition = faNoteSticky;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<KeyPerformanceIndicator>;
  projects: Array<IdbProject>;
  projectsSub: Subscription;

  displayProjectsModal: boolean = false;
  previousProjectIds: Array<string>;
  kpi: KeyPerformanceIndicator;
  highlighNebGuidSub: Subscription;
  highlighNebGuid: string;
  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private companyIdbService: CompanyIdbService,
    private projectIdbService: ProjectIdbService,
    private dbChangesService: DbChangesService,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.keyPerformanceIndicators = this.companyIdbService.selectedCompany.getValue().keyPerformanceIndicators;
    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    });
    this.setKPI()

    this.highlighNebGuidSub = this.setupWizardService.highlighNebGuid.subscribe(_highlighNebGuid => {
      this.highlighNebGuid = _highlighNebGuid;
      if (this.highlighNebGuid) {
        setTimeout(() => {
          this.setupWizardService.highlighNebGuid.next(undefined);
        }, 5000)
      }
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.highlighNebGuidSub.unsubscribe();
  }

  async saveChanges() {
    await this.nonEnergyBenefitsIdbService.asyncUpdate(this.nonEnergyBenefit);
  }

  async deleteNonEnergyBenefit() {
    await this.dbChangesService.deleteNonEnergyBenefit(this.nonEnergyBenefit);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  highlightProject(projectGUID: string) {
    document.getElementById('project_' + projectGUID).scrollIntoView({ behavior: "smooth" });
    this.setupWizardService.highlighProjectGuid.next(projectGUID);
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

  async saveProjects() {
    for (let i = 0; i < this.projects.length; i++) {
      let project: IdbProject = this.projects[i];
      let needsUpdate: boolean = false
      let inNEB: boolean = this.nonEnergyBenefit.projectIds.findIndex(prjId => {
        return prjId == project.guid;
      }) != -1;
      let inProject: boolean = project.nonEnergyBenefitIds.findIndex(nebId => {
        return nebId == this.nonEnergyBenefit.guid;
      }) != -1;
      if (inNEB && !inProject) {
        needsUpdate = true;
        project.nonEnergyBenefitIds.push(this.nonEnergyBenefit.guid);
      } else if (!inNEB && inProject) {
        needsUpdate = true;
        project.nonEnergyBenefitIds = project.nonEnergyBenefitIds.filter(nebId => {
          return nebId != this.nonEnergyBenefit.guid;
        });
        await this.projectIdbService.asyncUpdate(project)
      }
    };
    await this.saveChanges();
    this.closeProjectsModal();
  }

  toggleNote() {
    this.nonEnergyBenefit.includeNote = !this.nonEnergyBenefit.includeNote;
    this.saveChanges();
  }

  setKPI() {
    this.kpi = this.keyPerformanceIndicators.find(kpi => {
      return kpi.kpiOptionValue == this.nonEnergyBenefit.kpiId;
    });
    this.saveChanges();
  }
}
