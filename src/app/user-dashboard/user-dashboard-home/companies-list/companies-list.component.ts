import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faChevronDown, faChevronRight, faFileLines, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent {


  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faFileLines: IconDefinition = faFileLines;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  user: IdbUser;
  userSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService, private userIdbService: UserIdbService,
    private facilityIdbService: FacilityIdbService,
    private projectIdbService: ProjectIdbService) {
  }

  ngOnInit() {
    this.userSub = this.userIdbService.user.subscribe(_user => {
      this.user = _user;
    })

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
    this.userSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.projectsSub.unsubscribe();
  }

  async toggleShowFacilities(company: IdbCompany) {
    company.displayFacilities = !company.displayFacilities;
    await this.companyIdbService.asyncUpdate(company);
  }

  async toggleShowProjects(facility: IdbFacility) {
    facility.displayProjects = !facility.displayProjects;
    await this.facilityIdbService.asyncUpdate(facility);
  }
}
