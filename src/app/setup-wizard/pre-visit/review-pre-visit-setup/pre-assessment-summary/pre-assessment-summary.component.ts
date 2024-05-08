import { Component } from '@angular/core';
import { IconDefinition, faScrewdriverWrench, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';

@Component({
  selector: 'app-pre-assessment-summary',
  templateUrl: './pre-assessment-summary.component.html',
  styleUrl: './pre-assessment-summary.component.css'
})
export class PreAssessmentSummaryComponent {


  assessments: Array<IdbAssessment>;
  visitDate: Date;
  faToolbox: IconDefinition = faToolbox;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  processEquipment: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  faUser: IconDefinition = faUser;
  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnInit(){
    this.assessments = this.setupWizardService.assessments.getValue();
    this.visitDate = this.assessments[0].visitDate;
    this.processEquipment = this.setupWizardService.facility.getValue().processEquipment;
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
