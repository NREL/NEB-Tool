import { Component, Input } from '@angular/core';
import { IconDefinition, faBullseye, faCircleQuestion, faPlus, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-kpi-details-form',
  templateUrl: './kpi-details-form.component.html',
  styleUrl: './kpi-details-form.component.css'
})
export class KpiDetailsFormComponent {
  @Input({ required: true })
  kpiGuid: string;

  keyPerformanceIndicator: IdbKeyPerformanceIndicator;
  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  faCircleQuestion: IconDefinition = faCircleQuestion;
  faBullseye: IconDefinition = faBullseye;
  faPlus: IconDefinition = faPlus;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService) {

  }

  ngOnInit() {
    this.keyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getByGuid(this.kpiGuid);
  }


  async saveChanges() {
    await this.keyPerformanceIndicatorIdbService.asyncUpdate(this.keyPerformanceIndicator);
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }

  calculateCost(){
    this.keyPerformanceIndicator.performanceMetrics.forEach(metric => {
      metric.baselineCost = (metric.costPerValue * metric.baselineValue);
    });
    this.saveChanges();
  }
}
