import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnergyUnitOptions, MassUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from '../../constants/unitOptions';
import { Subscription } from 'rxjs';
import { UnitSettings } from 'src/app/models/unitSettings';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faGear } from '@fortawesome/free-solid-svg-icons';
import { SharedSettingsFormsService } from '../shared-settings-forms.service';
import { PreAssessmentSetupService } from 'src/app/setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  styleUrls: ['./units-form.component.css']
})
export class UnitsFormComponent implements OnInit, OnDestroy{

  faGear: IconDefinition = faGear;
  form: FormGroup;

  facility: IdbFacility;
  facilitySub: Subscription;

  facilityAssessments: Array<IdbAssessment> = [];
  hasAssessments: boolean = false;
  priceChanged: boolean = false;

  constructor(
    private facilityIdbService: FacilityIdbService,
    private sharedSettingsFormsService: SharedSettingsFormsService,
    private preAssessmentSetupService: PreAssessmentSetupService,
    private assessmentIdbService: AssessmentIdbService,) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      if (!this.facility || (this.facility.guid != _facility.guid)) {
        //initialize form on facility change
        this.form = this.sharedSettingsFormsService.getUnitsForm(_facility.unitSettings);
      }
      this.facility = _facility;
      this.facilityAssessments = this.assessmentIdbService .getByOtherGuid(this.facility.guid, 'facility');
      if (this.facilityAssessments.length > 0) {
        this.hasAssessments = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.facilitySub) {
      this.facilitySub.unsubscribe();
    }
  }

  async savePriceChanges() {
    this.priceChanged = true;
    await this.saveChanges();
    await this.preAssessmentSetupService.updateAssessmentEnergyCost(
      this.facilityAssessments, this.facility.unitSettings);
  }

  async saveChanges() {
    this.facility.unitSettings = this.sharedSettingsFormsService.updateUnitSettingsFromForm(this.form, this.facility.unitSettings);
    await this.facilityIdbService.asyncUpdate(this.facility);
  }


}
