import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDashboardComponent } from './company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard-home/company-dashboard-home.component';
import { RouterModule } from '@angular/router';
import { FacilitiesListComponent } from './company-dashboard-home/facilities-list/facilities-list.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CompanyDashboardComponent,
    CompanyDashboardHomeComponent,
    FacilitiesListComponent
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
