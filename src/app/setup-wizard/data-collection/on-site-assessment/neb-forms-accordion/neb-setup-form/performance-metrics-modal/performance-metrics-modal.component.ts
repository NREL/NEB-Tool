import { Component, Input } from '@angular/core';
import { faAsterisk, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, faSearchPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { getNewKeyPerformanceIndicator, IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-performance-metrics-modal',
  templateUrl: './performance-metrics-modal.component.html',
  styleUrl: './performance-metrics-modal.component.css'
})
export class PerformanceMetricsModalComponent {
  @Input({ required: true })
  nonEnergyBenefit: IdbNonEnergyBenefit;

  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faChevronDown: IconDefinition = faChevronDown;
  faChevronUp: IconDefinition = faChevronUp;
  faAsterisk: IconDefinition = faAsterisk;

  displayMetricsModal: boolean = false;

  performanceMetricToAdd: KeyPerformanceMetricOption | KeyPerformanceMetric;

  performanceMetricOptions: Array<KeyPerformanceMetricOption> = [];

  kpmSearchStr: string = '';
  orderByDir: 'asc' | 'desc' = 'desc';
  filterAssociatedMetrics: boolean = false;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;

  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService
  ) {

  }

  openMetricModal() {
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.displayMetricsModal = true;
    this.setMetricOptions();
  }

  closeAddMetricModal() {
    this.displayMetricsModal = false;
    this.performanceMetricToAdd = undefined;
  }

  async confirmAddMetric() {
    //make sure metric is tracked in KPI
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.companyId, this.performanceMetricToAdd.kpiValue);
    if (keyPerformanceIndicator) {
      //if exists turn on untracked metric
      keyPerformanceIndicator.performanceMetrics.forEach(_metric => {
        if (_metric.value == this.performanceMetricToAdd.value) {
          _metric.includeMetric = true
        }
      });
      await this.keyPerformanceIndicatorIdbService.asyncUpdate(keyPerformanceIndicator);
    } else {
      //add untracked KPI if doesn't exist
      let kpiOption: KeyPerformanceIndicatorOption = KeyPerformanceIndicatorOptions.find(option => {
        return option.optionValue == this.performanceMetricToAdd.kpiValue
      });
      keyPerformanceIndicator = getNewKeyPerformanceIndicator(this.nonEnergyBenefit.userId, this.nonEnergyBenefit.companyId, kpiOption, false);
      keyPerformanceIndicator.performanceMetrics.forEach(_metric => {
        if (_metric.value == this.performanceMetricToAdd.value) {
          _metric.includeMetric = true
        } else {
          _metric.includeMetric = false;
        }
      });
      await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(keyPerformanceIndicator));
      await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
      await this.nonEnergyBenefitsIdbService.addCompanyKpi(keyPerformanceIndicator);
    }

    let newKeyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(this.nonEnergyBenefit.userId, this.nonEnergyBenefit.companyId, this.nonEnergyBenefit.facilityId, this.nonEnergyBenefit.energyOpportunityId, this.nonEnergyBenefit.guid, this.performanceMetricToAdd.value, this.nonEnergyBenefit.assessmentId);
    await firstValueFrom(this.keyPerformanceMetricImpactIdbService.addWithObservable(newKeyPerformanceMetricImpact));
    await this.keyPerformanceMetricImpactIdbService.setKeyPerformanceMetricImpacts();
    this.closeAddMetricModal();
  }

  addMetric(performanceMetric: KeyPerformanceMetricOption | KeyPerformanceMetric) {
    this.performanceMetricToAdd = performanceMetric;
  }

  setMetricOptions() {
    this.performanceMetricOptions = new Array();
    let includedMetrics: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactIdbService.getByNebGuid(this.nonEnergyBenefit.guid);
    let metricIds: Array<string> = includedMetrics.map(metric => {
      return metric.guid;
    });
    KeyPerformanceMetricOptions.forEach(metric => {
      if (this.filterAssociatedMetrics == true) {
        let nebOption: NebOption = NebOptions.find(option => { return option.optionValue == this.nonEnergyBenefit.nebOptionValue });
        if (nebOption) {
          if (metricIds.includes(metric.value) == false && nebOption.KPM.includes(metric.value)) {
            this.performanceMetricOptions.push(metric);
          }
        }
      } else {
        if (metricIds.includes(metric.value) == false) {
          this.performanceMetricOptions.push(metric);
        }
      }
    });

    if (this.filterAssociatedMetrics == false) {
      let companyKPMs: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.nonEnergyBenefit.companyId);
      let customMetrics: Array<KeyPerformanceMetric> = companyKPMs.filter(kpm => {
        return kpm.isCustom == true
      });
      customMetrics.forEach(metric => {
        if (metricIds.includes(metric.guid) == false) {
          this.performanceMetricOptions.push(metric);
        }
      })


    }
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }
}
