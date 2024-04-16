import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdbCompany } from 'src/app/models/company';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { UnitSettings } from 'src/app/models/unitSettings';
import { IconDefinition, faBuilding, faContactCard, faFilePen, faGear, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageDataService } from '../../shared-services/local-storage-data.service';

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


  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faBuilding: IconDefinition = faBuilding;

  additionalDetailsAccordionOpen: boolean = false;
  unitsAccordionOpen: boolean = false;
  primaryContactAccordionOpen: boolean = false;
  locationAccordionOpen: boolean = false;
  nameLabel: 'Company' | 'Facility';
  constructor(private formBuilder: FormBuilder, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private localStorageDataService: LocalStorageDataService) {
  }

  ngOnInit() {
    this.additionalDetailsAccordionOpen = this.localStorageDataService.additionalDetailsAccordionOpen;
    this.locationAccordionOpen = this.localStorageDataService.locationAccordionOpen;
    this.primaryContactAccordionOpen = this.localStorageDataService.primaryContactAccordionOpen;
    this.unitsAccordionOpen = this.localStorageDataService.unitsAccordionOpen;
    if (this.inCompany) {
      this.nameLabel = 'Company';
      this.companyOrFacilitySub = this.companyIdbService.selectedCompany.subscribe(_company => {
        if (!this.company || (this.company.guid != _company.guid)) {
          //initialize form on company change
          this.form = this.getGeneralInformationForm(_company.generalInformation, _company.unitSettings);
        }
        this.company = _company;
      });
    } else {
      this.nameLabel = 'Facility';
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

  toggleLocation() {
    this.locationAccordionOpen = !this.locationAccordionOpen;
    this.localStorageDataService.setLocationAccordionOpen(this.locationAccordionOpen);

  }

  toggleContact() {
    this.primaryContactAccordionOpen = !this.primaryContactAccordionOpen;
    this.localStorageDataService.setPrimaryContactAccordionOpen(this.primaryContactAccordionOpen);
  }

  toggleUnits() {
    this.unitsAccordionOpen = !this.unitsAccordionOpen;
    this.localStorageDataService.setUnitsAccordionOpen(this.unitsAccordionOpen);
  }

  toggleAdditionalInformation() {
    this.additionalDetailsAccordionOpen = !this.additionalDetailsAccordionOpen;
    this.localStorageDataService.setAdditionalDetailsAccordionOpen(this.additionalDetailsAccordionOpen);
  }

}
