import { Component, Input } from '@angular/core';
import { IconDefinition, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { EnergyOpportunityReport } from '../../calculations/energyOpportunityReport';

@Component({
  selector: 'app-energy-opportunity-report',
  templateUrl: './energy-opportunity-report.component.html',
  styleUrl: './energy-opportunity-report.component.css'
})
export class EnergyOpportunityReportComponent {
  @Input({ required: true })
  energyOpportunityReport: EnergyOpportunityReport;

  faFileLines: IconDefinition = faFileLines;
}
