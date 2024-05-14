import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, first, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { IconDefinition, fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import * as _ from 'lodash';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbUser } from 'src/app/models/user';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

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

  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  selectedCompanyGuid: string;
  selectedFacilityGuid: string;
  selectedOnSiteVisitGuid: string;

  displayCreateNewModal: boolean = false;

  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService) {
  }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });

    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(_onSiteVisits => {
      this.onSiteVisits = _onSiteVisits;
    })
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
  }


  setSetupContext(context: SetupWizardContext) {
    this.setupWizardService.setupContext.next(context);
    this.openCreateNewModal();
  }

  openCreateNewModal() {
    this.displayCreateNewModal = true;
  }

  closeCreateNewModal() {
    this.displayCreateNewModal = false;
  }

  async confirmCreate() {
    let user: IdbUser = this.userIdbService.user.getValue();
    if (!this.selectedOnSiteVisitGuid) {
      if (!this.selectedCompanyGuid) {
        //create company
        let newCompanyGuid: string = await this.companyIdbService.addNewCompany(user.guid);
        //create facility
        let newFacilityGuid: string = await this.facilityIdbService.addNewFacility(user.guid, newCompanyGuid);
        //create visit
        this.selectedOnSiteVisitGuid = await this.onSiteVisitIdbService.addNewOnSiteVisit(user.guid, newCompanyGuid, newFacilityGuid);
      } else if (!this.selectedFacilityGuid) {
        //create facility
        let newFacilityGuid: string = await this.facilityIdbService.addNewFacility(user.guid, this.selectedCompanyGuid);
        //create visit
        this.selectedOnSiteVisitGuid = await this.onSiteVisitIdbService.addNewOnSiteVisit(user.guid, this.selectedCompanyGuid, newFacilityGuid);
      } else {
        //create visit
        this.selectedOnSiteVisitGuid = await this.onSiteVisitIdbService.addNewOnSiteVisit(user.guid, this.selectedCompanyGuid, this.selectedFacilityGuid);
      }
    }

    let context: SetupWizardContext = this.setupWizardService.setupContext.getValue();
    if (context == 'full' || context == 'preVisit') {
      this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.selectedOnSiteVisitGuid);
    } else if (context == 'onSite') {
      // let assessments: Array<IdbAssessment> = this.setupWizardService.assessments.getValue();
      // this.router.navigateByUrl('/setup-wizard/assessment-setup/' + assessments[0].guid);
    } else if (context == 'postVisit') {
      // this.router.navigateByUrl('/setup-wizard/project-setup');
    }
  }
}
