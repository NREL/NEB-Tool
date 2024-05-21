import { Component } from '@angular/core';
import { IconDefinition, faScrewdriverWrench, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';

@Component({
  selector: 'app-pre-assessment-summary',
  templateUrl: './pre-assessment-summary.component.html',
  styleUrl: './pre-assessment-summary.component.css'
})
export class PreAssessmentSummaryComponent {


  assessments: Array<IdbAssessment>;
  faToolbox: IconDefinition = faToolbox;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  processEquipment: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  faUser: IconDefinition = faUser;
  onSiteVisit: IdbOnSiteVisit;
  constructor(private facilityIdbService: FacilityIdbService, private contactIdbService: ContactIdbService,
    private assessmentIdbService: AssessmentIdbService, private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.processEquipment = this.facilityIdbService.selectedFacility.getValue().processEquipment;
    this.contacts = this.contactIdbService.contacts.getValue();
  }
}
