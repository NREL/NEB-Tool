import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdbContact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactsFormService {

  constructor(private formBuilder: FormBuilder) { }

  getFormFromIdbContact(contact: IdbContact): FormGroup {
    return this.formBuilder.group({
      'name': [contact.name, [Validators.required]]
      //TODO: add form controls corresponding to form
    });
  }

  updateIdbContactFromForm(contactForm: FormGroup, contact: IdbContact): IdbContact {
    contact.name = contactForm.controls['name'].value;
    //TODO: add all the properties that will get updated by the form
    return contact;
  }
}
