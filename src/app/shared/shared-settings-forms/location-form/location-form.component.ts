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
import { SharedSettingsFormsService } from '../shared-settings-forms.service';

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
  zipCountrySub: Subscription;
  countries: Array<Country> = Countries;
  states: Array<State> = States;
  constructor(private formBuilder: FormBuilder, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private sharedSettingsFormService: SharedSettingsFormsService) {
  }

  ngOnInit() {
    if (this.inCompany) {
      this.companyOrFacilitySub = this.companyIdbService.selectedCompany.subscribe(_company => {
        if (!this.company || (this.company.guid != _company.guid)) {
          //initialize form on company change
          this.form = this.sharedSettingsFormService.getGeneralInformationForm(_company.generalInformation, 'location');
        }
        this.company = _company;
      });
    } else {
      this.companyOrFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
        if (!this.facility || (this.facility.guid != _facility.guid)) {
          //initialize form on facility change
          this.form = this.sharedSettingsFormService.getGeneralInformationForm(_facility.generalInformation, 'location');
        }
        this.facility = _facility;
      });
    }
    this.zipCountrySub = this.form.get('country').valueChanges.subscribe(change => {
      this.form.get('zip').updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    this.companyOrFacilitySub.unsubscribe();
    this.zipCountrySub.unsubscribe();
  }

  async saveChanges() {
    if (this.inCompany) {
      this.company.generalInformation = this.sharedSettingsFormService.updateGeneralInformationFromForm(this.form, this.company.generalInformation, 'location');
      await this.companyIdbService.asyncUpdate(this.company);
    } else {
      this.facility.generalInformation = this.sharedSettingsFormService.updateGeneralInformationFromForm(this.form, this.facility.generalInformation, 'location');
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
  }


}
