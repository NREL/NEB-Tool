import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {


  locationAccordionOpen: boolean;
  primaryContactAccordionOpen: boolean;
  unitsAccordionOpen: boolean;
  additionalDetailsAccordionOpen: boolean;
  constructor(private localStorageService: LocalStorageService) {
    this.locationAccordionOpen = this.localStorageService.retrieve("locationAccordionOpen");
    if (this.locationAccordionOpen == undefined) {
      this.setLocationAccordionOpen(true);
    }
    this.primaryContactAccordionOpen = this.localStorageService.retrieve("primaryContactAccordionOpen");
    if (this.primaryContactAccordionOpen == undefined) {
      this.setPrimaryContactAccordionOpen(true);
    }
    this.unitsAccordionOpen = this.localStorageService.retrieve("unitsAccordionOpen");
    if (this.unitsAccordionOpen == undefined) {
      this.setUnitsAccordionOpen(true);
    }
    this.additionalDetailsAccordionOpen = this.localStorageService.retrieve("additionalDetailsAccordionOpen");
    if (this.additionalDetailsAccordionOpen == undefined) {
      this.setAdditionalDetailsAccordionOpen(true);
    }
  }

  setLocationAccordionOpen(val: boolean) {
    this.locationAccordionOpen = val;
    this.localStorageService.store('locationAccordionOpen', this.locationAccordionOpen);
  }

  setPrimaryContactAccordionOpen(val: boolean) {
    this.primaryContactAccordionOpen = val;
    this.localStorageService.store('primaryContactAccordionOpen', this.primaryContactAccordionOpen);
  }

  setUnitsAccordionOpen(val: boolean) {
    this.unitsAccordionOpen = val;
    this.localStorageService.store('unitsAccordionOpen', this.unitsAccordionOpen);
  }

  setAdditionalDetailsAccordionOpen(val: boolean) {
    this.additionalDetailsAccordionOpen = val;
    this.localStorageService.store('additionalDetailsAccordionOpen', this.additionalDetailsAccordionOpen);
  }

}
