import { Component, Input } from '@angular/core';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';

@Component({
  selector: 'app-contact-summary-card',
  templateUrl: './contact-summary-card.component.html',
  styleUrl: './contact-summary-card.component.css'
})
export class ContactSummaryCardComponent {
  @Input()
  contact: IdbContact;

  assessments: Array<IdbAssessment>;
  processEquipment: Array<ProcessEquipment>;
  faUser: IconDefinition = faUser;
  constructor(private assessmentIdbService: AssessmentIdbService, private facilityIdbService: FacilityIdbService
  ) {
  }

  ngOnInit() {
    this.assessments = this.assessmentIdbService.assessments.getValue();
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    this.processEquipment = facility.processEquipment;
  }
}
