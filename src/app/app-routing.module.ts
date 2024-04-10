import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { PageNotFoundComponent } from './core-components/page-not-found/page-not-found.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardHomeComponent } from './user-dashboard/user-dashboard-home/user-dashboard-home.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyDashboardHomeComponent } from './company-dashboard/company-dashboard-home/company-dashboard-home.component';
import { FacilityDashboardComponent } from './facility-dashboard/facility-dashboard.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard/facility-dashboard-home/facility-dashboard-home.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDashboardHomeComponent } from './project-dashboard/project-dashboard-home/project-dashboard-home.component';
import { SetupWizardComponent } from './setup-wizard/setup-wizard.component';
import { GettingStartedComponent } from './setup-wizard/getting-started/getting-started.component';
import { CompanySetupComponent } from './setup-wizard/company-setup/company-setup.component';
import { FacilitySetupComponent } from './setup-wizard/facility-setup/facility-setup.component';
import { ProjectSetupComponent } from './setup-wizard/project-setup/project-setup.component';
import { UserSettingsComponent } from './user-dashboard/user-settings/user-settings.component';
import { CompanySettingsComponent } from './company-dashboard/company-settings/company-settings.component';
import { CompanyReportsComponent } from './company-dashboard/company-reports/company-reports.component';
import { FacilitySettingsComponent } from './facility-dashboard/facility-settings/facility-settings.component';
import { FacilityReportsComponent } from './facility-dashboard/facility-reports/facility-reports.component';
import { ProjectReportComponent } from './project-dashboard/project-report/project-report.component';
import { ProjectSettingsComponent } from './project-dashboard/project-settings/project-settings.component';
import { UserDashboardHelpComponent } from './user-dashboard/user-dashboard-help/user-dashboard-help.component';
import { ExploreNEBsComponent } from './user-dashboard/explore-nebs/explore-nebs.component';
import { CompanyGoalsComponent } from './company-dashboard/company-goals/company-goals.component';
import { FacilityGoalsComponent } from './facility-dashboard/facility-goals/facility-goals.component';
import { AssessmentDashboardComponent } from './assessment-dashboard/assessment-dashboard.component';
import { AssessmentSetupComponent } from './setup-wizard/assessment-setup/assessment-setup.component';
import { AssessmentDashboardHomeComponent } from './assessment-dashboard/assessment-dashboard-home/assessment-dashboard-home.component';
import { AssessmentSettingsComponent } from './assessment-dashboard/assessment-settings/assessment-settings.component';
import { AssessmentReportComponent } from './assessment-dashboard/assessment-report/assessment-report.component';
import { ProjectSetupListComponent } from './setup-wizard/project-setup/project-setup-list/project-setup-list.component';
import { ProjectSetupFormComponent } from './setup-wizard/project-setup/project-setup-form/project-setup-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'setup-wizard',
    component: SetupWizardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'getting-started'
      },
      {
        path: 'getting-started',
        component: GettingStartedComponent
      },
      {
        path: 'company-setup',
        component: CompanySetupComponent
      },
      {
        path: 'facility-setup',
        component: FacilitySetupComponent
      },
      {
        path: 'assessment-setup',
        component: AssessmentSetupComponent
      },
      {
        path: 'project-setup',
        component: ProjectSetupComponent,
        children:[
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'projects'
          },
          {
            path: 'projects',
            component: ProjectSetupListComponent
          },
          {
            path: 'edit-project/:id',
            component: ProjectSetupFormComponent,
          }
        ]
      }
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: UserDashboardHomeComponent
      },
      {
        path: 'settings',
        component: UserSettingsComponent
      },
      {
        path: 'help',
        component: UserDashboardHelpComponent
      },
      {
        path: 'nebs-database',
        component: ExploreNEBsComponent
      }
    ]
  },
  {
    path: 'company/:id',
    component: CompanyDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: CompanyDashboardHomeComponent
      },
      {
        path: 'settings',
        component: CompanySettingsComponent
      },
      {
        path: 'reports',
        component: CompanyReportsComponent
      },
      {
        path: 'goals',
        component: CompanyGoalsComponent
      }
    ]
  },
  {
    path: 'facility/:id',
    component: FacilityDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: FacilityDashboardHomeComponent
      },
      {
        path: 'settings',
        component: FacilitySettingsComponent
      },
      {
        path: 'reports',
        component: FacilityReportsComponent
      },
      {
        path: 'goals',
        component: FacilityGoalsComponent
      }
    ]
  },
  {
    path: 'project/:id',
    component: ProjectDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: ProjectDashboardHomeComponent
      },
      {
        path: 'settings',
        component: ProjectSettingsComponent
      },
      {
        path: 'reports',
        component: ProjectReportComponent
      },
    ]
  },
  {
    path: 'assessment/:id',
    component: AssessmentDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: AssessmentDashboardHomeComponent
      },
      {
        path: 'settings',
        component: AssessmentSettingsComponent
      },
      {
        path: 'reports',
        component: AssessmentReportComponent
      },
    ]
  },
  //wildcard/page not found needs to be last route
  //triggered after entire route tree is checked
  { path: "**", component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
