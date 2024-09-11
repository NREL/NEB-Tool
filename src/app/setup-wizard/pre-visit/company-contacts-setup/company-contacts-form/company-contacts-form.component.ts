import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompanyContactsFormService } from './company-contacts-form.service';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IconDefinition, faCircleExclamation, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Component({
  selector: 'app-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrl: './company-contacts-form.component.css'
})
export class CompanyContactsFormComponent {
  @Input({ required: true })
  contactGuid: string;
  @Input({ required: true })
  accordionGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();


  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;

  faCircleExclamation: IconDefinition = faCircleExclamation;
  contact: IdbContact;
  contactForm: FormGroup;
  displayDeleteModal: boolean = false;
  constructor(private contactIdbService: ContactIdbService, private companyContactsFormService: CompanyContactsFormService,
    private bootstrapService: BootstrapService,
    private localStorageDataService: LocalStorageDataService
  ) {
  }

  ngOnInit() {
    this.contact = this.contactIdbService.getContactByGuid(this.contactGuid);
    this.contactForm = this.companyContactsFormService.getFormFromIdbContact(this.contact);
  }
  ngAfterViewInit() {
    //emit after intialized. 
    //When adding new nebs this will trigger the form to open
    this.emitInitialized.emit(true);
  }

  async saveChanges() {
    this.contact = this.companyContactsFormService.updateIdbContactFromForm(this.contactForm, this.contact);
    await this.contactIdbService.asyncUpdate(this.contact);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteContact() {
    await firstValueFrom(this.contactIdbService.deleteWithObservable(this.contact.id));
    await this.contactIdbService.setContacts();
    this.closeDeleteModal();
  }

  setRequiredInvalidControlsTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control.errors && control.errors['required']) {
        control.markAsTouched();
      }
    });
  }

  toggleBS() {
    this.bootstrapService.bsCollapse('#' + this.contactGuid);
    if (this.accordionGuid != this.contactGuid) {
      this.accordionGuid = this.contactGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setContactAccordionGuid(this.accordionGuid);
  }
}
