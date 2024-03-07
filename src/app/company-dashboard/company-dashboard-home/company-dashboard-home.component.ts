import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-company-dashboard-home',
  templateUrl: './company-dashboard-home.component.html',
  styleUrls: ['./company-dashboard-home.component.css']
})
export class CompanyDashboardHomeComponent {

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private dbChangesService: DbChangesService,
    private router: Router) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      //No company selected. Go back to dashboard.
      if(!this.selectedCompany){
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  async addFacility() {
    let newFacility: IdbFacility = getNewIdbFacility(this.selectedCompany.userId, this.selectedCompany.guid);
    newFacility = await firstValueFrom(this.facilityIdbService.addWithObservable(newFacility));
    await this.facilityIdbService.setFacilities();
  }

  async deleteCompany(){
    await this.dbChangesService.deleteCompany(this.selectedCompany);
    this.router.navigateByUrl('/user')
  }
}
