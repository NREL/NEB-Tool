import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-primary-kpi-badge',
  templateUrl: './primary-kpi-badge.component.html',
  styleUrl: './primary-kpi-badge.component.css'
})
export class PrimaryKpiBadgeComponent {
  @Input({required: true})
  kpiValue: KeyPerformanceIndicatorValue;

  kpi: KeyPerformanceIndicatorOption;

  ngOnInit(){
    this.kpi = KeyPerformanceIndicatorOptions.find(option => {
      return option.optionValue == this.kpiValue;
    });
  }
}
