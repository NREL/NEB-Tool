import { Component } from '@angular/core';
import { UserIdbService } from './indexed-db/user-idb.service';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { ProjectIdbService } from './indexed-db/project-idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataInitialized: boolean = false;
  constructor(private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private projectIdbService: ProjectIdbService) {
  }

  async ngOnInit() {
    await this.initializeData();
  }

  async initializeData() {
    //Todo: add loading messaging
    //user
    console.log('init')
    await this.userIdbService.initializeData();
    console.log('users init..');
    //companies
    await this.companyIdbService.initializeData();
    console.log('companies init..');
    //facilities
    await this.facilityIdbService.initializeData();
    console.log('facilities init..');
    //projects 
    await this.projectIdbService.initializeData();
    console.log('projects init..');
    this.dataInitialized = true;
  }
}
