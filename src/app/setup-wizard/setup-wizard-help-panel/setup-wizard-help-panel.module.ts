import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardHelpPanelComponent } from './setup-wizard-help-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupHelpComponent } from './company-setup-help/company-setup-help.component';
import { CompanyContactsHelpComponent } from './company-contacts-help/company-contacts-help.component';
import { CompanyKpiSelectHelpComponent } from './company-kpi-select-help/company-kpi-select-help.component';



@NgModule({
  declarations: [
    SetupWizardHelpPanelComponent,
    CompanySetupHelpComponent,
    CompanyContactsHelpComponent,
    CompanyKpiSelectHelpComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SetupWizardHelpPanelComponent
  ]
})
export class SetupWizardHelpPanelModule { }
