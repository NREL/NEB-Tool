import { Component, Input } from '@angular/core';
import { IconDefinition, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit, PerformanceMetricImpact } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';

@Component({
  selector: 'app-performance-metric-impact-form',
  templateUrl: './performance-metric-impact-form.component.html',
  styleUrl: './performance-metric-impact-form.component.css'
})
export class PerformanceMetricImpactFormComponent {
  @Input({ required: true })
  performanceMetricImpact: PerformanceMetricImpact;
  @Input({ required: true })
  nonEnergyBenefit: IdbNonEnergyBenefit;

  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  keyPerformanceMetric: KeyPerformanceMetric;
  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService
  ) {

  }

  ngOnInit() {
    this.keyPerformanceMetric = this.keyPerformanceIndicatorIdbService.getKeyPerformanceMetric(this.nonEnergyBenefit.companyId, this.performanceMetricImpact.kpmValue);
  }

  async saveChanges() {

    await this.nonEnergyBenefitsIdbService.asyncUpdate(this.nonEnergyBenefit);
  }

  calculateCost() {
    this.performanceMetricImpact.costAdjustment = (this.performanceMetricImpact.modificationValue * this.keyPerformanceMetric.costPerValue);
    this.saveChanges();
  }
}
