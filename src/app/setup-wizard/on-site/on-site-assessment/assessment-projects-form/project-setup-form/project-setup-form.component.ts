import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbProject } from 'src/app/models/project';
import { IconDefinition, faArrowsToDot, faFileLines, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FanProjects, ProjectType } from 'src/app/shared/constants/projectOptions';

@Component({
  selector: 'app-project-setup-form',
  templateUrl: './project-setup-form.component.html',
  styleUrl: './project-setup-form.component.css'
})
export class ProjectSetupFormComponent {
  @Input({ required: true })
  project: IdbProject;


  faFileLines: IconDefinition = faFileLines;
  faArrowsToDot: IconDefinition = faArrowsToDot;
  faSave: IconDefinition = faSave;
  faTrash: IconDefinition = faTrash;


  projectTypes: Array<ProjectType> = FanProjects;
  displayDeleteModal: boolean = false;
  constructor(
    private router: Router,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
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
}
