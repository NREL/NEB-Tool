import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../../setup-wizard.service';
import { IconDefinition, faChevronLeft, faChevronRight, faContactCard, faFilePen, faGear, faIndustry, faLocationDot } from '@fortawesome/free-solid-svg-icons';

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


  constructor(private setupWizardService: SetupWizardService, private router: Router) {

  }

  ngOnInit() {
    //TODO: Temporary for dev.
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (company) {
      this.setupWizardService.initializeDataForDev();
    }
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    this.facilityName = facility.generalInformation.name;
  }

  saveChanges() {
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    facility.generalInformation.name = this.facilityName;
    this.setupWizardService.facility.next(facility);
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-contacts');
  }

  goToProcessEquipment() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }
}
