import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AssessmentDashboardHomeComponent } from './assessment-dashboard-home/assessment-dashboard-home.component';
import { AssessmentDashboardTabsComponent } from './assessment-dashboard-tabs/assessment-dashboard-tabs.component';
import { AssessmentSettingsComponent } from './assessment-settings/assessment-settings.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageAssessmentComponent } from './assessment-settings/manage-assessment/manage-assessment.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';



@NgModule({
  declarations: [
    AssessmentDashboardComponent,
    AssessmentDashboardHomeComponent,
    AssessmentDashboardTabsComponent,
    AssessmentSettingsComponent,
    ManageAssessmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    HelperPipesModule
  ]
})
export class AssessmentDashboardModule { }
