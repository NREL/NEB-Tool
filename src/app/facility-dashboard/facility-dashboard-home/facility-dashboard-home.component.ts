import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
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

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private companyIdbService: CompanyIdbService) {
  }

  ngOnInit() {
    this.selectedFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.selectedFacility = _facility;
      //no selected facility. navigate to home dashboard
      if (!this.selectedFacility) {
        this.router.navigateByUrl('/');
      }
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });
  }

  ngOnDestroy() {
    this.selectedFacilitySub.unsubscribe();
    this.companiesSub.unsubscribe();
  }

  async addProject() {
    let newProject: IdbProject = getNewIdbProject(this.selectedFacility.userId, this.selectedFacility.companyId, this.selectedFacility.guid);
    newProject = await firstValueFrom(this.projectIdbService.addWithObservable(newProject));
    await this.projectIdbService.setProjects();
  }

  async deleteFacility() {
    this.dbChangesService.deleteFacility(this.selectedFacility);
    this.router.navigateByUrl('/user/company/' + this.selectedFacility.companyId);
  }
}
