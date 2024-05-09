import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessment-projects-form',
  templateUrl: './assessment-projects-form.component.html',
  styleUrl: './assessment-projects-form.component.css'
})
export class AssessmentProjectsFormComponent {

  faFileLines: IconDefinition = faFileLines;
  faPlus: IconDefinition = faPlus;
  projects: Array<IdbProject>;

  assessmentId: string;
  constructor(private setupWizardService: SetupWizardService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.assessmentId = params['id'];
      this.setProjects();
    });
  }

  setProjects() {
    let allProjects: Array<IdbProject> = this.setupWizardService.projects.getValue();
    this.projects = allProjects.filter(project => {
      return project.assessmentId == this.assessmentId
    });
  }


  addProject() {
    let assessments: Array<IdbAssessment> = this.setupWizardService.assessments.getValue();
    let currentAssessment: IdbAssessment = assessments.find(assessment => {
      return assessment.guid == this.assessmentId;
    })
    let newProject: IdbProject = getNewIdbProject(currentAssessment.userId, currentAssessment.companyId, currentAssessment.guid, currentAssessment.guid);
    newProject.name = 'Project #' + (this.projects.length + 1);
    let allProjects: Array<IdbProject> = this.setupWizardService.projects.getValue();
    allProjects.push(newProject);
    this.setupWizardService.projects.next(allProjects);
    this.setProjects();
  }
}
