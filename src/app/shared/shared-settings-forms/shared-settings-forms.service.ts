import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { GeneralInformation } from 'src/app/models/generalInformation';
import { UnitSettings } from 'src/app/models/unitSettings';
import valZip from 'val-zip';

@Injectable({
  providedIn: 'root'
})
export class SharedSettingsFormsService {
  /**
   * Generate reactive forms with validators
   * Extract form info for updating Idb
   * 1. Location Form (General Information)
   * 2. Units form (Utilities)
   */

  constructor(private formBuilder: FormBuilder) { }

  getGeneralInformationForm(generalInformation: GeneralInformation, formType: string): FormGroup {
    let form: FormGroup;
    switch (formType) {
      case 'location':
        form = this.formBuilder.group({
          country: [generalInformation.country],
          city: [generalInformation.city],
          state: [generalInformation.state],
          zip: [generalInformation.zip, [this.zipCodeValidator()]],
          address: [generalInformation.address],
        });
        break;
      case 'additional-details':
        form = this.formBuilder.group({
          naics1: [generalInformation.naics1],
          naics2: [generalInformation.naics2],
          naics3: [generalInformation.naics3],
          notes: [generalInformation.notes]
        });
        break;
      default:
        console.log('not valid form type: "location" or "additional-details".');
    }
    return form;
  }

  updateGeneralInformationFromForm(form: FormGroup, generalInformation: GeneralInformation, formType: string): GeneralInformation {
    switch (formType) {
      case 'location':
        generalInformation.country = form.controls['country'].value;
        generalInformation.city = form.controls['city'].value;
        generalInformation.state = form.controls['state'].value;
        generalInformation.zip = form.controls['zip'].value;
        generalInformation.address = form.controls['address'].value;
        break;
      case 'additional-details':
        generalInformation.naics1 = form.controls['naics1'].value;
        generalInformation.naics2 = form.controls['naics2'].value;
        generalInformation.naics3 = form.controls['naics3'].value;
        generalInformation.notes = form.controls['notes'].value;
        break;
      default:
        console.log('not valid form type: "location" or "additional-details".');
    }
    return generalInformation;
  }

  getUnitsForm(unitSettings: UnitSettings): FormGroup {
    let form: FormGroup = this.formBuilder.group({
      includeElectricity: [unitSettings.includeElectricity],
      electricityUnit: [unitSettings.electricityUnit],
      electricityPrice: [unitSettings.electricityPrice, [Validators.min(0)]],

      includeNaturalGas: [unitSettings.includeNaturalGas],
      naturalGasUnit: [unitSettings.naturalGasUnit],
      naturalGasPrice: [unitSettings.naturalGasPrice, [Validators.min(0)]],

      includeSteam: [unitSettings.includeSteam],
      steamUnit: [unitSettings.steamUnit],
      steamPrice: [unitSettings.steamPrice, [Validators.min(0)]],

      includeOtherFuel: [unitSettings.includeOtherFuel],
      otherFuelUnit: [unitSettings.otherFuelUnit],
      otherFuelPrice: [unitSettings.otherFuelPrice, [Validators.min(0)]],

      includeCompressedAir: [unitSettings.includeCompressedAir],
      compressedAirUnit: [unitSettings.compressedAirUnit],
      compressedAirPrice: [unitSettings.compressedAirPrice, [Validators.min(0)]],

      includeWater: [unitSettings.includeWater],
      waterUnit: [unitSettings.waterUnit],
      waterPrice: [unitSettings.waterPrice, [Validators.min(0)]],

      includeWasteWater: [unitSettings.includeWasteWater],
      wasteWaterUnit: [unitSettings.wasteWaterUnit],
      wasteWaterPrice: [unitSettings.wasteWaterPrice, [Validators.min(0)]],
    });

    // Update required validators for included items
    this.setRequiredValidator(form.controls['electricityPrice'], unitSettings.includeElectricity);
    this.setRequiredValidator(form.controls['naturalGasPrice'], unitSettings.includeNaturalGas);
    this.setRequiredValidator(form.controls['steamPrice'], unitSettings.includeSteam);
    this.setRequiredValidator(form.controls['otherFuelPrice'], unitSettings.includeOtherFuel);
    this.setRequiredValidator(form.controls['compressedAirPrice'], unitSettings.includeCompressedAir);
    this.setRequiredValidator(form.controls['waterPrice'], unitSettings.includeWater);
    this.setRequiredValidator(form.controls['wasteWaterPrice'], unitSettings.includeWasteWater);

    return form;
  }

