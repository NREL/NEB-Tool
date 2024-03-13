import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconDefinition, faContactCard } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { LocalStorageDataService } from '../../shared-services/local-storage-data.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-primary-contact-form',
  templateUrl: './primary-contact-form.component.html',
  styleUrls: ['./primary-contact-form.component.css']
})
export class PrimaryContactFormComponent {
  @Input()
  inCompany: boolean;
  @Input()
  inSetupWizard: boolean;

  faContactCard: IconDefinition = faContactCard;
  form: FormGroup;

  facility: IdbFacility;
  company: IdbCompany;
  companyOrFacilitySub: Subscription;
  accordionOpen: boolean;
  constructor(private formBuilder: FormBuilder, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private localStorageDataService: LocalStorageDataService,
    private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.accordionOpen = this.localStorageDataService.primaryContactAccordionOpen;
    if (this.inSetupWizard) {
      if (this.inCompany) {
        this.companyOrFacilitySub = this.setupWizardService.company.subscribe(_company => {
          if (!this.company || (this.company.guid != _company.guid)) {
            //initialize form on company change
            this.form = this.getGeneralInformationForm(_company.generalInformation);
          }
          this.company = _company;
        });
      } else {
        this.companyOrFacilitySub = this.setupWizardService.facility.subscribe(_facility => {
          if (!this.facility || (this.facility.guid != _facility.guid)) {
            //initialize form on facility change
            this.form = this.getGeneralInformationForm(_facility.generalInformation);
          }
          this.facility = _facility;
        });
      }
    } else {
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
  }

  ngOnDestroy() {
    this.companyOrFacilitySub.unsubscribe();
  }

  getGeneralInformationForm(generalInformation: GeneralInformation): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      contactName: [generalInformation.contactName],
      contactPhone: [generalInformation.contactPhone],
      contactEmail: [generalInformation.contactEmail],
      contactRole: [generalInformation.contactRole],
    });
    return form;
  }
  async saveChanges() {
    if(this.inSetupWizard){
      if (this.inCompany) {
        this.company.generalInformation = this.updateGeneralInformationFromForm(this.company.generalInformation);
        this.setupWizardService.company.next(this.company);
      } else {
        this.facility.generalInformation = this.updateGeneralInformationFromForm(this.facility.generalInformation);
        this.setupWizardService.facility.next(this.facility);
      }
    }else{
      if (this.inCompany) {
        this.company.generalInformation = this.updateGeneralInformationFromForm(this.company.generalInformation);
        await this.companyIdbService.asyncUpdate(this.company);
      } else {
        this.facility.generalInformation = this.updateGeneralInformationFromForm(this.facility.generalInformation);
        await this.facilityIdbService.asyncUpdate(this.facility);
      }
    }
  }

  updateGeneralInformationFromForm(generalInformation: GeneralInformation): GeneralInformation {
    generalInformation.contactName = this.form.controls['contactName'].value;
    generalInformation.contactPhone = this.form.controls['contactPhone'].value;
    generalInformation.contactEmail = this.form.controls['contactEmail'].value;
    generalInformation.contactRole = this.form.controls['contactRole'].value;
    return generalInformation;
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
    this.localStorageDataService.setPrimaryContactAccordionOpen(this.accordionOpen);
  }
}