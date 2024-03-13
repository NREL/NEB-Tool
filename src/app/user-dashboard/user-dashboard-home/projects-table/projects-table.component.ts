import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBuilding, faFileLines, faIndustry, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  

  faPlus: IconDefinition = faPlus;
  faFileLines: IconDefinition = faFileLines;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  displayAddNewModal: boolean = false;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
    this.projectsSub = this.projectIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    })
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
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
    this.router.navigateByUrl('/setup-wizard');
  }

}
