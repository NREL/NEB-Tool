import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-details-form',
  templateUrl: './company-details-form.component.html',
  styleUrls: ['./company-details-form.component.css']
})
export class CompanyDetailsFormComponent {

  company: IdbCompany;
  companiesSub: Subscription;

  constructor(private companyIdbService: CompanyIdbService) {
  }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }

  async saveChanges(){
    await this.companyIdbService.asyncUpdate(this.company);
  }
}
