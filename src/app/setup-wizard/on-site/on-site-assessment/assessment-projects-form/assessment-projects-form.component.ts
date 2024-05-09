import { Component, Input } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessment-projects-form',
  templateUrl: './assessment-projects-form.component.html',
  styleUrl: './assessment-projects-form.component.css'
})
export class AssessmentProjectsFormComponent {
  @Input({required: true})
  assessment: IdbAssessment;

  faPlus: IconDefinition = faPlus;
  projects: Array<IdbProject>;

  constructor(private setupWizardService: SetupWizardService){
  }

  ngOnInit(){
    this.projects = this.setupWizardService.projects.getValue();
  }


  addProject() {
    let newProject: IdbProject = getNewIdbProject(this.assessment.userId, this.assessment.companyId, this.assessment.guid, this.assessment.guid);
    newProject.name = 'Project #' + (this.projects.length + 1);
    this.projects.push(newProject);
    this.setupWizardService.projects.next(this.projects);
  }
}
