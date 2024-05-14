import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardComponent } from './setup-wizard.component';
import { RouterModule } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupComponent } from './pre-visit/company-setup/company-setup.component';
import { FacilitySetupComponent } from './pre-visit/facility-setup/facility-setup.component';
import { FormsModule } from '@angular/forms';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
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
import { KpiListFilterPipe } from './pre-visit/company-kpi-setup/add-kpi-search/kpi-list-filter.pipe';
import { ContactModalModule } from '../shared/contact-modal/contact-modal.module';
import { ReviewOnSiteComponent } from './on-site/review-on-site/review-on-site.component';
import { CompanyDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/company-details-summary/company-details-summary.component';
import { TeamDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/team-details-summary/team-details-summary.component';
import { ContactSummaryCardComponent } from './pre-visit/review-pre-visit-setup/team-details-summary/contact-summary-card/contact-summary-card.component';
import { CompanyKpisSummaryComponent } from './pre-visit/review-pre-visit-setup/company-kpis-summary/company-kpis-summary.component';
import { FacilityDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/facility-details-summary/facility-details-summary.component';
import { ProcessEquipmentSummaryComponent } from './pre-visit/review-pre-visit-setup/process-equipment-summary/process-equipment-summary.component';
import { PreAssessmentSummaryComponent } from './pre-visit/review-pre-visit-setup/pre-assessment-summary/pre-assessment-summary.component';
import { TableEntriesModule } from '../shared/table-entries/table-entries.module';
import { OnSiteAssessmentComponent } from './on-site/on-site-assessment/on-site-assessment.component';
import { AssessmentDetailsFormComponent } from './on-site/on-site-assessment/assessment-details-form/assessment-details-form.component';
import { AssessmentProjectsFormComponent } from './on-site/on-site-assessment/assessment-projects-form/assessment-projects-form.component';
import { ProjectSetupFormComponent } from './on-site/on-site-assessment/assessment-projects-form/project-setup-form/project-setup-form.component';
import { AssessmentNebsFormComponent } from './on-site/on-site-assessment/assessment-nebs-form/assessment-nebs-form.component';
import { NebSetupFormComponent } from './on-site/on-site-assessment/assessment-nebs-form/neb-setup-form/neb-setup-form.component';
import { PreVisitComponent } from './pre-visit/pre-visit.component';



@NgModule({
  declarations: [
    SetupWizardComponent,
    GettingStartedComponent,
    CompanySetupComponent,
    FacilitySetupComponent,
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
    CompanyKpiListComponent,
    KpiListFilterPipe,
    ReviewOnSiteComponent,
    CompanyDetailsSummaryComponent,
    TeamDetailsSummaryComponent,
    ContactSummaryCardComponent,
    CompanyKpisSummaryComponent,
    FacilityDetailsSummaryComponent,
    ProcessEquipmentSummaryComponent,
    PreAssessmentSummaryComponent,
    OnSiteAssessmentComponent,
    AssessmentDetailsFormComponent,
    AssessmentProjectsFormComponent,
    AssessmentNebsFormComponent,
    NebSetupFormComponent,
    PreVisitComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    SharedSettingsFormsModule,
    HelperPipesModule,
    ContactModalModule,
    TableEntriesModule
  ]
})
export class SetupWizardModule { }
