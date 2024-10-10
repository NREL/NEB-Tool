import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorReport } from '../../calculations/keyPerformanceIndicatorReport';

@Component({
  selector: 'app-performance-metrics-report',
  templateUrl: './performance-metrics-report.component.html',
  styleUrl: './performance-metrics-report.component.css'
})
export class PerformanceMetricsReportComponent {
  @Input({ required: true })
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;


  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService) {

  }

  ngOnInit() {
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    console.log(this.keyPerformanceIndicators);
  }
} 
