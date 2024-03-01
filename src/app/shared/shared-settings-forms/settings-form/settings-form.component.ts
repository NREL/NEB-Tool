import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdbCompany } from 'src/app/models/company';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { UnitSettings } from 'src/app/models/unitSettings';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.css']
})
export class SettingsFormComponent {
  @Input()
  inCompany: boolean;

  form: FormGroup;
  facility: IdbFacility;
  company: IdbCompany;
  companyOrFacilitySub: Subscription;
  constructor(private formBuilder: FormBuilder, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService) {
  }

  ngOnInit() {
    if (this.inCompany) {
      this.companyOrFacilitySub = this.companyIdbService.selectedCompany.subscribe(_company => {
        if (!this.company || (this.company.guid != _company.guid)) {
          //initialize form on company change
          this.form = this.getGeneralInformationForm(_company.generalInformation, _company.unitSettings);
        }
        this.company = _company;
      });
    } else {
      this.companyOrFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
        if (!this.facility || (this.facility.guid != _facility.guid)) {
          //initialize form on facility change
          this.form = this.getGeneralInformationForm(_facility.generalInformation, _facility.unitSettings);
        }
        this.facility = _facility;
      });
    }
  }

  ngOnDestroy() {
    this.companyOrFacilitySub.unsubscribe();
  }

  getGeneralInformationForm(generalInformation: GeneralInformation, unitSettings: UnitSettings): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      name: [generalInformation.name, [Validators.required]]
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
    return generalInformation;
  }


}
