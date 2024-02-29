import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsFormComponent } from './units-form/units-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UnitsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UnitsFormComponent]
})
export class SharedSettingsFormsModule { }
