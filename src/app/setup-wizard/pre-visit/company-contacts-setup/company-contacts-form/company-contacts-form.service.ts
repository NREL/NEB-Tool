import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { IdbContact } from 'src/app/models/contact';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactsFormService {

  constructor(private formBuilder: FormBuilder) { }

  getFormFromIdbContact(contact: IdbContact): FormGroup {
    // Process name before saving
    let firstname = '', lastname = '';
    if (contact.name) {
      let names = contact.name.split(',');
      // console.log(contact.name);
      if (names.length == 1) {
        firstname = names[0].trim();
      } else {
        firstname = names[0].trim();
        lastname = names[1].trim();
      }
    }
    // Process phone number before saving
    let phone = '';
    let ext = '';
    if (contact.phone) {
      if (isValidPhoneNumber(contact.phone)) {
        const phoneWithExt = parsePhoneNumber(contact.phone, 'US');
        phone = phoneWithExt.number;
        ext = phoneWithExt.ext;
      } else {
        phone = contact.phone.trim();
      }
    }
    return this.formBuilder.group({
      'firstname': [firstname, [Validators.required]],
      'lastname' : [lastname, [Validators.required]],
      //TODO: add form controls corresponding to form
      // 'phone': [contact.phone, [Validators.pattern(/^(\+\d{1,3}\s+)?[\d\s\(\)\-]*$/), this.phoneNumberValidator()]],
      'phone': [phone, []],
      'ext': [ext, []],
      // 'email': [contact.email, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(255)]],
      'email': [contact.email, [Validators.email, Validators.maxLength(255)]],
      'role': [contact.role, []],
      'team': [contact.team, []],
      'focusArea': [contact.focusArea, []],
      'notes': [contact.notes, []]
    }, {validator: this.phoneNumberValidator()});
  }

  updateIdbContactFromForm(contactForm: FormGroup, contact: IdbContact): IdbContact {
    contact.name = contactForm.controls['firstname'].value + ', ' + contactForm.controls['lastname'].value;
    //TODO: add all the properties that will get updated by the form
    let phone = contactForm.controls['phone'].value;
    let ext = contactForm.controls['ext'].value;
    const phoneWithExt = phone + (ext? ' ext. ' + ext : '');
    // console.log('phone:', phone, 'ext:', ext, 'phext:', phoneWithExt);
    // if (isValidPhoneNumber(phoneWithExt, 'US')) {
    //   contact.phone = parsePhoneNumber(phoneWithExt, 'US').formatInternational();
    //   console.log('good:' + contact.phone);
    // } else {
    //   contact.phone = phone + ext;
    //   console.log('bad:' + contact.phone);
    // }
    contact.phone = isValidPhoneNumber(phoneWithExt, 'US')? parsePhoneNumber(phoneWithExt, 'US').formatInternational() : phone + ext;
    contact.email = contactForm.controls['email'].value;
    contact.role = contactForm.controls['role'].value;
    contact.team = contactForm.controls['team'].value;
    contact.focusArea = contactForm.controls['focusArea'].value;
    contact.notes = contactForm.controls['notes'].value;
    return contact;
  }

  // Parse phone number
  // Not used/changed to libphonenumber-js
  phoneNumberParser(phoneInput: string): string {
    const value = (phoneInput || '').trim();
    if (!value) return '';
    if (!(/^(\+\d{1,3}\s+)?[\d\s\(\)\-]*$/.test(phoneInput))) return '';
    const isInternational: boolean = value.startsWith('+'); // Check if international number
    const digits = value.replace(/\D/g, ''); // Remove all non-digit characters

    if (isInternational) {
      // All digits should be [10, 18]
      if (digits.length < 9 || digits.length > 18) {
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
      const phone = control.get('phone').value;
      const ext = control.get('ext').value;
      if (!phone && !ext) {
        control.get('phone').setErrors(null);
        return null;
      };
      const phoneWithExt = phone + (ext? ' ext. ' + ext : '');
      const isValidPhone = isValidPhoneNumber(phoneWithExt, 'US');
      if (!isValidPhone) {
        // console.log(phone, !phone, phone?.length, phone===null, typeof(phone));
        // console.log(phoneWithExt, 'phone', phone, 'ext', ext);
        control.get('phone').setErrors({invalidPhoneNumber: true });
      } else {
        control.get('phone').setErrors(null);
      }
      return null;
    };
  }
}
