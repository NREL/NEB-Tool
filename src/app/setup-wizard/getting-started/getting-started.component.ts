import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../setup-wizard.service';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css'
})
export class GettingStartedComponent {


  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;
  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  selectedCompanyGuid: string;
  selectedFacilityGuid: string;
  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private router: Router, private setupWizardService: SetupWizardService) {

  }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });


    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
  }

  createNewProject() {
    let selectedCompany: IdbCompany = this.setupWizardService.company.getValue();
    if (!selectedCompany) {
      //Start from scratch with new company
      this.router.navigateByUrl('setup-wizard/company-setup')
    } else {
      let selectedFacility: IdbFacility = this.setupWizardService.facility.getValue();
      if (!selectedFacility) {
        //start from new facility
        this.router.navigateByUrl('setup-wizard/facility-setup');
      } else {
        //create project within existing facility
        this.router.navigateByUrl('setup-wizard/project-setup');
      }
    }
  }

  setSelectedCompany() {
    let selectedCompany: IdbCompany = this.companies.find(company => {
      return company.guid == this.selectedCompanyGuid;
    });
    this.setupWizardService.company.next(selectedCompany);
    this.selectedFacilityGuid = undefined;
    this.setSelectedFacility();
  }

  setSelectedFacility() {
    let selectedFacility: IdbFacility = this.facilities.find(facility => {
      return facility.guid == this.selectedFacilityGuid;
    })
    this.setupWizardService.facility.next(selectedFacility);

  }
}
