import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDashboardComponent } from './facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard-home/facility-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FacilityDetailsFormComponent } from './facility-dashboard-home/facility-details-form/facility-details-form.component';
import { ProjectsListComponent } from './facility-dashboard-home/projects-list/projects-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FacilityDashboardComponent,
    FacilityDashboardHomeComponent,
    FacilityDetailsFormComponent,
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class FacilityDashboardModule { }
