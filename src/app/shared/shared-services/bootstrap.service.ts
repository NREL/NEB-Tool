import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {

  constructor() { }

  bsCollapse(elementId: string) {
    let element = document.getElementById(elementId);
    if (element) {
      new bootstrap.Collapse(element);
    } else {
      console.log('element not found: ' + elementId);
    }
  }

  //not working. Doing ngClass manually in component for now.
  // bsDropdown(elementId: string) {
  //   let element = document.getElementById(elementId);
  //   if (element) {
  //     new bootstrap.Dropdown(element);
  //   } else {
  //     console.log('element not found: ' + elementId);
  //   }
  // }
}
