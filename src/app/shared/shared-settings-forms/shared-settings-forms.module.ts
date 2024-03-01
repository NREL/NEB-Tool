import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsFormComponent } from './units-form/units-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralInformationFormComponent } from './general-information-form/general-information-form.component';
import { NaicsListPipe } from './general-information-form/naics-list.pipe';



@NgModule({
  declarations: [
    UnitsFormComponent,
    GeneralInformationFormComponent,
    NaicsListPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UnitsFormComponent,
    GeneralInformationFormComponent
  ]
})
export class SharedSettingsFormsModule { }
