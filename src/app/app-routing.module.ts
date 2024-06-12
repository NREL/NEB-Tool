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
import { SetupWizardComponent } from './setup-wizard/setup-wizard.component';
import { GettingStartedComponent } from './setup-wizard/getting-started/getting-started.component';
import { CompanySetupComponent } from './setup-wizard/pre-visit/company-setup/company-setup.component';
import { FacilitySetupComponent } from './setup-wizard/pre-visit/facility-setup/facility-setup.component';
import { UserSettingsComponent } from './user-dashboard/user-settings/user-settings.component';
import { CompanySettingsComponent } from './company-dashboard/company-settings/company-settings.component';
import { CompanyReportsComponent } from './company-dashboard/company-reports/company-reports.component';
import { FacilitySettingsComponent } from './facility-dashboard/facility-settings/facility-settings.component';
import { FacilityReportsComponent } from './facility-dashboard/facility-reports/facility-reports.component';
import { UserDashboardHelpComponent } from './user-dashboard/user-dashboard-help/user-dashboard-help.component';
import { ExploreNEBsComponent } from './user-dashboard/explore-nebs/explore-nebs.component';
import { CompanyGoalsComponent } from './company-dashboard/company-goals/company-goals.component';
import { FacilityGoalsComponent } from './facility-dashboard/facility-goals/facility-goals.component';
import { AssessmentDashboardComponent } from './assessment-dashboard/assessment-dashboard.component';
import { AssessmentDashboardHomeComponent } from './assessment-dashboard/assessment-dashboard-home/assessment-dashboard-home.component';
import { AssessmentSettingsComponent } from './assessment-dashboard/assessment-settings/assessment-settings.component';
import { AssessmentReportComponent } from './assessment-dashboard/assessment-report/assessment-report.component';
import { ReviewSetupComponent } from './setup-wizard/review-setup/review-setup.component';
import { CompanyKpiSetupComponent } from './setup-wizard/pre-visit/company-kpi-setup/company-kpi-setup.component';
import { CompanyContactsSetupComponent } from './setup-wizard/pre-visit/company-contacts-setup/company-contacts-setup.component';
import { FacilityProcessEquipmentSetupComponent } from './setup-wizard/pre-visit/facility-process-equipment-setup/facility-process-equipment-setup.component';
import { PreAssessmentSetupComponent } from './setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.component';
import { ReviewPreVisitSetupComponent } from './setup-wizard/pre-visit/review-pre-visit-setup/review-pre-visit-setup.component';
import { OnSiteAssessmentComponent } from './setup-wizard/data-collection/on-site-assessment/on-site-assessment.component';
import { ReviewOnSiteComponent } from './setup-wizard/data-collection/review-on-site/review-on-site.component';
import { PreVisitComponent } from './setup-wizard/pre-visit/pre-visit.component';
import { DataCollectionComponent } from './setup-wizard/data-collection/data-collection.component';
import { CompanyKpiSelectComponent } from './setup-wizard/pre-visit/company-kpi-select/company-kpi-select.component';
import { DataCollectionManageAssessmentsComponent } from './setup-wizard/data-collection/data-collection-manage-assessments/data-collection-manage-assessments.component';

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
        path: 'review-setup',
        component: ReviewSetupComponent
      },
      {
        path: 'pre-visit/:id',
        component: PreVisitComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'company-setup'
          },
          {
            path: 'company-setup',
            component: CompanySetupComponent
          },
          {
            path: 'company-kpi-select',
            component: CompanyKpiSelectComponent
          },
          {
            path: 'company-kpi',
            component: CompanyKpiSetupComponent
          },
          {
            path: 'company-contacts',
            component: CompanyContactsSetupComponent
          },
          {
            path: 'facility-setup',
            component: FacilitySetupComponent
          },
          {
            path: 'process-equipment',
            component: FacilityProcessEquipmentSetupComponent
          },
          {
            path: 'pre-assessment',
            component: PreAssessmentSetupComponent
          },
          {
            path: 'review-pre-visit',
            component: ReviewPreVisitSetupComponent
          }
        ]
      },
      {
        path: 'data-collection/:id',
        component: DataCollectionComponent,
        children: [
          {
            path: 'manage-assessments',
            component: DataCollectionManageAssessmentsComponent
          },
          {
            path: 'assessment/:id',
            component: OnSiteAssessmentComponent
          },
          {
            path: 'review-data-collection',
            component: ReviewOnSiteComponent
          },
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
