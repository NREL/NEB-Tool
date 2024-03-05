import { Component } from '@angular/core';
import { IconDefinition, faContactCard, faFileLines, faIndustry, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.css']
})
export class FacilitiesListComponent {

  faPlus: IconDefinition = faPlus;
  faIndustry: IconDefinition = faIndustry;
  faLocationDot: IconDefinition = faLocationDot;
  faContactCard: IconDefinition = faContactCard;
  faFileLines: IconDefinition = faFileLines;

  selectedCompany: IdbCompany;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
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

  async addFacility() {
    let newFacility: IdbFacility = getNewIdbFacility(this.selectedCompany.userId, this.selectedCompany.guid);
    newFacility = await firstValueFrom(this.facilityIdbService.addWithObservable(newFacility));
    await this.facilityIdbService.setFacilities();
  }

}
