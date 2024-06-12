import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceIndicator, getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorOption, PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-company-kpi-list',
  templateUrl: './company-kpi-list.component.html',
  styleUrl: './company-kpi-list.component.css'
})
export class CompanyKpiListComponent {

  faTrash: IconDefinition = faTrash;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  faPlus: IconDefinition = faPlus;

  company: IdbCompany;
  companySub: Subscription;


  kpiToDelete: IdbKeyPerformanceIndicator;
  displayDeleteModal: boolean = false;
  displayContactModal: boolean = false;
  viewContact: IdbContact;
  contactIndex: number;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;

  displayCustomKPIModal: boolean = false;
  customKPIName: string = '';
  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  kpiCategory: PrimaryKPI = 'Other';
  constructor(
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
  }

  openDeleteModal(kpi: IdbKeyPerformanceIndicator) {
    console.log('open delete..')
    this.kpiToDelete = kpi;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.kpiToDelete = undefined;
  }

  async removeKPI() {
    await firstValueFrom(this.keyPerformanceIndicatorIdbService.deleteWithObservable(this.kpiToDelete.id));
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
    this.closeDeleteModal();
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

  openAddCustomModal() {
    this.displayCustomKPIModal = true;
  }

  closeCustomKPIModal() {
    this.displayCustomKPIModal = false;
  }

  async confirmCreate() {
    let option: KeyPerformanceIndicatorOption = {
      primaryKPI: this.kpiCategory,
      label: this.customKPIName,
      htmlLabel: this.customKPIName,
      optionValue: 'other'
    }
    let newKPI: IdbKeyPerformanceIndicator = getNewKeyPerformanceIndicator(this.company.userId, this.company.guid, option);
    await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(newKPI));
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
    this.closeCustomKPIModal();
  }

}
