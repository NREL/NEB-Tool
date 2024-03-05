import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyNamePipe } from './company-name.pipe';
import { FacilityNamePipe } from './facility-name.pipe';
import { FacilityListPipe } from './facility-list.pipe';
import { ProjectsListPipe } from './projects-list.pipe';
import { AddressDisplayPipe } from './address-display.pipe';



@NgModule({
  declarations: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    ProjectsListPipe,
    AddressDisplayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    ProjectsListPipe,
    AddressDisplayPipe
  ]
})
export class HelperPipesModule { }
