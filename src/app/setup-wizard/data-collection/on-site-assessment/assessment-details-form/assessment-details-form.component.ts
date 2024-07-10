import { Component } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IconDefinition, faContactBook, faPeopleGroup, faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessment-details-form',
  templateUrl: './assessment-details-form.component.html',
  styleUrl: './assessment-details-form.component.css'
})
export class AssessmentDetailsFormComponent {

  faPeopleGroup: IconDefinition = faPeopleGroup;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  isFormChange: boolean = false;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  constructor(
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private setupWizardService: SetupWizardService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      if (!this.isFormChange) {
        this.assessment = _assessment;
      } else {
        this.isFormChange = false;
      }
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  async saveChanges() {
    this.isFormChange = true;
    await this.assessmentIdbService.asyncUpdate(this.assessment);
  }

  openContactModal(viewContact: IdbContact) {
    this.setupWizardService.displayContactModal.next({ context: 'assessment', viewContact: viewContact, contextGuid: this.assessment.guid });

  }
}
