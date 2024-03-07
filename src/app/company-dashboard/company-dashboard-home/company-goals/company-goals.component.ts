import { Component } from '@angular/core';
import { IconDefinition, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-company-goals',
  templateUrl: './company-goals.component.html',
  styleUrl: './company-goals.component.css'
})
export class CompanyGoalsComponent {

  faBullseye: IconDefinition = faBullseye;
  accordionOpen: boolean = false;


  constructor(){

  }

  toggleAccordion(){
    this.accordionOpen = !this.accordionOpen;
  }
}
