import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompanyContactsFormService } from './company-contacts-form.service';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IconDefinition, faCircleExclamation, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrl: './company-contacts-form.component.css'
})
export class CompanyContactsFormComponent {
  @Input({ required: true })
  contactGuid: string;
  @Input({required: true})
  accordionIndex: number;
  @Input({required: true})
  contactIndex: number;


  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;

  faCircleExclamation: IconDefinition = faCircleExclamation;
  contact: IdbContact;
  contactForm: FormGroup;
  displayDeleteModal: boolean = false;
  constructor(private contactIdbService: ContactIdbService, private companyContactsFormService: CompanyContactsFormService) {
  }

  ngOnInit() {
    this.contact = this.contactIdbService.getContactByGuid(this.contactGuid);
    this.contactForm = this.companyContactsFormService.getFormFromIdbContact(this.contact);
  }

  async saveChanges() {
    this.contact = this.companyContactsFormService.updateIdbContactFromForm(this.contactForm, this.contact);
    await this.contactIdbService.asyncUpdate(this.contact);
  }
  
  setAccordionIndex(num: number){
    this.accordionIndex = num;
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteContact() {
    this.setAccordionIndex(0);
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
}
