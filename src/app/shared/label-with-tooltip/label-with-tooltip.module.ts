import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelWithTooltipComponent } from './label-with-tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    LabelWithTooltipComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LabelWithTooltipComponent
  ]
})
export class LabelWithTooltipModule { }
