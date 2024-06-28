import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faChevronLeft, faChevronRight, faContactCard, faFilePen, faGear, faIndustry, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-facility-setup',
  templateUrl: './facility-setup.component.html',
  styleUrl: './facility-setup.component.css'
})
export class FacilitySetupComponent {

  name: FormControl;

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faIndustry: IconDefinition = faIndustry;

  facility: IdbFacility;
  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    this.name = new FormControl(facility.generalInformation.name, [Validators.required]);
  }

  async saveChanges() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    facility.generalInformation.name = this.name.value;
    await this.facilityIdbService.asyncUpdate(facility);
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-select');
  }

  goToProcessEquipment() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/process-equipment');
  }
}
