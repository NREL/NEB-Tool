import { Component } from '@angular/core';
import { IconDefinition, fa1, fa2, fa3, fa4, fa5, fa6, faBuilding, faIndustry } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-setup-wizard-tabs',
  templateUrl: './setup-wizard-tabs.component.html',
  styleUrl: './setup-wizard-tabs.component.css'
})
export class SetupWizardTabsComponent {

  fa1: IconDefinition = fa1;
  fa2: IconDefinition = fa2;
  fa3: IconDefinition = fa3;
  fa4: IconDefinition = fa4;
  fa5: IconDefinition = fa5;
  fa6: IconDefinition = fa6;
  // faBuilding: IconDefinition = faBuilding;
  // faIndustry: IconDefinition = faIndustry;
}
