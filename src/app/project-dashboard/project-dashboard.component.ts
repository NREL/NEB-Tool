import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectIdbService } from '../indexed-db/project-idb.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute, private projectIdbService: ProjectIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let projectGUID: string = params['id'];
      let projectExists: boolean = this.projectIdbService.setSelectedFromGUID(projectGUID);
      if(!projectExists){
        this.router.navigateByUrl('/user');
      }

    });
  }
}
