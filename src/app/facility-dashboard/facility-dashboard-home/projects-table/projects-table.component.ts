import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {

  faPlus: IconDefinition = faPlus;
  faFileLines: IconDefinition = faFileLines;

  facility: IdbFacility;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  displayAddNewModal: boolean = false;
  constructor(
    private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService,
    private companyIdbService: CompanyIdbService,
    private setupWizardService: SetupWizardService,
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
    let companies: Array<IdbCompany> = this.companyIdbService.companies.getValue();
    let company: IdbCompany = companies.find(_company => {
      return _company.guid == this.facility.companyId;
    });
    this.setupWizardService.company.next(company);
    this.setupWizardService.facility.next(this.facility);
    this.router.navigateByUrl('/setup-wizard');
  }

}
