import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faBullseye, faChartLine, faFolderOpen, faGears, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-dashboard-tabs',
  templateUrl: './facility-dashboard-tabs.component.html',
  styleUrl: './facility-dashboard-tabs.component.css'
})
export class FacilityDashboardTabsComponent {


  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faGears: IconDefinition = faGears;
  faFolderOpen: IconDefinition = faFolderOpen;
  faChartLine: IconDefinition = faChartLine
  faBullseye: IconDefinition = faBullseye;

  facility: IdbFacility;
  facilitySub: Subscription;

  constructor(private facilityIdbService: FacilityIdbService){
  }

  ngOnInit(){
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
  }

  ngOnDestroy(){
    this.facilitySub.unsubscribe();
  }
}
