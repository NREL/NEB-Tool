import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent {

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService){

  }

  ngOnInit(){
    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
      console.log(this.companies);
    });
  }

  ngOnDestroy(){
    this.companiesSub.unsubscribe();

  }
}
