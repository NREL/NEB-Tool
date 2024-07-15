import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanySetupService {
  companyNameFormControl = new BehaviorSubject<FormControl | null>(null);

  constructor() { }

  setControl(control: FormControl) {
    this.companyNameFormControl.next(control);
  }
}
