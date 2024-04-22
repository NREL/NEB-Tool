import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { SetupWizardService } from '../../setup-wizard.service';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbUser } from 'src/app/models/user';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';

@Component({
  selector: 'app-company-kpi-setup',
  templateUrl: './company-kpi-setup.component.html',
  styleUrl: './company-kpi-setup.component.css'
})
export class CompanyKpiSetupComponent {

  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  company: IdbCompany;

  constructor(private setupWizardService: SetupWizardService, private router: Router,
    private userIdbService: UserIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    this.company = this.setupWizardService.company.getValue();
    if (!this.company) {
      this.company = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(this.company);
    }
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-setup');
  }

  goToContacts() {
    this.router.navigateByUrl('/setup-wizard/company-contacts');
  }
}
