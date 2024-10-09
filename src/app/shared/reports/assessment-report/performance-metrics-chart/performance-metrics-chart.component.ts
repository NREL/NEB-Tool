import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
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

    let kpiReportItems: Array<KeyPerformanceIndicatorReportItem> = this.keyPerformanceIndicatorReport.kpiReportItems;
    kpiReportItems = _.orderBy(kpiReportItems, (reportItem: KeyPerformanceIndicatorReportItem) => {
      return reportItem.keyPerformanceMetric.baselineCost;
    }, 'desc')

    var trace1 = {
      x: kpiReportItems.map(kpiReport => {
        return kpiReport.keyPerformanceMetric.htmlLabel
      }),
      y: kpiReportItems.map(kpiReportItem => {
        return kpiReportItem.keyPerformanceMetric.baselineCost - kpiReportItem.performanceMetricImpact.costAdjustment
      }),
      name: 'Modified Cost',
      type: 'bar'
    };

    var trace2 = {
      x: kpiReportItems.map(kpiReport => {
        return kpiReport.keyPerformanceMetric.htmlLabel
      }),
      y: kpiReportItems.map(kpiReportItem => {
        return kpiReportItem.performanceMetricImpact.costAdjustment
      }),
      name: 'Annual Savings',
      type: 'bar',
    };

    var data = [trace1, trace2];
    var layout = {
      barmode: 'stack',
      yaxis: {
        tickprefix: '$'
      }
    };

    let config = {
      modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false,
      responsive: true,
    };
    this.plotlyService.newPlot(this.performanceMetricsChart.nativeElement, data, layout, config);
  }
}