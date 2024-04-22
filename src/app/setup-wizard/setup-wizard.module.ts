import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardComponent } from './setup-wizard.component';
import { SetupWizardTabsComponent } from './setup-wizard-tabs/setup-wizard-tabs.component';
import { RouterModule } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupComponent } from './pre-visit/company-setup/company-setup.component';
import { FacilitySetupComponent } from './pre-visit/facility-setup/facility-setup.component';
import { ProjectSetupComponent } from './project-setup/project-setup.component';
import { FormsModule } from '@angular/forms';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { AssessmentSetupComponent } from './assessment-setup/assessment-setup.component';
import { ProjectSetupListComponent } from './project-setup/project-setup-list/project-setup-list.component';
import { ProjectSetupFormComponent } from './project-setup/project-setup-form/project-setup-form.component';
import { ReviewSetupComponent } from './review-setup/review-setup.component';
import { CompanyKpiSetupComponent } from './pre-visit/company-kpi-setup/company-kpi-setup.component';
import { KpiUnitOptionPipe } from './pre-visit/company-kpi-setup/kpi-unit-option.pipe';
import { SetupWizardSidebarComponent } from './setup-wizard-sidebar/setup-wizard-sidebar.component';
import { KpiCategoryClassPipe } from './pre-visit/company-kpi-setup/kpi-category-class.pipe';
import { CompanyContactsSetupComponent } from './pre-visit/company-contacts-setup/company-contacts-setup.component';
import { FacilityProcessEquipmentSetupComponent } from './pre-visit/facility-process-equipment-setup/facility-process-equipment-setup.component';
import { PreAssessmentSetupComponent } from './pre-visit/pre-assessment-setup/pre-assessment-setup.component';
import { ReviewPreVisitSetupComponent } from './pre-visit/review-pre-visit-setup/review-pre-visit-setup.component';
import { AddKpiSearchComponent } from './pre-visit/company-kpi-setup/add-kpi-search/add-kpi-search.component';
import { CompanyKpiListComponent } from './pre-visit/company-kpi-setup/company-kpi-list/company-kpi-list.component';



@NgModule({
  declarations: [
    SetupWizardComponent,
    SetupWizardTabsComponent,
    GettingStartedComponent,
    CompanySetupComponent,
    FacilitySetupComponent,
    ProjectSetupComponent,
    AssessmentSetupComponent,
    ProjectSetupListComponent,
    ProjectSetupFormComponent,
    ReviewSetupComponent,
    CompanyKpiSetupComponent,
    KpiUnitOptionPipe,
    SetupWizardSidebarComponent,
    KpiCategoryClassPipe,
    CompanyContactsSetupComponent,
    FacilityProcessEquipmentSetupComponent,
    PreAssessmentSetupComponent,
    ReviewPreVisitSetupComponent,
    AddKpiSearchComponent,
    CompanyKpiListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    SharedSettingsFormsModule,
    HelperPipesModule
  ]
})
export class SetupWizardModule { }
