import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
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
  constructor(private activatedRoute: ActivatedRoute, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let companyGUID: string = params['id'];
      this.companyIdbService.setSelectedFromGUID(companyGUID);
    });

    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
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
}
