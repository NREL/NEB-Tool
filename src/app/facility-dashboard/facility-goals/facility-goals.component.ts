import { Component } from '@angular/core';
import { IconDefinition, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facility-goals',
  templateUrl: './facility-goals.component.html',
  styleUrl: './facility-goals.component.css'
})
export class FacilityGoalsComponent {

  faBullseye: IconDefinition = faBullseye;
  accordionOpen: boolean = false;


  constructor(){

  }

  toggleAccordion(){
    this.accordionOpen = !this.accordionOpen;
  }
}
