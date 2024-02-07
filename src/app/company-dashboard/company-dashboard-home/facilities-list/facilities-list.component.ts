import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.css']
})
export class FacilitiesListComponent {


  selectedCompany: IdbCompany;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService){
  }

  ngOnInit(){
    this.companiesSub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
    });


    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      //TODO: use pipe for facilities list filter
      this.facilities = _facilities.filter(facility => {return facility.companyId == this.selectedCompany.guid});
    });
  }

  ngOnDestroy(){
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
  }
}
