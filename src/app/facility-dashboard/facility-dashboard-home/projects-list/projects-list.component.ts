import { Component } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {

  faPlus: IconDefinition = faPlus;
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
      this.projects = _projects;
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  async addProject() {
    let newProject: IdbProject = getNewIdbProject(this.selectedFacility.userId, this.selectedFacility.companyId, this.selectedFacility.guid);
    newProject = await firstValueFrom(this.projectIdbService.addWithObservable(newProject));
    await this.projectIdbService.setProjects();
  }
}
