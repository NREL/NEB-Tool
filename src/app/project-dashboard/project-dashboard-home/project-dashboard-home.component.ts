import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-project-dashboard-home',
  templateUrl: './project-dashboard-home.component.html',
  styleUrls: ['./project-dashboard-home.component.css']
})
export class ProjectDashboardHomeComponent {

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
}
