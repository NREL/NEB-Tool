import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyNamePipe } from './company-name.pipe';
import { FacilityNamePipe } from './facility-name.pipe';
import { FacilityListPipe } from './facility-list.pipe';
import { ProjectsListPipe } from './projects-list.pipe';
import { AddressDisplayPipe } from './address-display.pipe';
import { AssessmentsListPipe } from './assessments-list.pipe';
import { KpiLabelPipe } from './kpi-label.pipe';
import { UnitsDisplayPipe } from './units-display.pipe';
import { ContactNamePipe } from './contact-name.pipe';

@NgModule({
  declarations: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    ProjectsListPipe,
    AddressDisplayPipe,
    AssessmentsListPipe,
    KpiLabelPipe,
    UnitsDisplayPipe,
    ContactNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    ProjectsListPipe,
    AddressDisplayPipe,
    AssessmentsListPipe,
    KpiLabelPipe,
    UnitsDisplayPipe,
    ContactNamePipe
  ]
})
export class HelperPipesModule { }
