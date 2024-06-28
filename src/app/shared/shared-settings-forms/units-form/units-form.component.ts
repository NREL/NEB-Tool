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
import { SharedSettingsFormsService } from '../shared-settings-forms.service';

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
    private facilityIdbService: FacilityIdbService,
    private sharedSettingsFormsService: SharedSettingsFormsService) {
  }

  ngOnInit() {
    if (this.inCompany) {
      this.companyOrFacilitySub = this.companyIdbService.selectedCompany.subscribe(_company => {
        if (!this.company || (this.company.guid != _company.guid)) {
          //initialize form on company change
          this.form = this.sharedSettingsFormsService.getUnitsForm(_company.unitSettings);
        }
        this.company = _company;
      });
    } else {
      this.companyOrFacilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
        if (!this.facility || (this.facility.guid != _facility.guid)) {
          //initialize form on facility change
          this.form = this.sharedSettingsFormsService.getUnitsForm(_facility.unitSettings);
        }
        this.facility = _facility;
      });
    }
  }

  ngOnDestroy() {
    this.companyOrFacilitySub.unsubscribe();
  }

  async saveChanges() {
    if (this.inCompany) {
      this.company.unitSettings = this.sharedSettingsFormsService.updateUnitSettingsFromForm(this.form, this.company.unitSettings);
      await this.companyIdbService.asyncUpdate(this.company);
    } else {
      this.facility.unitSettings = this.sharedSettingsFormsService.updateUnitSettingsFromForm(this.form, this.facility.unitSettings);
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
  }


}
