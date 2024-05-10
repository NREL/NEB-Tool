import { Component } from '@angular/core';
import { IconDefinition, faMagnifyingGlass, faMagnifyingGlassPlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { KPI_Category, KPI_Option, KPI_Options, KPI_categories, KeyPerformanceIndicator, getCustomKeyPerformanceIndicator, getKeyPerformanceIndicator } from 'src/app/shared/constants/keyPerformanceIndicators';

@Component({
  selector: 'app-add-kpi-search',
  templateUrl: './add-kpi-search.component.html',
  styleUrl: './add-kpi-search.component.css'
})
export class AddKpiSearchComponent {

  faMagnifyingGlassPlus: IconDefinition = faMagnifyingGlassPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faPlus: IconDefinition = faPlus;
  kpi_Options: Array<KPI_Option>;

  company: IdbCompany;
  companySub: Subscription;
  kpi_categories: Array<KPI_Category> = KPI_categories;

  displayCustomKPIModal: boolean = false;
  customKPIName: string = '';
  kpiCategorySearch: KPI_Category | undefined = undefined;
  kpiSearchStr: string = '';
  constructor(private companyIdbService: CompanyIdbService) {

  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
      this.setKpiOptions();
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }

  async saveChanges() {
    await this.companyIdbService.asyncUpdate(this.company);
  }

  setKpiOptions() {
    let currentSelections: Array<string> = this.company.keyPerformanceIndicators.map(kpi => {
      return kpi.kpiOptionValue;
    })
    this.kpi_Options = KPI_Options.filter(option => {
      return currentSelections.includes(option.value) == false;
    });
  }

  openAddCustomModal() {
    this.displayCustomKPIModal = true;
  }

  closeCustomKPIModal() {
    this.displayCustomKPIModal = false;
  }

  confirmCreate() {
    let customKPI: KeyPerformanceIndicator = getCustomKeyPerformanceIndicator(this.customKPIName);
    this.company.keyPerformanceIndicators.push(customKPI);
    this.closeCustomKPIModal();
  }


  async addKPI(option: KPI_Option) {
    let newKPI: KeyPerformanceIndicator = getKeyPerformanceIndicator(option);
    this.company.keyPerformanceIndicators.push(newKPI);
    await this.saveChanges();
  }
}
