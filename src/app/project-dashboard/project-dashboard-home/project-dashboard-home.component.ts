import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-dashboard-home',
  templateUrl: './project-dashboard-home.component.html',
  styleUrls: ['./project-dashboard-home.component.css']
})
export class ProjectDashboardHomeComponent {

  facilityId: string = 'A';
  companyId: string = 'A';
  projectId: string = '';
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }
}
