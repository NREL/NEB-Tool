import { Component, Input } from '@angular/core';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
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
  constructor(private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.assessments = this.setupWizardService.assessments.getValue();
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    this.processEquipment = facility.processEquipment;
  }
}
