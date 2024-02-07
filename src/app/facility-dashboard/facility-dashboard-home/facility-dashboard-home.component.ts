import { Component } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-facility-dashboard-home',
  templateUrl: './facility-dashboard-home.component.html',
  styleUrls: ['./facility-dashboard-home.component.css']
})
export class FacilityDashboardHomeComponent {

  selectedFacility: IdbFacility;
  selectedFacilitySub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.selectedFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.selectedFacility = _facility;
    });
  }

  ngOnDestroy() {
    this.selectedFacilitySub.unsubscribe();
  }

  async addProject() {
    let newProject: IdbProject = getNewIdbProject(this.selectedFacility.userId, this.selectedFacility.companyId, this.selectedFacility.guid);
    newProject = await firstValueFrom(this.projectIdbService.addWithObservable(newProject));
    await this.projectIdbService.setProjects();
  }
}
