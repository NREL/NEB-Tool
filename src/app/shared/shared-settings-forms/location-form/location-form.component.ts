import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { State, States } from '../form-data-options/states';
import { Countries, Country } from '../form-data-options/countries';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent {
  @Input()
  inCompany: boolean;

  faLocationDot: IconDefinition = faLocationDot;
  form: FormGroup;

  facility: IdbFacility;
  company: IdbCompany;
  companyOrFacilitySub: Subscription;
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
      country: [generalInformation.country],
      city: [generalInformation.city],
      state: [generalInformation.state],
      zip: [generalInformation.zip],
      address: [generalInformation.address],
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
    generalInformation.country = this.form.controls['country'].value;
    generalInformation.city = this.form.controls['city'].value;
    generalInformation.state = this.form.controls['state'].value;
    generalInformation.zip = this.form.controls['zip'].value;
    generalInformation.address = this.form.controls['address'].value;
    return generalInformation;
  }

}
