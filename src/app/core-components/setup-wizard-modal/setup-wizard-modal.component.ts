import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from '../../shared/shared-services/shared-data.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-setup-wizard-modal',
  templateUrl: './setup-wizard-modal.component.html',
  styleUrl: './setup-wizard-modal.component.css'
})
export class SetupWizardModalComponent {
  selectedCompanyGuid: string;
  selectedFacilityGuid: string;

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

  setupWizardSection: 'dataCollection' | 'dataEvaluation' | 'preVisit' = 'dataCollection';

  displayCreateNewModal: boolean = false;

  createAssessmentSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private router: Router,
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

  closeCreateNewModal() {
    this.sharedDataService.createAssessmentModalOpen.next(false);
  }

  setSelectedFacility() {
    if (this.selectedFacilityGuid) {
      if (this.selectedOnSiteVisitGuid) {
        let selectedVisit: IdbOnSiteVisit = this.onSiteVisits.find(onSiteVisit => {
          return onSiteVisit.guid == this.selectedOnSiteVisitGuid;
        });
        if (selectedVisit.facilityId != this.selectedFacilityGuid) {
          this.selectedOnSiteVisitGuid = undefined;
        }
      }
    } else {
      this.selectedOnSiteVisitGuid = undefined;
    }
  }

  setSelectedCompany() {
    if (this.selectedCompanyGuid) {
      if (this.selectedFacilityGuid) {
        let selectedFacility: IdbFacility = this.facilities.find(facility => {
          return facility.guid == this.selectedFacilityGuid;
        });
        if (selectedFacility.companyId != this.selectedCompanyGuid) {
          this.selectedFacilityGuid = undefined;
          this.selectedOnSiteVisitGuid = undefined;
        }
      } else {
        this.selectedOnSiteVisitGuid = undefined;
      }
    } else {
      this.selectedFacilityGuid = undefined;
      this.selectedOnSiteVisitGuid = undefined;
    }
  }

  async confirmCreate() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let isNew: boolean = false;
    if (!this.selectedOnSiteVisitGuid) {
      isNew = true;
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

    if (isNew) {
      this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.selectedOnSiteVisitGuid);
    } else {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByGuid(this.selectedOnSiteVisitGuid);
      if (this.setupWizardSection == 'preVisit') {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.selectedOnSiteVisitGuid);
      } else if (this.setupWizardSection == 'dataEvaluation') {
        this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.selectedOnSiteVisitGuid);
      } else {
        if (onSiteVisit.assessmentIds.length > 0) {
          this.router.navigateByUrl('/setup-wizard/data-collection/' + this.selectedOnSiteVisitGuid + '/assessment/' + onSiteVisit.assessmentIds[0]);
        } else {
          this.router.navigateByUrl('/setup-wizard/data-collection/' + this.selectedOnSiteVisitGuid + '/manage-assessments');
        }
      }
    }
    this.closeCreateNewModal();
  }
}
