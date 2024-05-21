import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { SharedDataService } from '../../shared/shared-services/shared-data.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-create-new-assessment-modal',
  templateUrl: './create-new-assessment-modal.component.html',
  styleUrl: './create-new-assessment-modal.component.css'
})
export class CreateNewAssessmentModalComponent {
  @Input()
  selectedCompanyGuid: string;
  @Input()
  selectedFacilityGuid: string;
  @Output('emitClose')
  emitClose: EventEmitter<boolean> = new EventEmitter();

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  selectedCompanySub: Subscription;


  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  selectedOnSiteVisitGuid: string;
  selectedOnSiteVisitSub: Subscription;

  selectedFacilitySub: Subscription;

  displayCreateNewModal: boolean = false;

  createAssessmentSub: Subscription;
  setupContext: SetupWizardContext = 'onSite';
  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private router: Router, private setupWizardService: SetupWizardService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private sharedDataService: SharedDataService,
    private userIdbService: UserIdbService) {
  }

  ngOnInit() {
    this.createAssessmentSub = this.sharedDataService.createAssessmentModalOpen.subscribe(modalOpen => {
      this.displayCreateNewModal = modalOpen;
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      if (_company) {
        this.selectedCompanyGuid = _company.guid;
      } else {
        this.selectedCompanyGuid = undefined;
      }
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });

    this.selectedFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      if (_facility) {
        this.selectedFacilityGuid = _facility.guid;
      } else {
        this.selectedFacilityGuid = undefined;
      }
    });

    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(_onSiteVisits => {
      this.onSiteVisits = _onSiteVisits;
    });

    this.selectedOnSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_onSiteVisit => {
      if (_onSiteVisit) {
        this.selectedOnSiteVisitGuid = _onSiteVisit.guid;
      } else {
        this.selectedOnSiteVisitGuid = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.createAssessmentSub.unsubscribe();
    this.selectedFacilitySub.unsubscribe();
    this.selectedCompanySub.unsubscribe();
    this.selectedOnSiteVisitSub.unsubscribe();
  }

  closeCreateNewModal() {
    this.sharedDataService.createAssessmentModalOpen.next(false);
  }

  async confirmCreate() {
    this.companyIdbService.selectedCompany.next(undefined);
    this.facilityIdbService.selectedFacility.next(undefined);
    let user: IdbUser = this.userIdbService.user.getValue();
    if (!this.selectedOnSiteVisitGuid) {
      this.setupContext = 'preVisit';
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

    this.setupWizardService.setupContext.next(this.setupContext)
    if (this.setupContext == 'full' || this.setupContext == 'preVisit') {
      this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.selectedOnSiteVisitGuid);
    } else if (this.setupContext == 'onSite') {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByGuid(this.selectedOnSiteVisitGuid);
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.selectedOnSiteVisitGuid + '/assessment/' + onSiteVisit.assessmentIds[0]);
    } else if (this.setupContext == 'postVisit') {
      // this.router.navigateByUrl('/setup-wizard/project-setup');
    }
    this.closeCreateNewModal();
  }
}
