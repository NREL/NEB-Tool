import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBuilding, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrl: './company-settings.component.css'
})
export class CompanySettingsComponent {


  faBuilding: IconDefinition = faBuilding;
  faTrash: IconDefinition = faTrash;
  
  company: IdbCompany;
  companySub: Subscription;
  isFormChange: boolean = false;
  displayDeleteModal: boolean = false;
  constructor(private companyIdbService: CompanyIdbService,
    private dbChangesService: DbChangesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      if (!this.isFormChange) {
        this.company = _company;
      } else {
        this.isFormChange = false;
      }
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }

  async saveChanges() {
    this.isFormChange = true;
    await this.companyIdbService.asyncUpdate(this.company);
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
