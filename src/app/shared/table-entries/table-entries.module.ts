import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCellItemComponent } from './single-cell-item/single-cell-item.component';



@NgModule({
  declarations: [
    SingleCellItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SingleCellItemComponent
  ]
})
export class TableEntriesModule { }
