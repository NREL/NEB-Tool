import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-facilities-table',
  templateUrl: './facilities-table.component.html',
  styleUrl: './facilities-table.component.css'
})
export class FacilitiesTableComponent {

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  company: IdbCompany;
  companySub: Subscription;
  constructor(
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    })
  }

  ngOnDestroy() {
    this.facilitiesSub.unsubscribe();
    this.projectsSub.unsubscribe();
    this.companySub.unsubscribe();
  }
}