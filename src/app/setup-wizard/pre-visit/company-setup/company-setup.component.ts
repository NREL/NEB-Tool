import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IconDefinition, faBuilding, faChevronRight, faContactCard, faFilePen, faGear, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.css'
})
export class CompanySetupComponent {

  companyName: string;
  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faBuilding: IconDefinition = faBuilding;
  faChevronRight: IconDefinition = faChevronRight;

  selectedCompany: IdbCompany
  selectedCompanySub: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let companyGUID: string = params['id'];
      let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
      if (!selectedCompany || (selectedCompany.guid != companyGUID)) {
        console.log('here...?')
        let company: IdbCompany = this.companyIdbService.getByGUID(companyGUID);
        console.log(company);
        this.companyIdbService.selectedCompany.next(company);
      }
    });

    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      if (this.selectedCompany) {
        this.companyName = _company.generalInformation.name;
      }
    });
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  goToContacts() {
    let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    this.router.navigateByUrl('setup-wizard/company-contacts/' + selectedCompany.guid);
  }

  async saveChanges() {
    let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    selectedCompany.generalInformation.name = this.companyName;
    await this.companyIdbService.asyncUpdate(selectedCompany);
  }
}
