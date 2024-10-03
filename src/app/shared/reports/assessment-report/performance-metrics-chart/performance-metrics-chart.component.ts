import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { KeyPerformanceIndicatorReport } from '../../calculations/keyPerformanceIndicatorReport';

@Component({
  selector: 'app-performance-metrics-chart',
  templateUrl: './performance-metrics-chart.component.html',
  styleUrl: './performance-metrics-chart.component.css'
})
export class PerformanceMetricsChartComponent {
  @Input({ required: true })
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;

  @ViewChild('performanceMetricsChart', { static: false }) performanceMetricsChart: ElementRef;
  constructor(private plotlyService: PlotlyService) {

  }

  ngAfterViewInit() {
    if (this.keyPerformanceIndicatorReport) {
      this.drawChart();
    }
  }

  drawChart() {
    var trace1 = {
      x: this.keyPerformanceIndicatorReport.kpiReportItems.map(kpiReport => {
        return kpiReport.keyPerformanceMetric.htmlLabel
      }),
      y: this.keyPerformanceIndicatorReport.kpiReportItems.map(kpiReportItem => {
        return kpiReportItem.keyPerformanceMetric.baselineCost - kpiReportItem.performanceMetricImpact.costAdjustment
      }),
      name: 'Modified Cost',
      type: 'bar'
    };

    var trace2 = {
      x: this.keyPerformanceIndicatorReport.kpiReportItems.map(kpiReport => {
        return kpiReport.keyPerformanceMetric.htmlLabel
      }),
      y: this.keyPerformanceIndicatorReport.kpiReportItems.map(kpiReportItem => {
        return kpiReportItem.performanceMetricImpact.costAdjustment
      }),
      name: 'Annual Savings',
      type: 'bar'
    };

    var data = [trace1, trace2];
    var layout = { barmode: 'stack' };

    let config = {
      modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false,
      responsive: true,
    };
    this.plotlyService.newPlot(this.performanceMetricsChart.nativeElement, data, layout, config);
  }
}
