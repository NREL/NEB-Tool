import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsFormComponent } from './units-form/units-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaicsListPipe } from './additional-details-form/naics-list.pipe';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { PrimaryContactFormComponent } from './primary-contact-form/primary-contact-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { AdditionalDetailsFormComponent } from './additional-details-form/additional-details-form.component';

@NgModule({
  declarations: [
    UnitsFormComponent,
    NaicsListPipe,
    SettingsFormComponent,
    PrimaryContactFormComponent,
    LocationFormComponent,
    AdditionalDetailsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SettingsFormComponent
  ]
})
export class SharedSettingsFormsModule { }
