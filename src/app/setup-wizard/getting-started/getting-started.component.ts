import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { IconDefinition, fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.css'
})
export class GettingStartedComponent {

  fa1: IconDefinition = fa1;
  fa2: IconDefinition = fa2;
  fa3: IconDefinition = fa3;

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
    let selectedCompany: IdbCompany = this.setupWizardService.company.getValue();
    if (selectedCompany) {
      this.selectedCompanyGuid = selectedCompany.guid;
    }
    let selectedFacility: IdbFacility = this.setupWizardService.facility.getValue();
    if (selectedFacility) {
      this.selectedFacilityGuid = selectedFacility.guid;
    }
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe()
  }

  createNewAssessment() {
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
        //create assessment within existing facility
        this.router.navigateByUrl('setup-wizard/assessment-setup');
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

  setSetupContext(context: SetupWizardContext) {
    this.setupWizardService.setupContext.next(context);
    if (context == 'full' || context == 'preVisit') {
      this.router.navigateByUrl('/setup-wizard/company-setup');
    }else if(context == 'onSite'){
      this.router.navigateByUrl('/setup-wizard/assessment-setup');
    }else if(context == 'postVisit'){
      this.router.navigateByUrl('/setup-wizard/project-setup');
    }
  }
}
