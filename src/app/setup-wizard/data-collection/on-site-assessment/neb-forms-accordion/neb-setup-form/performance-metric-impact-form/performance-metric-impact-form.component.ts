import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faPlus, faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';

@Component({
  selector: 'app-performance-metric-impact-form',
  templateUrl: './performance-metric-impact-form.component.html',
  styleUrl: './performance-metric-impact-form.component.css'
})
export class PerformanceMetricImpactFormComponent {
  @Input({ required: true })
  impactGuid: string;
  @Input({ required: true })
  nonEnergyBenefit: IdbNonEnergyBenefit;

  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faPlus: IconDefinition = faPlus;

  keyPerformanceMetric: KeyPerformanceMetric;
  disabledBaseline: boolean = true;
  
  keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact;
  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService
  ) {

  }

  ngOnInit() {
    this.keyPerformanceMetricImpact = this.keyPerformanceMetricImpactIdbService.getByGuid(this.impactGuid);
    this.keyPerformanceMetric = this.keyPerformanceIndicatorIdbService.getKeyPerformanceMetric(this.keyPerformanceMetricImpact.companyId, this.keyPerformanceMetricImpact.kpmValue)
  }

  async saveChanges() {
    await this.keyPerformanceMetricImpactIdbService.asyncUpdate(this.keyPerformanceMetricImpact);
  }

  calculateCost() {
    this.keyPerformanceMetricImpact.costAdjustment = (this.keyPerformanceMetricImpact.modificationValue * this.keyPerformanceMetric.costPerValue);
    this.saveChanges();
  }

  goToMetric(){
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.keyPerformanceMetricImpact.companyId, this.keyPerformanceMetric.kpiValue);
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/'+onSiteVisit.guid+'/company-kpi-detail/' + keyPerformanceIndicator.guid)
  }

  async savePerformanceMetric(){    
    console.log('update...')
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.companyId, this.keyPerformanceMetric.kpiValue);
    keyPerformanceIndicator.performanceMetrics.forEach(_metric => {
      if (_metric.value == this.keyPerformanceMetric.value) {
        _metric.baselineCost = this.keyPerformanceMetric.baselineCost;
        _metric.baselineValue = this.keyPerformanceMetric.baselineValue;
        _metric.costPerValue = this.keyPerformanceMetric.costPerValue;
      }
    });
    await this.keyPerformanceMetricImpactIdbService.updatePerformanceMetricBaseline(keyPerformanceIndicator, this.keyPerformanceMetric);
    await this.keyPerformanceIndicatorIdbService.asyncUpdate(keyPerformanceIndicator);
  }

  setDisabledBaseline(){

  }

  async calculateBaseline(){
    this.keyPerformanceMetric.baselineCost = (this.keyPerformanceMetric.baselineValue * this.keyPerformanceMetric.costPerValue);
    await this.savePerformanceMetric();
    await this.calculateCost();
  }
}
