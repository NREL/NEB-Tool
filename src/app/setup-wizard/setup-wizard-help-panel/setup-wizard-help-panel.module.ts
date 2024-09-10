import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardHelpPanelComponent } from './setup-wizard-help-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupHelpComponent } from './company-setup-help/company-setup-help.component';
import { CompanyContactsHelpComponent } from './company-contacts-help/company-contacts-help.component';
import { CompanyKpiSelectHelpComponent } from './company-kpi-select-help/company-kpi-select-help.component';
import { CompanyKpiDetailHelpComponent } from './company-kpi-detail-help/company-kpi-detail-help.component';
import { FacilitySetupHelpComponent } from './facility-setup-help/facility-setup-help.component';
import { EnergyEquipmentHelpComponent } from './energy-equipment-help/energy-equipment-help.component';
import { EndUsesHelpComponent } from './end-uses-help/end-uses-help.component';
import { PreAssessmentHelpComponent } from './pre-assessment-help/pre-assessment-help.component';
import { ReviewPreVisitHelpComponent } from './review-pre-visit-help/review-pre-visit-help.component';



@NgModule({
  declarations: [
    SetupWizardHelpPanelComponent,
    CompanySetupHelpComponent,
    CompanyContactsHelpComponent,
    CompanyKpiSelectHelpComponent,
    CompanyKpiDetailHelpComponent,
    FacilitySetupHelpComponent,
    EnergyEquipmentHelpComponent,
    EndUsesHelpComponent,
    PreAssessmentHelpComponent,
    ReviewPreVisitHelpComponent
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
