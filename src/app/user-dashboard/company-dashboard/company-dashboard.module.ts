import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard-home/company-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FacilityDashboardModule } from './facility-dashboard/facility-dashboard.module';



@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FacilityDashboardModule
  ]
})
export class CompanyDashboardModule { }
