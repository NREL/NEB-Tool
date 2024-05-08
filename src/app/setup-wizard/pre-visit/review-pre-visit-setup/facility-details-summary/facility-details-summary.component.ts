import { Component } from '@angular/core';
import { IconDefinition, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-facility-details-summary',
  templateUrl: './facility-details-summary.component.html',
  styleUrl: './facility-details-summary.component.css'
})
export class FacilityDetailsSummaryComponent {

  facility: IdbFacility;
  faIndustry: IconDefinition = faIndustry;
  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnInit(){
    this.facility = this.setupWizardService.facility.getValue();
  }
}
