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
  filteredVisits: Array<IdbOnSiteVisit> = [];

  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private companySetupService: CompanySetupService,
    private preAassessmentSetupService: PreAssessmentSetupService
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

      this.filteredVisits = this.onSiteVisitIdbService.onSiteVisits?.getValue()
        .filter(_visit => _visit.companyId === this.selectedCompany.guid);
      if (this.filteredVisits && this.filteredVisits.length > 0) {
        for (let _visit of this.filteredVisits) {
          if (_visit.assessmentIds.length > 0) {
            this.hasAssessments = true;
            break;
          }
        }
      }
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
    for (let _visit of this.filteredVisits) {
      await this.preAassessmentSetupService.updateAssessmentEnergyUse(
        _visit.assessmentIds, this.energyUnit.value);
    }
    await this.saveChanges();
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
