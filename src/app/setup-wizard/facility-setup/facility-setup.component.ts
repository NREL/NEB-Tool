import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../setup-wizard.service';
import { IconDefinition, faContactCard, faFilePen, faGear, faIndustry, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-facility-setup',
  templateUrl: './facility-setup.component.html',
  styleUrl: './facility-setup.component.css'
})
export class FacilitySetupComponent {

  accordionIndex: number = 0;
  facilityName: string;

  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faIndustry: IconDefinition = faIndustry;


  constructor(private setupWizardService: SetupWizardService, private router: Router,
    private userIdbService: UserIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newIdbCompany: IdbCompany = this.setupWizardService.company.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(newIdbCompany);
    }
    let newIdbFacility: IdbFacility = this.setupWizardService.facility.getValue();;
    if (!newIdbFacility) {
      newIdbFacility = getNewIdbFacility(newIdbCompany.userId, newIdbCompany.guid);
    }
    this.facilityName = newIdbFacility.generalInformation.name;
    this.setupWizardService.facility.next(newIdbFacility);
  }


  goToAssessment() {
    this.router.navigateByUrl('setup-wizard/assessment-setup');

  }

  saveChanges() {
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    facility.generalInformation.name = this.facilityName;
    this.setupWizardService.facility.next(facility);
  }

  goToNext() {
    this.accordionIndex++;
  }

  goBack() {
    if (this.accordionIndex != 0) {
      this.accordionIndex--;
    } else {
      this.router.navigateByUrl('/setup-wizard/company-kpi');
    }
  }

  setAccordionIndex(num: number) {
    this.accordionIndex = num;
  }
}
