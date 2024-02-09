import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityDashboardComponent } from './facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard-home/facility-dashboard-home.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FacilityDashboardComponent,
    FacilityDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class FacilityDashboardModule { }
