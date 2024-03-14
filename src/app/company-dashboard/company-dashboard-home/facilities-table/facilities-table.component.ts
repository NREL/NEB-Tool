import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faIndustry, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-facilities-table',
  templateUrl: './facilities-table.component.html',
  styleUrl: './facilities-table.component.css'
})
export class FacilitiesTableComponent {
  
  faPlus: IconDefinition = faPlus;
  faIndustry: IconDefinition = faIndustry;


  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  company: IdbCompany;
  companySub: Subscription;
  displayAddNewModal: boolean = false;
  constructor(
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService,
    private router: Router) {
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


  openAddNewModal() {
    this.displayAddNewModal = true;
  }

  closeAddNewModal() {
    this.displayAddNewModal = false;
  }

  async confirmCreate() {
    let newFacility: IdbFacility = getNewIdbFacility(this.company.userId, this.company.guid);
    newFacility = await firstValueFrom(this.facilityIdbService.addWithObservable(newFacility));
    await this.facilityIdbService.setFacilities();
    this.router.navigateByUrl('/facility/' + newFacility.guid + '/settings');
  }
}
