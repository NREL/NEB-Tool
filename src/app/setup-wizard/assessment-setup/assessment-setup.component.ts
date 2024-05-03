import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faFileLines, faFilePen, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from '../setup-wizard.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';

@Component({
  selector: 'app-assessment-setup',
  templateUrl: './assessment-setup.component.html',
  styleUrl: './assessment-setup.component.css'
})
export class AssessmentSetupComponent {

  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;

  faFileLines: IconDefinition = faFileLines;
  faFilePen: IconDefinition = faFilePen;
  faListCheck: IconDefinition = faListCheck;
  assessment: IdbAssessment;
  facility: IdbFacility;

  accordionIndex: number = 0;

  projects: Array<IdbProject>;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newIdbCompany: IdbCompany = this.setupWizardService.company.getValue();
    //TODO: Temporary for dev.
    if (!newIdbCompany) {
      newIdbCompany = getNewIdbCompany(user.guid);
      this.setupWizardService.company.next(newIdbCompany);
    }
    this.facility = this.setupWizardService.facility.getValue();;
    if (!this.facility) {
      this.facility = getNewIdbFacility(newIdbCompany.userId, newIdbCompany.guid);
    }
    this.assessment = this.setupWizardService.assessments.getValue()[0];
    if (!this.assessment) {
      this.assessment = getNewIdbAssessment(this.facility.userId, this.facility.companyId, this.facility.guid);
    }
    this.setupWizardService.assessments.next([this.assessment]);

    this.projects = this.setupWizardService.projects.getValue();
  }

  goBack() {
    if (this.accordionIndex != 0) {
      this.accordionIndex--;
    } else {
      this.router.navigateByUrl('/setup-wizard/facility-setup');
    }
  }

  goToProjects() {
    this.router.navigateByUrl('/setup-wizard/project-setup');
  }

  saveChanges() {
    this.setupWizardService.assessments.next([this.assessment]);
  }

  setAccordionIndex(index: number) {
    this.accordionIndex = index;
  }

  goToNext() {
    this.accordionIndex++;
  }

  addProject() {
    let newProject: IdbProject = getNewIdbProject(this.assessment.userId, this.assessment.companyId, this.assessment.guid, this.assessment.guid);
    newProject.name = 'Project #' + (this.projects.length + 1);
    this.projects.push(newProject);
  }
}
