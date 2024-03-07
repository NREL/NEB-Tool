import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-project-dashboard-home',
  templateUrl: './project-dashboard-home.component.html',
  styleUrls: ['./project-dashboard-home.component.css']
})
export class ProjectDashboardHomeComponent {

  selectedProject: IdbProject;
  selectedProjectSub: Subscription;
  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;
  constructor(private projectIdbService: ProjectIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService) {
  }

  ngOnInit() {
    this.selectedProjectSub = this.projectIdbService.selectedProject.subscribe(_project => {
      this.selectedProject = _project;
      //No project selected. Go back to dashboard.
      if(!this.selectedProject){
        this.router.navigateByUrl('/');
      }
    });
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });
    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    })
  }

  ngOnDestroy() {
    this.selectedProjectSub.unsubscribe();
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
  }

  async deleteProject() {
    await this.dbChangesService.deleteProjects([this.selectedProject]);
    this.router.navigateByUrl('/user/company/' + this.selectedProject.companyId + '/facility/' + this.selectedProject.facilityId);
  }
}
