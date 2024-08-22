import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnergyUnitOptions, MassUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from '../../constants/unitOptions';
import { Subscription } from 'rxjs';
import { UnitSettings } from 'src/app/models/unitSettings';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';
import { SharedSettingsFormsService } from '../shared-settings-forms.service';

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  styleUrls: ['./units-form.component.css']
})
export class UnitsFormComponent implements OnInit, OnDestroy{

  faGear: IconDefinition = faGear;
  form: FormGroup;
  energyUnitOptions: Array<UnitOption> = EnergyUnitOptions;
  volumeGasOptions: Array<UnitOption> = VolumeGasOptions;
  volumeLiquidOptions: Array<UnitOption> = VolumeLiquidOptions;
  massUnitOptions: Array<UnitOption> = MassUnitOptions;

  facility: IdbFacility;
  facilitySub: Subscription;
  constructor(
    private facilityIdbService: FacilityIdbService,
    private sharedSettingsFormsService: SharedSettingsFormsService) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      if (!this.facility || (this.facility.guid != _facility.guid)) {
        //initialize form on facility change
        this.form = this.sharedSettingsFormsService.getUnitsForm(_facility.unitSettings);
      }
      this.facility = _facility;
    });
  }

  ngOnDestroy() {
    if (this.facilitySub) {
      this.facilitySub.unsubscribe();
    }
  }

  async saveChanges() {
    this.facility.unitSettings = this.sharedSettingsFormsService.updateUnitSettingsFromForm(this.form, this.facility.unitSettings);
    await this.facilityIdbService.asyncUpdate(this.facility);
  }


}
