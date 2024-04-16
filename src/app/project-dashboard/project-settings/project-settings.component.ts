import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrl: './project-settings.component.css'
})
export class ProjectSettingsComponent {
  selectedProject: IdbProject;
  selectedProjectSub: Subscription;
  constructor(private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.selectedProjectSub = this.projectIdbService.selectedProject.subscribe(_project => {
      this.selectedProject = _project;
    });
  }

  ngOnDestroy() {
    this.selectedProjectSub.unsubscribe();
  }

 
  async saveChanges(){
    await this.projectIdbService.asyncUpdate(this.selectedProject);
  }
}
