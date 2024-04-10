import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-manage-facility',
  templateUrl: './manage-facility.component.html',
  styleUrl: './manage-facility.component.css'
})
export class ManageFacilityComponent {

  faPenToSquare: IconDefinition = faPenToSquare;
  faTrash: IconDefinition = faTrash;

  accordionOpen: boolean = false;
  facility: IdbFacility;
  facilitySub: Subscription;
  displayDeleteModal: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService,
    private dbChangesService: DbChangesService, private router: Router) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
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
