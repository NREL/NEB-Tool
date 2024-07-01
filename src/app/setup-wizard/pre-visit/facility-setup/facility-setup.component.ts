import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faChevronLeft, faChevronRight, faContactCard, faFilePen, faGear, faIndustry, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

@Component({
  selector: 'app-facility-setup',
  templateUrl: './facility-setup.component.html',
  styleUrl: './facility-setup.component.css'
})
export class FacilitySetupComponent {

  facilityName: string;


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
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    if (this.facility) {
      this.facilityName = this.facility.generalInformation.name;
    } else {
      this.router.navigateByUrl('/welcome');
    }
  }

  async saveChanges() {
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    this.facility.generalInformation.name = this.facilityName;
    await this.facilityIdbService.asyncUpdate(this.facility);
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
