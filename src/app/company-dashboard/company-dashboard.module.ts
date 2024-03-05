import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard-home/company-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FacilitiesListComponent } from './company-dashboard-home/facilities-list/facilities-list.component';
import { CompanyDetailsFormComponent } from './company-dashboard-home/company-details-form/company-details-form.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyDashboardHomeComponent,
    FacilitiesListComponent,
    CompanyDetailsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HelperPipesModule
  ]
})
export class CompanyDashboardModule { }
