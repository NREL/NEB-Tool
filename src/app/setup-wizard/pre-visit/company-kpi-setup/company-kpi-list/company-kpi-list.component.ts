import { Component } from '@angular/core';
import { IconDefinition, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
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

  company: IdbCompany;
  companySub: Subscription;
  kpi_categories: Array<KPI_Category> = KPI_categories;

  constructor(private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.companySub = this.setupWizardService.company.subscribe(_company => {
      this.company = _company;
    });
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

  removeKPI(kpi: KeyPerformanceIndicator) {
    this.company.keyPerformanceIndicators = this.company.keyPerformanceIndicators.filter(_kpi => {
      return kpi.kpiOptionValue != _kpi.kpiOptionValue;
    });
    this.saveChanges();
  }

}
