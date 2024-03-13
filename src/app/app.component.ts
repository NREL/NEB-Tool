import { Component } from '@angular/core';
import { UserIdbService } from './indexed-db/user-idb.service';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { ProjectIdbService } from './indexed-db/project-idb.service';
import { NavigationEnd, Router } from '@angular/router';
import { IdbUser } from './models/user';
import { SharedDataService } from './shared/shared-services/shared-data.service';

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
    private sharedDataService: SharedDataService) {
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
    //facilities
    await this.facilityIdbService.setFacilities();
    console.log('facilities init..');
    //projects 
    await this.projectIdbService.setProjects();
    console.log('projects init..');
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

  collapseSidebar(){
    console.log('collapse..')
    this.sharedDataService.sidebarOpen.next(false);
  }
}
