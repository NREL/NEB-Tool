import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-setup',
  templateUrl: './facility-setup.component.html',
  styleUrl: './facility-setup.component.css'
})
export class FacilitySetupComponent {

  constructor(private facilityIdbService: FacilityIdbService, private companyIdbService: CompanyIdbService,
    private router: Router) {

  }

  ngOnInit() {
    let newIdbCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany('someUser');
      this.companyIdbService.selectedCompany.next(newIdbCompany);
    }
    let newIdbFacility: IdbFacility = getNewIdbFacility(newIdbCompany.userId, newIdbCompany.guid);
    this.facilityIdbService.selectedFacility.next(newIdbFacility);
  }

  goToProject() {
    this.router.navigateByUrl('setup-wizard/project-setup');

  }
}
