import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdbCompany } from 'src/app/models/company';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { FirstNaicsList, NAICS, SecondNaicsList, ThirdNaicsList } from '../form-data-options/naics-data';
import { Countries, Country } from '../form-data-options/countries';
import { State, States } from '../form-data-options/states';

@Component({
  selector: 'app-general-information-form',
  templateUrl: './general-information-form.component.html',
  styleUrls: ['./general-information-form.component.css']
})
export class GeneralInformationFormComponent {
  @Input()
  inCompany: boolean;

  form: FormGroup;

  facility: IdbFacility;
  company: IdbCompany;
  companyOrFacilitySub: Subscription;
  firstNaicsList: Array<NAICS> = FirstNaicsList;
  secondNaicsList: Array<NAICS> = SecondNaicsList;
  thirdNaicsList: Array<NAICS> = ThirdNaicsList;
  countries: Array<Country> = Countries;
  states: Array<State> = States;
  constructor(private formBuilder: FormBuilder, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService) {
  }

  ngOnInit() {
    if (this.inCompany) {
      this.companyOrFacilitySub = this.companyIdbService.selectedCompany.subscribe(_company => {
        if (!this.company || (this.company.guid != _company.guid)) {
          //initialize form on company change
          this.form = this.getGeneralInformationForm(_company.generalInformation);
        }
        this.company = _company;
      });
    } else {
      this.companyOrFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
        if (!this.facility || (this.facility.guid != _facility.guid)) {
          //initialize form on facility change
          this.form = this.getGeneralInformationForm(_facility.generalInformation);
        }
        this.facility = _facility;
      });
    }
  }

  ngOnDestroy() {
    this.companyOrFacilitySub.unsubscribe();
  }

  getGeneralInformationForm(generalInformation: GeneralInformation): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      name: [generalInformation.name, [Validators.required]],
      country: [generalInformation.country],
      city: [generalInformation.city],
      state: [generalInformation.state],
      zip: [generalInformation.zip],
      address: [generalInformation.address],
      naics1: [generalInformation.naics1],
      naics2: [generalInformation.naics2],
      naics3: [generalInformation.naics3],
      contactName: [generalInformation.contactName],
      contactPhone: [generalInformation.contactPhone],
      contactEmail: [generalInformation.contactEmail],
      contactRole: [generalInformation.contactRole]
    });
    return form;
  }
  async saveChanges() {
    if (this.inCompany) {
      this.company.generalInformation = this.updateGeneralInformationFromForm(this.company.generalInformation);
      await this.companyIdbService.asyncUpdate(this.company);
    } else {
      this.facility.generalInformation = this.updateGeneralInformationFromForm(this.facility.generalInformation);
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
  }

  updateGeneralInformationFromForm(generalInformation: GeneralInformation): GeneralInformation {
    generalInformation.name = this.form.controls['name'].value;
    generalInformation.country = this.form.controls['country'].value;
    generalInformation.city = this.form.controls['city'].value;
    generalInformation.state = this.form.controls['state'].value;
    generalInformation.zip = this.form.controls['zip'].value;
    generalInformation.address = this.form.controls['address'].value;
    generalInformation.naics1 = this.form.controls['naics1'].value;
    generalInformation.naics2 = this.form.controls['naics2'].value;
    generalInformation.naics3 = this.form.controls['naics3'].value;
    generalInformation.contactName = this.form.controls['contactName'].value;
    generalInformation.contactPhone = this.form.controls['contactPhone'].value;
    generalInformation.contactEmail = this.form.controls['contactEmail'].value;
    generalInformation.contactRole = this.form.controls['contactRole'].value;
    return generalInformation;
  }

  checkNAICS() {
    //make sure sublist selections are a part of selected parent
    if (this.form.controls['naics1'].value && this.form.controls['naics2'].value) {
      let naicsItem: NAICS = this.secondNaicsList.find(item => { return item.code == this.form.controls['naics2'].value });
      if (naicsItem && naicsItem.matchNum != this.form.controls['naics1'].value) {
        this.form.controls['naics2'].patchValue(null);
        this.form.controls['naics2'].updateValueAndValidity();
      }
    }

    if (this.form.controls['naics2'].value && this.form.controls['naics3'].value) {
      let naicsItem: NAICS = this.thirdNaicsList.find(item => { return item.code == this.form.controls['naics3'].value });
      if (naicsItem && naicsItem.matchNum != this.form.controls['naics2'].value) {
        this.form.controls['naics3'].patchValue(null);
        this.form.controls['naics3'].updateValueAndValidity();
      }
    }
    this.saveChanges();
  }
}
