import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faFilePen, faListCheck, faPeopleGroup, faPlus, faScrewdriverWrench, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbFacility } from 'src/app/models/facility';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { Subscription } from 'rxjs';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
@Component({
  selector: 'app-on-site-assessment',
  templateUrl: './on-site-assessment.component.html',
  styleUrl: './on-site-assessment.component.css'
})
export class OnSiteAssessmentComponent {

  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;

  faFilePen: IconDefinition = faFilePen;
  faListCheck: IconDefinition = faListCheck;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faPeople: IconDefinition = faPeopleGroup;
  faUser: IconDefinition = faUser;
  faPlus: IconDefinition = faPlus;

  assessment: IdbAssessment;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  processEquipmentOptions: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  displayContactModal: boolean = false;
  viewContact: IdbContact;

  assessmentIndex: number;
  constructor(private router: Router, private setupWizardService: SetupWizardService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (!company) {
      this.setupWizardService.initializeDataForDev();
    }
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    this.processEquipmentOptions = facility.processEquipment;
    this.contacts = this.setupWizardService.contacts.getValue();

    this.assessmentsSub = this.setupWizardService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });


    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessmentIndex = this.assessments.findIndex(_assessment => { return _assessment.guid == assessmentGUID });
      if (this.assessmentIndex != -1) {
        this.assessment = this.assessments[this.assessmentIndex];
      } else if (this.assessmentIndex == -1 && this.assessments.length > 0) {
        this.navigateToOnSiteAssessment(this.assessments[0].guid);
      } else if (!this.assessment) {
        this.router.navigateByUrl('/setup-wizard');
      }
    });
  }

  ngOnDestroy() {
    this.assessmentsSub.unsubscribe();
  }

  saveChanges() {
    let assessmentIndex: number = this.assessments.findIndex(assessment => {
      return assessment.guid == this.assessment.guid;
    });
    this.assessments[assessmentIndex] = this.assessment;
    this.setupWizardService.assessments.next(this.assessments);
  }

  openContactModal(viewContact: IdbContact) {
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
    this.setContacts();
  }

  setContacts() {
    this.contacts = this.setupWizardService.contacts.getValue();
  }

  goToNextAssessment() {
    this.navigateToOnSiteAssessment(this.assessments[this.assessmentIndex + 1].guid);
  }

  goToPrevious() {
    this.navigateToOnSiteAssessment(this.assessments[this.assessmentIndex - 1].guid);
  }

  navigateToOnSiteAssessment(guid: string) {
    this.router.navigateByUrl('/setup-wizard/on-site-assessment/' + guid);
  }

  goToResults() {
    this.router.navigateByUrl('/setup-wizard/review-data-collection');
  }
}
