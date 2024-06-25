import { Component, Input } from '@angular/core';
import { IconDefinition, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { NebReport } from 'src/app/models/reports';

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
