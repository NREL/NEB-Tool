import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
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
  constructor(private projectIdbService: ProjectIdbService,
    private dbChangesService: DbChangesService,
    private router: Router) {
  }

  ngOnInit() {
    this.selectedProjectSub = this.projectIdbService.selectedProject.subscribe(_project => {
      this.selectedProject = _project;
    });
  }

  ngOnDestroy() {
    this.selectedProjectSub.unsubscribe();
  }

  async deleteProject() {
    await this.dbChangesService.deleteProjects([this.selectedProject]);
    this.router.navigateByUrl('/user/company/' + this.selectedProject.companyId + '/facility/' + this.selectedProject.facilityId);
  }
}
