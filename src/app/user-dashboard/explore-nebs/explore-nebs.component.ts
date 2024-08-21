import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faMagnifyingGlass, faMagnifyingGlassPlus, faScaleUnbalancedFlip, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, PrimaryKPI, PrimaryKPIs } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from 'src/app/shared/constants/keyPerformanceMetrics';

@Component({
  selector: 'app-explore-nebs',
  templateUrl: './explore-nebs.component.html',
  styleUrl: './explore-nebs.component.css'
})
export class ExploreNEBsComponent {

  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceMetrics: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions;
  faBullseye: IconDefinition = faBullseye;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faWeightHanging: IconDefinition = faWeightHanging;
  faMagnifyingGlassPlus: IconDefinition = faMagnifyingGlassPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  kpiSearchStr: string = '';
  kpiCategorySearch: PrimaryKPI | undefined = undefined;

  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
}
