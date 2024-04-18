import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { SetupWizardService } from '../setup-wizard.service';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight, faMagnifyingGlass, faMagnifyingGlassPlus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IdbUser } from 'src/app/models/user';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { KPI_Category, KPI_Option, KPI_Options, KPI_categories, KeyPerformanceIndicator, getKeyPerformanceIndicator } from 'src/app/shared/constants/keyPerformanceIndicators';

@Component({
  selector: 'app-company-kpi-setup',
  templateUrl: './company-kpi-setup.component.html',
  styleUrl: './company-kpi-setup.component.css'
})
export class CompanyKpiSetupComponent {
  accordionIndex: number = 0;

  faChartBar: IconDefinition = faChartBar;
  faTrash: IconDefinition = faTrash;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faMagnifyingGlassPlus: IconDefinition = faMagnifyingGlassPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faPlus: IconDefinition = faPlus;
  kpi_Options: Array<KPI_Option>;

  company: IdbCompany;
  kpi_categories: Array<KPI_Category> = KPI_categories;
  kpiCategorySearch: KPI_Category | undefined = undefined;
  constructor(private setupWizardService: SetupWizardService, private router: Router,
    private userIdbService: UserIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    this.company = this.setupWizardService.company.getValue();
    if (!this.company) {
      this.company = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(this.company);
    }
    this.setKpiOptions();
  }

  saveChanges() {
    this.setupWizardService.company.next(this.company);
  }

  goToNext() {
    this.accordionIndex++;
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/company-setup');
  }

  setAccordionIndex(num: number) {
    this.accordionIndex = num;
  }

  addKPI(option: KPI_Option) {
    let newKPI: KeyPerformanceIndicator = getKeyPerformanceIndicator(option);
    this.company.keyPerformanceIndicators.push(newKPI);
    this.setKpiOptions();
  }

  removeKPI(kpi: KeyPerformanceIndicator) {
    this.company.keyPerformanceIndicators = this.company.keyPerformanceIndicators.filter(_kpi => {
      return kpi.kpiOptionValue != _kpi.kpiOptionValue;
    });
    this.setKpiOptions();
  }


  setKpiOptions() {
    if (this.company.keyPerformanceIndicators) {
      let currentSelections: Array<string> = this.company.keyPerformanceIndicators.map(kpi => {
        return kpi.kpiOptionValue;
      })
      this.kpi_Options = KPI_Options.filter(option => {
        return currentSelections.includes(option.value) == false;
      });
    } else {
      this.company.keyPerformanceIndicators = [];
      this.saveChanges();
    }
  }

  goToFacilityDetails() {
    this.router.navigateByUrl('/setup-wizard/facility-setup');
  }

  goToContacts() {
    this.router.navigateByUrl('/setup-wizard/company-contacts');
  }
}
