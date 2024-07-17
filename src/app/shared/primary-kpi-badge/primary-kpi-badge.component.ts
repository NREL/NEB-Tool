import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';

@Component({
  selector: 'app-primary-kpi-badge',
  templateUrl: './primary-kpi-badge.component.html',
  styleUrl: './primary-kpi-badge.component.css'
})
export class PrimaryKpiBadgeComponent {
  @Input()
  kpiValue: KeyPerformanceIndicatorValue;
  @Input()
  kpiOption: KeyPerformanceIndicatorOption;
  @Input()
  companyGuid: string

  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService) {
  }

  ngOnInit() {
    if (!this.kpiOption && this.kpiValue != 'other') {
      this.kpiOption = KeyPerformanceIndicatorOptions.find(option => {
        return option.optionValue == this.kpiValue;
      });
    } else if (this.kpiValue == 'other' && this.companyGuid) {
      this.kpiOption = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.companyGuid, this.kpiValue);
    }
  }
}
