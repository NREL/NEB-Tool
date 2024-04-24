import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbAssessment } from 'src/app/models/assessment';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-pre-assessment-setup',
  templateUrl: './pre-assessment-setup.component.html',
  styleUrl: './pre-assessment-setup.component.css'
})
export class PreAssessmentSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faListCheck: IconDefinition = faListCheck;
  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;
  assessment: IdbAssessment;

  accordionIndex: number = 0;
  processEquipmentOptions: Array<ProcessEquipment>;
  constructor(private router: Router, private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    //TODO: Temporary for dev.
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (!company) {
      this.setupWizardService.initializeDataForDev();
    }
    this.assessment = this.setupWizardService.assessment.getValue();
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    this.processEquipmentOptions = facility.processEquipment;
  }

  goToProjects() {
    this.router.navigateByUrl('/setup-wizard/project-setup');
  }

  saveChanges() {
    this.setupWizardService.assessment.next(this.assessment);
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/process-equipment');
  }

  goToNext() {
    this.router.navigateByUrl('/setup-wizard/review-pre-visit');
  }
}
