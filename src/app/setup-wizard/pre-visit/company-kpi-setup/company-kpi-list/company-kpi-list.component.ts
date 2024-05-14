import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { KPI_Category, KPI_categories, KeyPerformanceIndicator } from 'src/app/shared/constants/keyPerformanceIndicators';

@Component({
  selector: 'app-company-kpi-list',
  templateUrl: './company-kpi-list.component.html',
  styleUrl: './company-kpi-list.component.css'
})
export class CompanyKpiListComponent {

  accordionIndex: number = 0;
  faTrash: IconDefinition = faTrash;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  company: IdbCompany;
  companySub: Subscription;
  kpi_categories: Array<KPI_Category> = KPI_categories;


  kpiToDelete: KeyPerformanceIndicator;
  displayDeleteModal: boolean = false;
  displayContactModal: boolean = false;
  viewContact: IdbContact;
  contactIndex: number;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  isFormChange: boolean = false;
  constructor(
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      if(!this.isFormChange){
        this.company = _company;
      }else{
        this.isFormChange = false;
      }
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async saveChanges() {
    this.isFormChange = true;
    await this.companyIdbService.asyncUpdate(this.company);
  }

  setAccordionIndex(num: number) {
    this.accordionIndex = num;
  }

  openDeleteModal(kpi: KeyPerformanceIndicator) {
    this.kpiToDelete = kpi;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.kpiToDelete = undefined;
  }

  async removeKPI() {
    this.company.keyPerformanceIndicators = this.company.keyPerformanceIndicators.filter(_kpi => {
      return this.kpiToDelete.kpiOptionValue != _kpi.kpiOptionValue;
    });
    this.contacts.forEach(contact => {
      contact.kpiIds = contact.assessmentIds.filter(aId => {
        return aId != this.kpiToDelete.kpiOptionValue;
      });
    });
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].kpiIds.includes(this.kpiToDelete.kpiOptionValue)) {
        this.contacts[i].kpiIds = this.contacts[i].kpiIds.filter(aId => {
          return aId != this.kpiToDelete.kpiOptionValue;
        });
        await this.contactIdbService.asyncUpdate(this.contacts[i]);
      }
    }
    this.closeDeleteModal();
    this.setAccordionIndex(0);
    this.saveChanges();
  }

  openContactModal(kpiIndex: number, viewContact: IdbContact) {
    this.contactIndex = kpiIndex;
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.contactIndex = undefined;
    this.viewContact = undefined;
  }
}
