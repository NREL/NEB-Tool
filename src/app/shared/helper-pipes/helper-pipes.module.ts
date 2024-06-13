import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyNamePipe } from './company-name.pipe';
import { FacilityNamePipe } from './facility-name.pipe';
import { FacilityListPipe } from './facility-list.pipe';
import { AddressDisplayPipe } from './address-display.pipe';
import { AssessmentsListPipe } from './assessments-list.pipe';
import { KpiLabelPipe } from './kpi-label.pipe';
import { UnitsDisplayPipe } from './units-display.pipe';
import { ContactNamePipe } from './contact-name.pipe';
import { EquipmentTypeIconPipe } from './equipment-type-icon.pipe';
import { IncludesContactPipe } from './includes-contact.pipe';
import { AssessmentNameDisplayPipe } from './assessment-name-display.pipe';
import { ProcessEquipmentDisplayPipe } from './process-equipment-display.pipe';
import { NebDisplayPipe } from './neb-display.pipe';
import { OnSiteVisitListPipe } from './on-site-visit-list.pipe';
import { AssessmentListOnSitePipe } from './assessment-list-on-site.pipe';
import { NebListPipe } from './neb-list.pipe';
import { CompanyKpiListPipe } from './company-kpi-list.pipe';
import { EnergyOpportunityDisplayPipe } from './energy-opportunity-display.pipe';
import { EnergyOpportunityListPipe } from './energy-opportunity-list.pipe';
import { KpiCategoryClassPipe } from './kpi-category-class.pipe';

@NgModule({
  declarations: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    AddressDisplayPipe,
    AssessmentsListPipe,
    KpiLabelPipe,
    UnitsDisplayPipe,
    ContactNamePipe,
    EquipmentTypeIconPipe,
    IncludesContactPipe,
    AssessmentNameDisplayPipe,
    ProcessEquipmentDisplayPipe,
    NebDisplayPipe,
    OnSiteVisitListPipe,
    AssessmentListOnSitePipe,
    NebListPipe,
    CompanyKpiListPipe,
    EnergyOpportunityDisplayPipe,
    EnergyOpportunityListPipe,
    KpiCategoryClassPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    AddressDisplayPipe,
    AssessmentsListPipe,
    KpiLabelPipe,
    UnitsDisplayPipe,
    ContactNamePipe,
    EquipmentTypeIconPipe,
    IncludesContactPipe,
    AssessmentNameDisplayPipe,
    ProcessEquipmentDisplayPipe,
    NebDisplayPipe,
    OnSiteVisitListPipe,
    AssessmentListOnSitePipe,
    NebListPipe,
    CompanyKpiListPipe,
    EnergyOpportunityDisplayPipe,
    EnergyOpportunityListPipe,
    KpiCategoryClassPipe
  ]
})
export class HelperPipesModule { }
