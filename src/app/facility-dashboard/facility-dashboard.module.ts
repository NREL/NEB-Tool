import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDashboardComponent } from './facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard-home/facility-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { ProjectsListComponent } from './facility-dashboard-home/projects-list/projects-list.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';



@NgModule({
  declarations: [
    FacilityDashboardComponent,
    FacilityDashboardHomeComponent,
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HelperPipesModule,
    SharedSettingsFormsModule
  ]
})
export class FacilityDashboardModule { }
