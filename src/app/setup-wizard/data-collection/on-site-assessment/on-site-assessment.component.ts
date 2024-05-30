import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faFilePen, faListCheck, faPeopleGroup, faPlus, faScrewdriverWrench, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { Subscription } from 'rxjs';
import { IdbContact } from 'src/app/models/contact';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

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

  onSiteAssessments: Array<IdbAssessment>;
  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  displayContactModal: boolean = false;
  viewContact: IdbContact;

  assessmentIndex: number;
  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService, 
    private activatedRoute: ActivatedRoute,
    private contactIdbService: ContactIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) { }

  ngOnInit() {
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_visit => {
      this.onSiteVisit = _visit;
    });

    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });

    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessmentIndex = this.onSiteVisit.assessmentIds.findIndex(_assessmentGuid => { return _assessmentGuid == assessmentGUID });
      if (this.assessmentIndex != -1) {
        this.assessmentIdbService.setSelectedFromGUID(this.onSiteVisit.assessmentIds[this.assessmentIndex]);
      } else if (this.assessmentIndex == -1 && this.onSiteVisit.assessmentIds.length > 0) {
        this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[0]);
      } else if (!this.assessment) {
        this.router.navigateByUrl('/setup-wizard');
      }
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
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
    this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex + 1]);
  }

  goToPrevious() {
    this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex - 1]);
  }

  navigateToOnSiteAssessment(guid: string) {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + guid);
  }

  goToResults() {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/review-data-collection');
  }

  goBack(){
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments');
  }
}
