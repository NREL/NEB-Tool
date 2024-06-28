import { Component, Input } from '@angular/core';
import { IconDefinition, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { NebReport } from '../../calculations/nebReport';

@Component({
  selector: 'app-non-energy-benefit-report',
  templateUrl: './non-energy-benefit-report.component.html',
  styleUrl: './non-energy-benefit-report.component.css'
})
export class NonEnergyBenefitReportComponent {
  @Input({ required: true })
  nebReport: NebReport;

  faWeightHanging: IconDefinition = faWeightHanging;

}
