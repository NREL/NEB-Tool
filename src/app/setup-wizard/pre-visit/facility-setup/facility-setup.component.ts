import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../../setup-wizard.service';
import { IconDefinition, faChevronLeft, faChevronRight, faContactCard, faFilePen, faGear, faIndustry, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';

@Component({
  selector: 'app-facility-setup',
  templateUrl: './facility-setup.component.html',
  styleUrl: './facility-setup.component.css'
})
export class FacilitySetupComponent {

  facilityName: string;


  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faIndustry: IconDefinition = faIndustry;


  constructor(private facilityIdbService: FacilityIdbService, private router: Router) {

  }

  ngOnInit() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    this.facilityName = facility.generalInformation.name;
  }

  async saveChanges() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    facility.generalInformation.name = this.facilityName;
    await this.facilityIdbService.asyncUpdate(facility);
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-contacts');
  }

  goToProcessEquipment() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }
}
