import { Component, Input } from '@angular/core';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { FirstNaicsList, NAICS, SecondNaicsList, ThirdNaicsList } from '../form-data-options/naics-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-naics-form',
  templateUrl: './naics-form.component.html',
  styleUrls: ['./naics-form.component.css']
})
export class NaicsFormComponent {
  @Input()
  inCompany: boolean;

  form: FormGroup;

  facility: IdbFacility;
  company: IdbCompany;
  companyOrFacilitySub: Subscription;
  firstNaicsList: Array<NAICS> = FirstNaicsList;
  secondNaicsList: Array<NAICS> = SecondNaicsList;
  thirdNaicsList: Array<NAICS> = ThirdNaicsList;
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
      address: [generalInformation.address],
      naics1: [generalInformation.naics1],
      naics2: [generalInformation.naics2],
      naics3: [generalInformation.naics3]
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
    generalInformation.naics1 = this.form.controls['naics1'].value;
    generalInformation.naics2 = this.form.controls['naics2'].value;
    generalInformation.naics3 = this.form.controls['naics3'].value;
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
