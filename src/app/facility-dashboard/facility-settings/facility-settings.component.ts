import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faIndustry, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-settings',
  templateUrl: './facility-settings.component.html',
  styleUrl: './facility-settings.component.css'
})
export class FacilitySettingsComponent {

  faTrash: IconDefinition = faTrash;
  faIndustry: IconDefinition = faIndustry;

  facility: IdbFacility;
  facilitySub: Subscription;
  displayDeleteModal: boolean = false;
  isFormChange: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService,
    private dbChangesService: DbChangesService, private router: Router) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      if (!this.isFormChange) {
        this.facility = _facility;
      } else {
        this.facility = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
  }

  async saveChanges() {
    this.isFormChange = true;
    await this.facilityIdbService.asyncUpdate(this.facility);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async confirmDelete() {
    await this.dbChangesService.deleteFacility(this.facility);
    this.router.navigateByUrl('/user')
  }
}
