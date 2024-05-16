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
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
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
  assessmentSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  processEquipmentOptions: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  displayContactModal: boolean = false;
  viewContact: IdbContact;

  assessmentIndex: number;
  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService, private activatedRoute: ActivatedRoute,
    private contactIdbService: ContactIdbService
  ) { }

  ngOnInit() {
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    })

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });

    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    })


    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessmentIndex = this.assessments.findIndex(_assessment => { return _assessment.guid == assessmentGUID });
      if (this.assessmentIndex != -1) {
        this.assessmentIdbService.selectedAssessment.next(this.assessments[this.assessmentIndex]);
      } else if (this.assessmentIndex == -1 && this.assessments.length > 0) {
        this.navigateToOnSiteAssessment(this.assessments[0].guid);
      } else if (!this.assessment) {
        this.router.navigateByUrl('/setup-wizard');
      }
    });
  }

  ngOnDestroy() {
    this.assessmentsSub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  openContactModal(viewContact: IdbContact) {
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
  }

  goToNextAssessment() {
    this.navigateToOnSiteAssessment(this.assessments[this.assessmentIndex + 1].guid);
  }

  goToPrevious() {
    this.navigateToOnSiteAssessment(this.assessments[this.assessmentIndex - 1].guid);
  }

  navigateToOnSiteAssessment(guid: string) {
    // this.router.navigateByUrl('/setup-wizard/on-site-assessment/' + guid);
  }

  goToResults() {
    this.router.navigateByUrl('/setup-wizard/review-data-collection');
  }
}
