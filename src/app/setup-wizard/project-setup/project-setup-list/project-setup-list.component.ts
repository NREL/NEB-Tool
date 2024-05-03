import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faArrowsToDot, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from '../../setup-wizard.service';

@Component({
  selector: 'app-project-setup-list',
  templateUrl: './project-setup-list.component.html',
  styleUrl: './project-setup-list.component.css'
})
export class ProjectSetupListComponent {

  faFileLines: IconDefinition = faFileLines;
  faArrowsToDot: IconDefinition = faArrowsToDot;
  faPlus: IconDefinition = faPlus;

  projects: Array<IdbProject>;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService) {
  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newIdbCompany: IdbCompany = this.setupWizardService.company.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(newIdbCompany);
    }
    let newIdbFacility: IdbFacility = this.setupWizardService.facility.getValue();;
    if (!newIdbFacility) {
      newIdbFacility = getNewIdbFacility(newIdbCompany.userId, newIdbCompany.guid);
      this.setupWizardService.facility.next(newIdbFacility);
    }
    let newAssessment: IdbAssessment = this.setupWizardService.assessments.getValue()[0];
    if (!newAssessment) {
      newAssessment = getNewIdbAssessment(newIdbFacility.userId, newIdbFacility.companyId, newIdbFacility.guid);
      this.setupWizardService.assessments.next([newAssessment]);
    }
    this.setupWizardService.assessments.next([newAssessment]);
    this.projects = this.setupWizardService.projects.getValue();
  }

  addProject() {
    let assessment: IdbAssessment = this.setupWizardService.assessments.getValue()[0];
    let newProject: IdbProject = getNewIdbProject(assessment.userId, assessment.companyId, assessment.guid, assessment.guid);
    newProject.name = 'Project #' + (this.projects.length + 1);
    this.projects.push(newProject);
    this.setupWizardService.projects.next(this.projects);
    this.selectProject(newProject);
  }

  selectProject(project: IdbProject) {
    this.router.navigateByUrl('/setup-wizard/project-setup/edit-project/' + project.guid);
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/assessment-setup');
  }

  goToReviewSetup() {
    this.router.navigateByUrl('/setup-wizard/review-setup');
  }
}
