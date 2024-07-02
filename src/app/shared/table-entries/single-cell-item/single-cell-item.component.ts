import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-cell-item',
  templateUrl: './single-cell-item.component.html',
  styleUrl: './single-cell-item.component.css'
})
export class SingleCellItemComponent {
  @Input()
  strValue: string;
  @Input()
  numValue: number;
  @Input()
  units: string;
  @Input()
  per: string;
  @Input()
  isCurrency: boolean;
}
