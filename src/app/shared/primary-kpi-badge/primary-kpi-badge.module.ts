import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryKpiBadgeComponent } from './primary-kpi-badge.component';
import { KpiCategoryClassPipe } from './kpi-category-class.pipe';



@NgModule({
  declarations: [
    PrimaryKpiBadgeComponent,
    KpiCategoryClassPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrimaryKpiBadgeComponent
  ]
})
export class PrimaryKpiBadgeModule { }
