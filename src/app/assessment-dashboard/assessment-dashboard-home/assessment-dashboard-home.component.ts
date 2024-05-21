import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
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
    //TODO: Issue #75
    this.setupWizardService.setupContext.next('onSite');
    this.router.navigateByUrl('/setup-wizard/assessment-setup/' + this.assessment.guid);
  }
}
