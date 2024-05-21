import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnergyUnitOptions, MassUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from './unitOptions';
import { IdbCompany } from 'src/app/models/company';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UnitSettings } from 'src/app/models/unitSettings';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  styleUrls: ['./units-form.component.css']
})
export class UnitsFormComponent {
  @Input()
  inCompany: boolean;

  faGear: IconDefinition = faGear;
  form: FormGroup;
  energyUnitOptions: Array<UnitOption> = EnergyUnitOptions;
  volumeGasOptions: Array<UnitOption> = VolumeGasOptions;
  volumeLiquidOptions: Array<UnitOption> = VolumeLiquidOptions;
  massUnitOptions: Array<UnitOption> = MassUnitOptions;

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
          this.form = this.getUnitsForm(_company.unitSettings);
        }
        this.company = _company;
      });
    } else {
      this.companyOrFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
        if (!this.facility || (this.facility.guid != _facility.guid)) {
          //initialize form on facility change
          this.form = this.getUnitsForm(_facility.unitSettings);
        }
        this.facility = _facility;
      });
    }
  }

  ngOnDestroy() {
    this.companyOrFacilitySub.unsubscribe();
  }

  getUnitsForm(unitSettings: UnitSettings): FormGroup {
    //TODO: Add validation logic (issue-65)
    let form: FormGroup = this.formBuilder.group({
      includeElectricity: [unitSettings.includeElectricity],
      electricityUnit: [unitSettings.electricityUnit],
      electricityPrice: [unitSettings.electricityPrice],

      includeNaturalGas: [unitSettings.includeNaturalGas],
      naturalGasUnit: [unitSettings.naturalGasUnit],
      naturalGasPrice: [unitSettings.naturalGasPrice],

      includeSteam: [unitSettings.includeSteam],
      steamUnit: [unitSettings.steamUnit],
      steamPrice: [unitSettings.steamPrice],

      includeOtherFuel: [unitSettings.includeOtherFuel],
      otherFuelUnit: [unitSettings.otherFuelUnit],
      otherFuelPrice: [unitSettings.otherFuelPrice],

      includeCompressedAir: [unitSettings.includeCompressedAir],
      compressedAirUnit: [unitSettings.compressedAirUnit],
      compressedAirPrice: [unitSettings.compressedAirPrice],

      includeWater: [unitSettings.includeWater],
      waterUnit: [unitSettings.waterUnit],
      waterPrice: [unitSettings.waterPrice],

      includeWasteWater: [unitSettings.includeWasteWater],
      wasteWaterUnit: [unitSettings.wasteWaterUnit],
      wasteWaterPrice: [unitSettings.wasteWaterPrice],
    });
    return form;
  }
  async saveChanges() {
    if (this.inCompany) {
      this.company.unitSettings = this.updateUnitSettingsFromForm(this.company.unitSettings);
      await this.companyIdbService.asyncUpdate(this.company);
    } else {
      this.facility.unitSettings = this.updateUnitSettingsFromForm(this.facility.unitSettings);
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
  }

  updateUnitSettingsFromForm(unitSettings: UnitSettings): UnitSettings {
    unitSettings.includeElectricity = this.form.controls['includeElectricity'].value;
    unitSettings.electricityUnit = this.form.controls['electricityUnit'].value;
    unitSettings.electricityPrice = this.form.controls['electricityPrice'].value;

    unitSettings.includeNaturalGas = this.form.controls['includeNaturalGas'].value;
    unitSettings.naturalGasUnit = this.form.controls['naturalGasUnit'].value;
    unitSettings.naturalGasPrice = this.form.controls['naturalGasPrice'].value;

    unitSettings.includeSteam = this.form.controls['includeSteam'].value;
    unitSettings.steamUnit = this.form.controls['steamUnit'].value;
    unitSettings.steamPrice = this.form.controls['steamPrice'].value;

    unitSettings.includeOtherFuel = this.form.controls['includeOtherFuel'].value;
    unitSettings.otherFuelUnit = this.form.controls['otherFuelUnit'].value;
    unitSettings.otherFuelPrice = this.form.controls['otherFuelPrice'].value;

    unitSettings.includeCompressedAir = this.form.controls['includeCompressedAir'].value;
    unitSettings.compressedAirUnit = this.form.controls['compressedAirUnit'].value;
    unitSettings.compressedAirPrice = this.form.controls['compressedAirPrice'].value;

    unitSettings.includeWater = this.form.controls['includeWater'].value;
    unitSettings.waterUnit = this.form.controls['waterUnit'].value;
    unitSettings.waterPrice = this.form.controls['waterPrice'].value;

    unitSettings.includeWasteWater = this.form.controls['includeWasteWater'].value;
    unitSettings.wasteWaterUnit = this.form.controls['wasteWaterUnit'].value;
    unitSettings.wasteWaterPrice = this.form.controls['wasteWaterPrice'].value;
    return unitSettings;
  }

}