  updateUnitSettingsFromForm(form: FormGroup,unitSettings: UnitSettings): UnitSettings {
    unitSettings.includeElectricity = form.controls['includeElectricity'].value;
    this.setRequiredValidator(form.controls['electricityPrice'], unitSettings.includeElectricity);
    unitSettings.electricityUnit = form.controls['electricityUnit'].value;
    unitSettings.electricityPrice = form.controls['electricityPrice'].value;

    unitSettings.includeNaturalGas = form.controls['includeNaturalGas'].value;
    this.setRequiredValidator(form.controls['naturalGasPrice'], unitSettings.includeNaturalGas);
    unitSettings.naturalGasUnit = form.controls['naturalGasUnit'].value;
    unitSettings.naturalGasPrice = form.controls['naturalGasPrice'].value;

    unitSettings.includeSteam = form.controls['includeSteam'].value;
    this.setRequiredValidator(form.controls['steamPrice'], unitSettings.includeSteam);
    unitSettings.steamUnit = form.controls['steamUnit'].value;
    unitSettings.steamPrice = form.controls['steamPrice'].value;

    unitSettings.includeOtherFuel = form.controls['includeOtherFuel'].value;
    this.setRequiredValidator(form.controls['otherFuelPrice'], unitSettings.includeOtherFuel);
    unitSettings.otherFuelUnit = form.controls['otherFuelUnit'].value;
    unitSettings.otherFuelPrice = form.controls['otherFuelPrice'].value;

    unitSettings.includeCompressedAir = form.controls['includeCompressedAir'].value;
    this.setRequiredValidator(form.controls['compressedAirPrice'], unitSettings.includeCompressedAir);
    unitSettings.compressedAirUnit = form.controls['compressedAirUnit'].value;
    unitSettings.compressedAirPrice = form.controls['compressedAirPrice'].value;

    unitSettings.includeWater = form.controls['includeWater'].value;
    this.setRequiredValidator(form.controls['waterPrice'], unitSettings.includeWater);
    unitSettings.waterUnit = form.controls['waterUnit'].value;
    unitSettings.waterPrice = form.controls['waterPrice'].value;

    unitSettings.includeWasteWater = form.controls['includeWasteWater'].value;
    this.setRequiredValidator(form.controls['wasteWaterPrice'], unitSettings.includeWasteWater);
    unitSettings.wasteWaterUnit = form.controls['wasteWaterUnit'].value;
    unitSettings.wasteWaterPrice = form.controls['wasteWaterPrice'].value;
    return unitSettings;
  }

  setRequiredValidator(control: AbstractControl, isRequired: boolean) {
    if (isRequired) {
      control.addValidators(Validators.required);
    } else {
      control.removeValidators(Validators.required);
    }
    control.updateValueAndValidity;
  }

  /**
   * Custom validators
   */

  zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const countryCode = control.parent?.get('country').value;
      const zipCode = control.value;
      if (!zipCode) return null; // empty zip code
      const currentConsoleError = console.error;
      let isZipValid;
      try {
        console.error = () => {};
        isZipValid = valZip(zipCode.split('-')[0], countryCode || '');
      } finally {
        console.error = currentConsoleError;
      }
      
      if (isZipValid === false) return {invalidZipCode: true};
      return null;
    }
  }

}
