import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard-home/company-dashboard-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CompanyDashboardModule { }
