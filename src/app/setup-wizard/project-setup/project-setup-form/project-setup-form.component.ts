import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbProject } from 'src/app/models/project';
import { IconDefinition, faArrowsToDot, faFileLines, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FanProjects, ProjectType } from 'src/app/shared/constants/projectOptions';

@Component({
  selector: 'app-project-setup-form',
  templateUrl: './project-setup-form.component.html',
  styleUrl: './project-setup-form.component.css'
})
export class ProjectSetupFormComponent {

  faFileLines: IconDefinition = faFileLines;
  faArrowsToDot: IconDefinition = faArrowsToDot;
  faSave: IconDefinition = faSave;
  faTrash: IconDefinition = faTrash;

  project: IdbProject;
  projects: Array<IdbProject>;

  projectTypes: Array<ProjectType> = FanProjects;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let projectGUID: string = params['id'];
      this.projects = this.setupWizardService.projects.getValue();
      this.project = this.projects.find(prj => { return prj.guid == projectGUID });
      if (!this.project) {
        this.goToProjectList();
      }
    });
  }

  deleteProject() {
    this.projects = this.projects.filter(_project => {
      return _project.guid == this.project.guid
    });
    this.setupWizardService.projects.next(this.projects);
    this.goToProjectList();
  }

  saveProject() {
    let projectIndex: number = this.projects.findIndex(prj => { return prj.guid == this.project.guid });
    this.projects[projectIndex] = this.project;
    this.setupWizardService.projects.next(this.projects);
    this.goToProjectList();
  }

  goToProjectList(){
    this.router.navigateByUrl('/setup-wizard/project-setup/projects');
  }
}
