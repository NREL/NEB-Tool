import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyPerformanceMetric } from '../constants/keyPerformanceMetrics';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';

@Component({
  selector: 'app-kpm-details-form',
  templateUrl: './kpm-details-form.component.html',
  styleUrl: './kpm-details-form.component.css'
})
export class KpmDetailsFormComponent {
  @Input({ required: true })
  keyPerformanceMetric: KeyPerformanceMetric;
  @Input()
  disableForm: boolean;
  @Output('emitSave')
  emitSave: EventEmitter<boolean> = new EventEmitter();
  @Output('emitCalculate')
  emitCalculate: EventEmitter<boolean> = new EventEmitter();

  
  saveChanges() {
    this.emitSave.emit(true);
  }

  calculateCost() {
    if (this.keyPerformanceMetric.calculationMethod == 'costPerUnit') {
      this.keyPerformanceMetric.baselineCost = (this.keyPerformanceMetric.costPerValue * this.keyPerformanceMetric.baselineValue);
    }

    console.log(this.keyPerformanceMetric.baselineCost);
    this.emitCalculate.emit(true);
  }
}
