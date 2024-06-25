import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { SavingsItem } from 'src/app/models/reports';

@Component({
  selector: 'app-savings-gauges',
  templateUrl: './savings-gauges.component.html',
  styleUrl: './savings-gauges.component.css'
})
export class SavingsGaugesComponent {
  @Input({required: true})
  savingsItem: SavingsItem


  @ViewChild('gaugeChart', { static: false }) gaugeChart: ElementRef;

  constructor(private plotlyService: PlotlyService) {

  }


  ngAfterViewInit(){
    this.drawChart()
  }

  drawChart(){
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: this.savingsItem.savingsPercent,
        title: { text: this.savingsItem.label + ' Savings' },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
        }
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    this.plotlyService.newPlot(this.gaugeChart.nativeElement, data, layout, {});
  }
}
