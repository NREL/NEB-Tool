import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconDefinition, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
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

  projectsSub: Subscription;
  projects: Array<IdbProject>;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  constructor(
    private projectIdbService: ProjectIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });

    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    })
  }

  // setProjects() {
  //   let allProjects: Array<IdbProject> = this.setupWizardService.projects.getValue();
  //   this.projects = allProjects.filter(project => {
  //     return project.assessmentId == this.assessmentId
  //   });
  // }


  async addProject() {
    let newProject: IdbProject = getNewIdbProject(this.assessment.userId, this.assessment.companyId, this.assessment.guid, this.assessment.guid);
    let assessmentProjects: Array<IdbProject> = this.projects.filter(prj => {
      return prj.assessmentId == this.assessment.guid;
    });
    
    newProject.name = 'Project #' + (assessmentProjects.length + 1);
    await firstValueFrom(this.projectIdbService.addWithObservable(newProject));
    await this.projectIdbService.setProjects();
  }
}
