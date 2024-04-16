import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faDog, faPaw, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrl: './manage-company.component.css'
})
export class ManageCompanyComponent {

  faPaw: IconDefinition = faPaw;
  faTrash: IconDefinition = faTrash;

  accordionOpen: boolean = false;
  company: IdbCompany;
  companySub: Subscription;
  displayDeleteModal: boolean = false;
  constructor(private companyIdbService: CompanyIdbService,
    private dbChangesService: DbChangesService, private router: Router) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async confirmDelete() {
    await this.dbChangesService.deleteCompany(this.company);
    this.router.navigateByUrl('/user')
  }
}
