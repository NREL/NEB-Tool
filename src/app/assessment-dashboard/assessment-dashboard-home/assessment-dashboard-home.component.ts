import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-assessment-dashboard-home',
  templateUrl: './assessment-dashboard-home.component.html',
  styleUrl: './assessment-dashboard-home.component.css'
})
export class AssessmentDashboardHomeComponent {

  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  projects: Array<IdbProject>;
  projectsSub: Subscription;

  displayEditModal: boolean = false;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private projectsIdbService: ProjectIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private setupWizardService: SetupWizardService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_selectedAssessment => {
      this.assessment = _selectedAssessment;
    });

    this.projectsSub = this.projectsIdbService.projects.subscribe(_projects => {
      this.projects = _projects;
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  openEditModal() {
    this.displayEditModal = true;
  }

  closeEditModal() {
    this.displayEditModal = false;
  }

  confirmEdit() {
    let companies: Array<IdbCompany> = this.companyIdbService.companies.getValue();
    let company: IdbCompany = companies.find(_company => {
      return _company.guid == this.assessment.companyId;
    });
    this.setupWizardService.company.next(company);
    let facilities: Array<IdbFacility> = this.facilityIdbService.facilities.getValue();
    let facility: IdbFacility = facilities.find(_facility => {
      return _facility.guid == this.assessment.facilityId;
    });
    this.setupWizardService.facility.next(facility);
    this.setupWizardService.assessment.next(this.assessment);
    let assessmentProjects: Array<IdbProject> = this.projects.filter(_project => {
      return _project.assessmentId == this.assessment.guid;
    })
    this.setupWizardService.projects.next(assessmentProjects);
    this.router.navigateByUrl('/setup-wizard/assessment-setup');
  }
}
