import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent {

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  user: IdbUser;
  userSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService, private userIdbService: UserIdbService,
    private facilityIdbService: FacilityIdbService){
  }

  ngOnInit(){
    this.userSub = this.userIdbService.user.subscribe(_user => {
      this.user = _user;
    })

    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
  }

  ngOnDestroy(){
    this.companiesSub.unsubscribe();
    this.userSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
  }
}
