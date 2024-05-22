import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard-home/company-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanyGoalsComponent } from './company-goals/company-goals.component';
import { CompanyDashboardTabsComponent } from './company-dashboard-tabs/company-dashboard-tabs.component';
import { CompanyReportsComponent } from './company-reports/company-reports.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { ProjectsTableComponent } from './company-dashboard-home/projects-table/projects-table.component';
import { FacilitiesTableComponent } from './company-dashboard-home/facilities-table/facilities-table.component';
import { AssessmentsTableComponent } from './company-dashboard-home/assessments-table/assessments-table.component';

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyDashboardHomeComponent,
    CompanyGoalsComponent,
    CompanyDashboardTabsComponent,
    CompanyReportsComponent,
    CompanySettingsComponent,
    ProjectsTableComponent,
    FacilitiesTableComponent,
    AssessmentsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HelperPipesModule,
    SharedSettingsFormsModule,
    FontAwesomeModule
  ]
})
export class CompanyDashboardModule { }
