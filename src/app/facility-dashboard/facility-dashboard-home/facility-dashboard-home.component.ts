import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBuilding, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-dashboard-home',
  templateUrl: './facility-dashboard-home.component.html',
  styleUrls: ['./facility-dashboard-home.component.css']
})
export class FacilityDashboardHomeComponent {

  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  selectedFacility: IdbFacility;
  selectedFacilitySub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private companyIdbService: CompanyIdbService) {
  }

  ngOnInit() {
    this.selectedFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.selectedFacility = _facility;
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });
  }

  ngOnDestroy() {
    this.selectedFacilitySub.unsubscribe();
    this.companiesSub.unsubscribe();
  }


  async deleteFacility() {
    this.dbChangesService.deleteFacility(this.selectedFacility);
    this.router.navigateByUrl('/user/company/' + this.selectedFacility.companyId);
  }
}
