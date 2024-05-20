import { Component } from '@angular/core';
import { IconDefinition, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';

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

  assessmentProjectGuids: Array<string> = [];
  constructor(
    private projectIdbService: ProjectIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
      this.setAssessmentProjectGuids();
    });

    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
      this.setAssessmentProjectGuids();
    })
  }

  ngOnDestroy(){
    this.projectsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  setAssessmentProjectGuids() {
    //only want to update projet list if changes made
    //otherwise forms get re-init when the list updates
    if (this.assessment && this.projects) {
      let assessmentProjects: Array<IdbProject> = this.projects.filter(prj => {
        return prj.assessmentId == this.assessment.guid
      });
      let tmpAssessmentProjects: Array<string> = assessmentProjects.map(prj => {
        return prj.guid
      });
      if (tmpAssessmentProjects.length != this.assessmentProjectGuids.length) {
        this.assessmentProjectGuids = tmpAssessmentProjects;
      } else {
        let notEqual: boolean = false;
        for(let i = 0; i < this.assessmentProjectGuids.length; i++){
          if(tmpAssessmentProjects[i] != this.assessmentProjectGuids[i]){
            notEqual = true;
          }
        }
        this.assessmentProjectGuids = tmpAssessmentProjects;
      }
    } else {
      this.assessmentProjectGuids = [];
    }
  }

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
