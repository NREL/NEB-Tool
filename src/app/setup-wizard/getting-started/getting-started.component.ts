import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { IconDefinition, fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import * as _ from 'lodash';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';

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

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  selectedCompanyGuid: string;
  selectedFacilityGuid: string;
  displayCreateNewModal: boolean = false;
  selectedVisit: Date;
  visitDates: Array<Date>;
  constructor(private companyIdbService: CompanyIdbService, private facilityIdbService: FacilityIdbService,
    private router: Router, private setupWizardService: SetupWizardService,
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService) {
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

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe()
    this.assessmentsSub.unsubscribe();
  }

  setSelectedCompany() {
    let selectedCompany: IdbCompany = this.companies.find(company => {
      return company.guid == this.selectedCompanyGuid;
    });
    this.setupWizardService.company.next(selectedCompany);
    this.selectedFacilityGuid = undefined;
    this.setCompanyContacts();
    this.setSelectedFacility();
  }

  setCompanyContacts() {
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    let companyContacts: Array<IdbContact> = contacts.filter(contact => {
      return contact.companyId == this.selectedCompanyGuid;
    });
    this.setupWizardService.contacts.next(companyContacts);
  }


  setSelectedFacility() {
    let selectedFacility: IdbFacility = this.facilities.find(facility => {
      return facility.guid == this.selectedFacilityGuid;
    })
    this.setupWizardService.facility.next(selectedFacility);
    this.setVisitDates();
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

  confirmCreate() {
    let context: SetupWizardContext = this.setupWizardService.setupContext.getValue();
    if (context == 'full' || context == 'preVisit') {
      this.router.navigateByUrl('/setup-wizard/company-setup');
    } else if (context == 'onSite') {
      let assessments: Array<IdbAssessment> = this.setupWizardService.assessments.getValue();
      this.router.navigateByUrl('/setup-wizard/assessment-setup/' + assessments[0].guid);
    } else if (context == 'postVisit') {
      this.router.navigateByUrl('/setup-wizard/project-setup');
    }
  }

  setVisitDates() {
    let facilityAssessments: Array<IdbAssessment> = this.assessments.filter(assessment => {
      return assessment.facilityId == this.selectedFacilityGuid;
    });
    let assessmentDates: Array<Date> = facilityAssessments.map(assessment => {
      return assessment.visitDate;
    });
    this.visitDates = _.uniqBy(assessmentDates, (date: Date) => {
      let dateStr = date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate()
      return dateStr
    });
    if (this.selectedVisit) {
      let checkExists = this.visitDates.find(date => {
        return date == this.selectedVisit;
      });
      if (!checkExists) {
        this.selectedVisit = undefined;
      }
    }
    this.setSelectedVisit();
  }

  setSelectedVisit() {
    let facilityAssessments: Array<IdbAssessment> = this.assessments.filter(assessment => {
      return assessment.facilityId == this.selectedFacilityGuid;
    });
    let visitAssessments: Array<IdbAssessment> = facilityAssessments.filter(assessment => {
      return assessment.visitDate == this.selectedVisit;
    });
    this.setupWizardService.assessments.next(visitAssessments);
  }
}
