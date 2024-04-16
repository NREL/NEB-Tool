import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsFormComponent } from './units-form/units-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaicsListPipe } from './additional-details-form/naics-list.pipe';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { PrimaryContactFormComponent } from './primary-contact-form/primary-contact-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { AdditionalDetailsFormComponent } from './additional-details-form/additional-details-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    UnitsFormComponent,
    SettingsFormComponent,
    PrimaryContactFormComponent,
    LocationFormComponent,
    AdditionalDetailsFormComponent
  ]
})
export class SharedSettingsFormsModule { }
