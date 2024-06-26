import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDashboardComponent } from './facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard-home/facility-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacilityProductionDetailsComponent } from './facility-dashboard-home/facility-production-details/facility-production-details.component';
import { FacilityDashboardTabsComponent } from './facility-dashboard-tabs/facility-dashboard-tabs.component';
import { FacilitySettingsComponent } from './facility-settings/facility-settings.component';
import { FacilityReportsComponent } from './facility-reports/facility-reports.component';
import { FacilityGoalsComponent } from './facility-goals/facility-goals.component';
import { AssessmentsTableComponent } from './facility-dashboard-home/assessments-table/assessments-table.component';



@NgModule({
  declarations: [
    FacilityDashboardComponent,
    FacilityDashboardHomeComponent,
    FacilityProductionDetailsComponent,
    FacilityDashboardTabsComponent,
    FacilitySettingsComponent,
    FacilityReportsComponent,
    FacilityGoalsComponent,
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
export class FacilityDashboardModule { }
