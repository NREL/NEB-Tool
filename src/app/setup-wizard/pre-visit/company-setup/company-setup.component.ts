import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IconDefinition, faBuilding, faChevronRight, faContactCard, faFilePen, faGear, faLocationDot, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { Subscription } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.css'
})
export class CompanySetupComponent {

  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faBuilding: IconDefinition = faBuilding;
  faChevronRight: IconDefinition = faChevronRight;
  faCircleExclamation: IconDefinition = faCircleExclamation;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  name: FormControl;

  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      // if (this.selectedCompany) {
      //   this.companyName = _company.generalInformation.name;
      // }
      this.name = new FormControl(this.selectedCompany.generalInformation.name, [Validators.required]);
    });
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  goToContacts() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
  }

  async saveChanges() {
    let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    selectedCompany.generalInformation.name = this.name.value;
    await this.companyIdbService.asyncUpdate(selectedCompany);
  }
}
