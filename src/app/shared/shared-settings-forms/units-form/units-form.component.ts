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
    let form: FormGroup = this.formBuilder.group({
      unitsOfMeasure: [unitSettings.unitsOfMeasure, [Validators.required]],
      energyUnit: [unitSettings.energyUnit, [Validators.required]],
      massUnit: [unitSettings.massUnit, [Validators.required]],
      volumeLiquidUnit: [unitSettings.volumeLiquidUnit, [Validators.required]],
      volumeGasUnit: [unitSettings.volumeGasUnit, [Validators.required]],
      electricityUnit: [unitSettings.electricityUnit, [Validators.required]]
    });
    return form;
  }
  async saveChanges() {
    if (this.inCompany) {
      let unitsOfMeasure: "Metric" | "Imperial" | "Custom" = this.getUnitsOfMeasure(this.company.unitSettings);
      this.form.controls['unitsOfMeasure'].patchValue(unitsOfMeasure);
      this.company.unitSettings = this.updateUnitSettingsFromForm(this.company.unitSettings);
      await this.companyIdbService.asyncUpdate(this.company);
    } else {
      let unitsOfMeasure: "Metric" | "Imperial" | "Custom" = this.getUnitsOfMeasure(this.facility.unitSettings);
      this.form.controls['unitsOfMeasure'].patchValue(unitsOfMeasure);
      this.facility.unitSettings = this.updateUnitSettingsFromForm(this.facility.unitSettings);
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
  }

  async setUnitsOfMeasure() {
    if (this.form.controls['unitsOfMeasure'].value == 'Imperial') {
      this.form.controls['energyUnit'].setValue('kWh');
      this.form.controls['volumeLiquidUnit'].setValue('ft3');
      this.form.controls['volumeGasUnit'].setValue('SCF');
      this.form.controls['massUnit'].setValue('lb');
    } else if (this.form.controls['unitsOfMeasure'].value == 'Metric') {
      this.form.controls['energyUnit'].setValue('MMBtu');
      this.form.controls['volumeLiquidUnit'].setValue('m3');
      this.form.controls['volumeGasUnit'].setValue('m3');
      this.form.controls['massUnit'].setValue('kg');
    }
    await this.saveChanges();
  }

  updateUnitSettingsFromForm(unitSettings: UnitSettings): UnitSettings {
    unitSettings.unitsOfMeasure = this.form.controls['unitsOfMeasure'].value;
    unitSettings.energyUnit = this.form.controls['energyUnit'].value;
    unitSettings.massUnit = this.form.controls['massUnit'].value;
    unitSettings.volumeLiquidUnit = this.form.controls['volumeLiquidUnit'].value;
    unitSettings.volumeGasUnit = this.form.controls['volumeGasUnit'].value;
    unitSettings.electricityUnit = this.form.controls['electricityUnit'].value;
    return unitSettings;
  }

  getUnitsOfMeasure(unitSettings: UnitSettings): "Metric" | "Imperial" | "Custom" {
    let selectedEnergyOption: UnitOption = EnergyUnitOptions.find(option => { return option.value == unitSettings.energyUnit });
    let selectedVolumeGasOption: UnitOption = VolumeGasOptions.find(option => { return option.value == unitSettings.volumeGasUnit });
    let selectedVolumeLiquidOption: UnitOption = VolumeLiquidOptions.find(option => { return option.value == unitSettings.volumeLiquidUnit });
    let selectedMassOption: UnitOption = MassUnitOptions.find(option => { return option.value == unitSettings.massUnit });
    if (selectedEnergyOption && selectedVolumeGasOption && selectedVolumeLiquidOption && selectedMassOption) {
      if (selectedEnergyOption.unitsOfMeasure == 'Metric' && selectedVolumeLiquidOption.unitsOfMeasure == 'Metric' && selectedVolumeGasOption.unitsOfMeasure == 'Metric' && selectedMassOption.unitsOfMeasure == 'Metric') {
        return 'Metric';
      } else if (selectedEnergyOption.unitsOfMeasure == 'Imperial' && selectedVolumeLiquidOption.unitsOfMeasure == 'Imperial' && selectedVolumeGasOption.unitsOfMeasure == 'Imperial' && selectedMassOption.unitsOfMeasure == 'Imperial') {
        return 'Imperial';
      } else {
        return 'Custom';
      }
    }
    return "Custom";
  }
}
