import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
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
  contacts: Array<IdbContact>;
  displayContactModal: boolean = false;
  viewContact: IdbContact;
  contactIndex: number;
  constructor(private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.companySub = this.setupWizardService.company.subscribe(_company => {
      this.company = _company;
    });
    this.contacts = this.setupWizardService.contacts.getValue();
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }

  saveChanges() {
    this.setupWizardService.company.next(this.company);
  }

  setAccordionIndex(num: number) {
    this.accordionIndex = num;
  }
  
  openDeleteModal(kpi: KeyPerformanceIndicator) {
    this.kpiToDelete = kpi;
    this.displayDeleteModal = true;
  }

  closeDeleteModal(){
      this.displayDeleteModal = false;
      this.kpiToDelete = undefined;
  }

  removeKPI() {
    this.company.keyPerformanceIndicators = this.company.keyPerformanceIndicators.filter(_kpi => {
      return this.kpiToDelete.kpiOptionValue != _kpi.kpiOptionValue;
    });
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
    this.setContacts();
  }

  setContacts() {
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
