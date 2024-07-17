import { Component, Input } from '@angular/core';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-contact-summary-card',
  templateUrl: './contact-summary-card.component.html',
  styleUrl: './contact-summary-card.component.css'
})
export class ContactSummaryCardComponent {
  @Input()
  contact: IdbContact;

  assessments: Array<IdbAssessment>;
  processEquipment: Array<IdbProcessEquipment>;
  faUser: IconDefinition = faUser;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {
  }

  ngOnInit() {
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.processEquipment = this.processEquipmentIdbService.processEquipments.getValue();
  }
}
