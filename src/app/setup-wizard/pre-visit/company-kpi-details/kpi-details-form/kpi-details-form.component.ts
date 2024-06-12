import { Component, Input } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-kpi-details-form',
  templateUrl: './kpi-details-form.component.html',
  styleUrl: './kpi-details-form.component.css'
})
export class KpiDetailsFormComponent {
  @Input()
  keyPerformanceIndicator: IdbKeyPerformanceIndicator;


  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  constructor(){

  }

  ngOnInit(){

  }
}
