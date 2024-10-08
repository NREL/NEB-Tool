import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IconDefinition, faBuilding, faChevronRight, faContactCard, faFilePen, faGear, faLocationDot, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { Observable, Subscription, filter, of } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { FormControl, Validators } from '@angular/forms';
import { CompanySetupService } from './company-setup.service';
import { PreAssessmentSetupService } from '../pre-assessment-setup/pre-assessment-setup.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { FacilitySetupService } from '../facility-setup/facility-setup.service';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.css'
})
export class CompanySetupComponent implements OnInit, OnDestroy {

  faFilePen: IconDefinition = faFilePen;
  faGear: IconDefinition = faGear;
  faContactCard: IconDefinition = faContactCard;
  faLocationDot: IconDefinition = faLocationDot;
  faBuilding: IconDefinition = faBuilding;
  faChevronRight: IconDefinition = faChevronRight;
  faCircleExclamation: IconDefinition = faCircleExclamation;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  name: FormControl;
  energyUnit: FormControl;
  routeGuardWarningModal: boolean = false;

  hasAssessments: boolean = false;
  energyUnitChange: boolean = false;

  companyAssessments: Array<IdbAssessment> = [];
  companyFacilities: Array<IdbFacility> = [];

  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private companySetupService: CompanySetupService,
    private preAassessmentSetupService: PreAssessmentSetupService,
    private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private facilitySetupService: FacilitySetupService
  ) {

  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
    });
    if (this.selectedCompany) {
      this.name = new FormControl(this.selectedCompany.generalInformation.name, [Validators.required]);
      this.energyUnit = new FormControl(this.selectedCompany.companyEnergyUnit, []); // Default value
      this.companySetupService.setControl(this.name);

      this.companyAssessments = this.assessmentIdbService.getByOtherGuid(this.selectedCompany.guid, 'company');
      if (this.companyAssessments.length > 0) {
        this.hasAssessments = true;
      }

      this.companyFacilities = this.facilityIdbService.getByOtherGuid(this.selectedCompany.guid, 'company');
    }
  }

  canDeactivate(): Observable<boolean> {
    if (this.name && this.name.getError('required')) {
      this.name.markAsTouched();
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  goToContacts() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
  }

  async saveUnitChanges() {
    this.energyUnitChange = true;
    await this.saveChanges();
    await this.preAassessmentSetupService.updateAssessmentEnergyUse(
      this.companyAssessments, this.energyUnit.value);
    await this.facilitySetupService.updateFacilityEnergyUse(
      this.companyFacilities, this.energyUnit.value);
  }

  async saveChanges() {
    this.selectedCompany = this.companyIdbService.selectedCompany.getValue();
    this.selectedCompany.generalInformation.name = this.name.value;
    this.selectedCompany.companyEnergyUnit = this.energyUnit.value;
    await this.companyIdbService.asyncUpdate(this.selectedCompany);
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
