import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectIdbService } from '../indexed-db/project-idb.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute, private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let projectGUID: string = params['id'];
      this.projectIdbService.setSelectedFromGUID(projectGUID);
      //TODO: if no project matching id, navigate to dashboard
    });
  }
}
