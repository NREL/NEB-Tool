import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AssessmentDashboardHomeComponent } from './assessment-dashboard-home/assessment-dashboard-home.component';
import { AssessmentDashboardTabsComponent } from './assessment-dashboard-tabs/assessment-dashboard-tabs.component';
import { AssessmentReportComponent } from './assessment-report/assessment-report.component';
import { AssessmentSettingsComponent } from './assessment-settings/assessment-settings.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageAssessmentComponent } from './assessment-settings/manage-assessment/manage-assessment.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AssessmentDashboardComponent,
    AssessmentDashboardHomeComponent,
    AssessmentDashboardTabsComponent,
    AssessmentReportComponent,
    AssessmentSettingsComponent,
    ManageAssessmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class AssessmentDashboardModule { }
