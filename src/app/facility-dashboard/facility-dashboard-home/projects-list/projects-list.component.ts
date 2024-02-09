import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {

  selectedFacility: IdbFacility;
  facilitySub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  constructor(private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.selectedFacility = _facility;
    });


    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      //TODO: use pipe for projects list filter
      this.projects = _projects;
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }
}
