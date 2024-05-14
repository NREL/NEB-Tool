import { Component } from '@angular/core';
import { IconDefinition, faDiagramProject, faUser } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
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
  constructor(private facilityIdbService: FacilityIdbService, private contactIdbService: ContactIdbService){

  }

  ngOnInit(){
    this.processEquipment = this.facilityIdbService.selectedFacility.getValue().processEquipment;
    this.contacts = this.contactIdbService.contacts.getValue();
  }
}
