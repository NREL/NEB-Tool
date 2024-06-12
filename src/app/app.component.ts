import { Component } from '@angular/core';
import { UserIdbService } from './indexed-db/user-idb.service';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { ProjectIdbService } from './indexed-db/project-idb.service';
import { Router } from '@angular/router';
import { IdbUser } from './models/user';
import { SharedDataService } from './shared/shared-services/shared-data.service';
import { AssessmentIdbService } from './indexed-db/assessment-idb.service';
import { ContactIdbService } from './indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from './indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from './indexed-db/on-site-visit-idb.service';
import { KeyPerformanceIndicatorsIdbService } from './indexed-db/key-performance-indicators-idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataInitialized: boolean = false;
  constructor(private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private projectIdbService: ProjectIdbService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService) {
  }

  async ngOnInit() {
    await this.initializeData();
    this.checkRouter();

  }

  async initializeData() {
    //Todo: add loading messaging
    //user
    console.log('init')
    await this.userIdbService.initializeData();
    console.log('users init..');
    //companies
    await this.companyIdbService.setCompanies();
    console.log('companies init..');
    //companies
    await this.contactIdbService.setContacts();
    console.log('contacts init..');
    //key performance indicators
    await this.keyPerformanceIndicatorsIdbService.setKeyPerformanceIndicators();
    console.log('key performance indicators init..');
    //facilities
    await this.facilityIdbService.setFacilities();
    console.log('facilities init..');
    //assessments 
    await this.assessmentIdbService.setAssessments();
    console.log('assessments init..');
    //projects 
    await this.projectIdbService.setProjects();
    console.log('projects init..');
    //non energy benefits 
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
    console.log('NEBs init..');
    //on site visist 
    await this.onSiteVisitIdbService.setOnSiteVisits();
    console.log('On Site Visit init..');
    this.dataInitialized = true;
  }

  checkRouter() {
    //on init check if initialized on welcome screen
    if (this.router.url == '/welcome') {
      let user: IdbUser = this.userIdbService.user.getValue();
      if (user.skipSplashScreen) {
        //if user skips the home screen navigate to dashboard.
        this.router.navigateByUrl('/user')
      }
    }
  }

  collapseSidebar() {
    if (this.sharedDataService.sidebarOpen.getValue() == true) {
      this.sharedDataService.sidebarOpen.next(false);
    }
  }
}
