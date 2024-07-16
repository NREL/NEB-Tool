import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faDiagramProject, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { getNewIdbProcessEquipment, IdbProcessEquipment } from 'src/app/models/processEquipment';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-facility-process-equipment-setup',
  templateUrl: './facility-process-equipment-setup.component.html',
  styleUrl: './facility-process-equipment-setup.component.css'
})
export class FacilityProcessEquipmentSetupComponent implements OnInit, OnDestroy {

  accordionIndex: number = 0;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faDiagramProject: IconDefinition = faDiagramProject;
  faPlus: IconDefinition = faPlus;
  facility: IdbFacility;
  
  processEquipmentsSub: Subscription
  processEquipments: Array<IdbProcessEquipment>;
  processEquipmentGuids: Array<string> = [];
  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService
  ) {

  }

  ngOnInit() {
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    if (!this.facility) {
      this.router.navigateByUrl('/welcome')
    }

    this.processEquipmentsSub = this.processEquipmentIdbService.processEquipments.subscribe(_processEquipments => {
      this.processEquipments = _processEquipments;
      this.setProcessEquipmentGuids();
    });
  }

  ngOnDestroy() {
    this.processEquipmentsSub.unsubscribe();
  }

  async addEquipment() {
    let newProcessEquipment: IdbProcessEquipment = getNewIdbProcessEquipment(this.facility.userId, this.facility.companyId, this.facility.guid);
    await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newProcessEquipment));
    await this.processEquipmentIdbService.setProcessEquipments();
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/energy-equipment');
  }

  goToNext() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/pre-assessment');
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  setProcessEquipmentGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.facility && this.processEquipments) {
      let facilityProcessEquipments: Array<IdbProcessEquipment> = this.processEquipments.filter(processEquipment => {
        return processEquipment.facilityId == this.facility.guid
      });
      let tmpEquipmentGuids: Array<string> = facilityProcessEquipments.map(neb => {
        return neb.guid
      });
      if (tmpEquipmentGuids.length != this.processEquipmentGuids.length) {
        this.processEquipmentGuids = tmpEquipmentGuids;
      } else {
        let xor: Array<string> = _.xor(this.processEquipmentGuids, tmpEquipmentGuids)
        if (xor.length != 0) {
          this.processEquipmentGuids = tmpEquipmentGuids;
        }
      }
    } else {
      this.processEquipmentGuids = [];
    }

  }
}
