import { Component } from '@angular/core';
import { IconDefinition, faClipboardCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facility-production-details',
  templateUrl: './facility-production-details.component.html',
  styleUrl: './facility-production-details.component.css'
})
export class FacilityProductionDetailsComponent {

  faClipboardList: IconDefinition = faClipboardList;
  accordionOpen: boolean = false;


  constructor(){

  }

  toggleAccordion(){
    this.accordionOpen = !this.accordionOpen;
  }
}
