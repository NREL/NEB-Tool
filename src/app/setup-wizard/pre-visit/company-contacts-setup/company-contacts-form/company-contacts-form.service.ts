import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IdbContact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactsFormService {

  constructor(private formBuilder: FormBuilder) { }

  getFormFromIdbContact(contact: IdbContact): FormGroup {
    return this.formBuilder.group({
      'name': [contact.name, [Validators.required]],
      //TODO: add form controls corresponding to form
      // 'phone': [contact.phone, [Validators.pattern(/^(\+\d{1,3}\s+)?[\d\s\(\)\-]*$/), this.phoneNumberValidator()]],
      'phone': [contact.phone, [this.phoneNumberValidator()]],
      // 'email': [contact.email, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(255)]],
      'email': [contact.email, [Validators.email, Validators.maxLength(255)]],
      'role': [contact.role, []],
      'team': [contact.team, []],
      'focusArea': [contact.focusArea, []],
      'notes': [contact.notes, []]
    });
  }

  updateIdbContactFromForm(contactForm: FormGroup, contact: IdbContact): IdbContact {
    contact.name = contactForm.controls['name'].value;
    //TODO: add all the properties that will get updated by the form
    const phone = this.phoneNumberParser(contactForm.controls['phone'].value);
    // console.log('phone:', phone, contactForm.controls['phone'].value);
    contact.phone = phone || contactForm.controls['phone'].value;
    contact.email = contactForm.controls['email'].value;
    contact.role = contactForm.controls['role'].value;
    contact.team = contactForm.controls['team'].value;
    contact.focusArea = contactForm.controls['focusArea'].value;
    contact.notes = contactForm.controls['notes'].value;
    return contact;
  }

  // Parse phone number
  phoneNumberParser(phoneInput: string): string {
    const value = (phoneInput || '').trim();
    if (!value) return '';
    if (!(/^(\+\d{1,3}\s+)?[\d\s\(\)\-]*$/.test(phoneInput))) return '';
    const isInternational: boolean = value.startsWith('+'); // Check if international number
    const digits = value.replace(/\D/g, ''); // Remove all non-digit characters

    if (isInternational) {
      // All digits should be [10, 18]
      if (digits.length < 10 || digits.length > 18) {
        return '';
      }
      // Match the country code
      const pattern: RegExp = /^\+(\d{1,3})\s*[\d()-]+/;
      const match = value.match(pattern);
      if (!match) return '';
      const countryCode = match[1];
      return '+' + countryCode + ' ' + digits.substring(countryCode.length - 1);
    } else {
      // Without country code, digits must be 10
      if (digits.length !== 10) {
        return '';
      }
      return "+1" + ' ' + digits;
    }
  }

  // Custom validator for phone number
  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control.value || '').trim();
      if (!value) return null;
      const phone = this.phoneNumberParser(control.value);
      if (phone) {
        return null;
      } else {
        return {invalidPhoneNumber: true };
      }
    };
  }
}
