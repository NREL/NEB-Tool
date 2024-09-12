import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faDiagramProject, faPlus, faSplotch } from '@fortawesome/free-solid-svg-icons';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { getNewIdbProcessEquipment, IdbProcessEquipment } from 'src/app/models/processEquipment';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import * as _ from 'lodash';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Component({
  selector: 'app-facility-process-equipment-setup',
  templateUrl: './facility-process-equipment-setup.component.html',
  styleUrl: './facility-process-equipment-setup.component.css'
})
export class FacilityProcessEquipmentSetupComponent implements OnInit, OnDestroy {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faDiagramProject: IconDefinition = faDiagramProject;
  faPlus: IconDefinition = faPlus;
  faSplotch: IconDefinition = faSplotch;
  facility: IdbFacility;
  
  processEquipmentsSub: Subscription
  processEquipments: Array<IdbProcessEquipment>;
  processEquipmentGuids: Array<string> = [];

  accordionGuid: string;
  isAddNew: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private bootstrapService: BootstrapService,
    private localStorageDataService: LocalStorageDataService,
    private cd: ChangeDetectorRef
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

  ngAfterViewInit() {
    //open the accordion for last viewed neb
    let lastEquipmentGuid: string = this.localStorageDataService.processEquipmentAccordionGuid;
    if (lastEquipmentGuid && this.processEquipmentGuids.includes(lastEquipmentGuid)) {
      this.toggleBS(lastEquipmentGuid);
      this.cd.detectChanges();
    }
  }

  async addEquipment() {
    this.isAddNew = true;
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

  toggleBS(nebGuid: string) {
    this.bootstrapService.bsCollapse('#' + nebGuid);
    if (this.accordionGuid != nebGuid) {
      this.accordionGuid = nebGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setProcessEquipmentAccordionGuid(this.accordionGuid);
  }

  childFormInitialized(equipmentGuid: string, isLast: boolean) {
    if (this.isAddNew == true && isLast) {
      this.toggleBS(equipmentGuid);
      this.isAddNew = false;
      this.cd.detectChanges();
    }
  }
  
}
