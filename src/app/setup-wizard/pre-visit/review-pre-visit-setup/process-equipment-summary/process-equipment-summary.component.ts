import { Component } from '@angular/core';
import { IconDefinition, faDiagramProject, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';

@Component({
  selector: 'app-process-equipment-summary',
  templateUrl: './process-equipment-summary.component.html',
  styleUrl: './process-equipment-summary.component.css'
})
export class ProcessEquipmentSummaryComponent {

  faDiagramProject: IconDefinition = faDiagramProject;
  processEquipment: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  faUser: IconDefinition = faUser;
  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnInit(){
    this.processEquipment = this.setupWizardService.facility.getValue().processEquipment;
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
