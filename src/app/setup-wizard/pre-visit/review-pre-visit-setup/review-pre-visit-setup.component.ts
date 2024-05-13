import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faCircleCheck, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons';
import { IdbCompany } from 'src/app/models/company';
import { SetupWizardContext, SetupWizardService } from '../../setup-wizard.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { firstValueFrom } from 'rxjs';
import { IdbFacility } from 'src/app/models/facility';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';

@Component({
  selector: 'app-review-pre-visit-setup',
  templateUrl: './review-pre-visit-setup.component.html',
  styleUrl: './review-pre-visit-setup.component.css'
})
export class ReviewPreVisitSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faCircleCheck: IconDefinition = faCircleCheck;
  faSave: IconDefinition = faSave;
  
  faFilePdf: IconDefinition = faFilePdf;

  company: IdbCompany;
  facility: IdbFacility;
  assessments: Array<IdbAssessment>;
  contacts: Array<IdbContact>;
  displayConfirmModal: boolean = false;
  setupContext: SetupWizardContext;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private contactIdbService: ContactIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.company = this.setupWizardService.company.getValue();
    if (!this.company) {
      this.setupWizardService.initializeDataForDev();
      this.company = this.setupWizardService.company.getValue();
    }

    this.facility = this.setupWizardService.facility.getValue();
    this.assessments = this.setupWizardService.assessments.getValue();
    this.contacts = this.setupWizardService.contacts.getValue();
    this.setupContext = this.setupWizardService.setupContext.getValue();
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }

  goToFacilitySetup() {
    this.router.navigateByUrl('/setup-wizard/review-pre-visit');
  }

  async submitPreVisit() {
    this.closeConfirmModal();
    this.loadingService.setLoadingMessage("Adding content...");
    this.loadingService.setLoadingStatus(true);
    if (!this.company.id) {
      //no id = new Add
      await firstValueFrom(this.companyIdbService.addWithObservable(this.company));
    } else {
      await firstValueFrom(this.companyIdbService.updateWithObservable(this.company));
    }
    await this.companyIdbService.setCompanies();

    if (!this.facility.id) {
      //no id = new Add
      await firstValueFrom(this.facilityIdbService.addWithObservable(this.facility));
    } else {
      await firstValueFrom(this.facilityIdbService.updateWithObservable(this.facility));
    }
    await this.facilityIdbService.setFacilities();

    for (let i = 0; i < this.contacts.length; i++) {
      let contact: IdbContact = this.contacts[i];
      if (!contact.id) {
        //no id = new Add
        await firstValueFrom(this.contactIdbService.addWithObservable(contact));
      } else {
        await firstValueFrom(this.contactIdbService.updateWithObservable(contact));
      }
    }
    this.contactIdbService.setContacts();

    for (let i = 0; i < this.assessments.length; i++) {
      let assessment: IdbAssessment = this.assessments[i];
      if (!assessment.id) {
        //no id = new Add
        await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
      } else {
        await firstValueFrom(this.assessmentIdbService.updateWithObservable(assessment));
      }
    }
    await this.assessmentIdbService.setAssessments();

    this.loadingService.setLoadingStatus(false);
    if (this.setupContext == 'preVisit') {
      this.router.navigateByUrl('/facility/' + this.facility.guid);
    } else if (this.setupContext == 'full') {
      this.router.navigateByUrl('/setup-wizard/on-site-assessment/' + this.assessments[0].guid);
    }
  }

  openConfirmModal() {
    this.displayConfirmModal = true;
  }

  closeConfirmModal() {
    this.displayConfirmModal = false;
  }

}
