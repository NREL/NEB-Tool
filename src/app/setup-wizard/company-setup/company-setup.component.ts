import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.css'
})
export class CompanySetupComponent {


  constructor(private companyIdbService: CompanyIdbService, private router: Router) {

  }

  ngOnInit() {
    let newIdbCompany: IdbCompany = getNewIdbCompany('someUser');
    this.companyIdbService.selectedCompany.next(newIdbCompany);
  }

  goToFacility() {
    this.router.navigateByUrl('setup-wizard/facility-setup')
  }
}
