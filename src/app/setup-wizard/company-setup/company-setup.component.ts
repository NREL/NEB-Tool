import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { SetupWizardService } from '../setup-wizard.service';
import { IconDefinition, faBuilding, faContactCard, faFilePen, faGear, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { IdbUser } from 'src/app/models/user';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.css'
})
export class CompanySetupComponent {

  accordionIndex: number = 0;
  companyName: string;

  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faBuilding: IconDefinition = faBuilding;


  constructor(private setupWizardService: SetupWizardService, private router: Router,
    private userIdbService: UserIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newCompany: IdbCompany = this.setupWizardService.company.getValue();
    if (!newCompany) {
      newCompany = getNewIdbCompany(user.guid);
    }
    this.companyName = newCompany.generalInformation.name;
    this.setupWizardService.company.next(newCompany);
  }

  goToKpis() {
    this.router.navigateByUrl('setup-wizard/company-kpi')
  }

  saveChanges() {
    let selectedCompany: IdbCompany = this.setupWizardService.company.getValue();
    selectedCompany.generalInformation.name = this.companyName;
    this.setupWizardService.company.next(selectedCompany);
  }

  goToNext() {
    this.accordionIndex++;
  }

  goBack() {
    if (this.accordionIndex != 0) {
      this.accordionIndex--;
    } else {
      this.router.navigateByUrl('/setup-wizard/getting-started');
    }
  }

  setAccordionIndex(num: number) {
    this.accordionIndex = num;
  }
}
