import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {

  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faFileLines: IconDefinition = faFileLines;

  facility: IdbFacility;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  displayAddNewModal: boolean = false;
  constructor(
    private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.facilitiesSub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    })
  }

  ngOnDestroy() {
    this.facilitiesSub.unsubscribe();
    this.projectsSub.unsubscribe();
  }

  openAddNewModal() {
    this.displayAddNewModal = true;
  }

  closeAddNewModal() {
    this.displayAddNewModal = false;
  }

  confirmCreate() {
    //TODO: Issue #75
    this.router.navigateByUrl('/setup-wizard');
  }

}
