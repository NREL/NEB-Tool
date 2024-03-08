import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardComponent } from './setup-wizard.component';
import { SetupWizardTabsComponent } from './setup-wizard-tabs/setup-wizard-tabs.component';
import { RouterModule } from '@angular/router';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupComponent } from './company-setup/company-setup.component';
import { FacilitySetupComponent } from './facility-setup/facility-setup.component';
import { ProjectSetupComponent } from './project-setup/project-setup.component';



@NgModule({
  declarations: [
    SetupWizardComponent,
    SetupWizardTabsComponent,
    GettingStartedComponent,
    CompanySetupComponent,
    FacilitySetupComponent,
    ProjectSetupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class SetupWizardModule { }
