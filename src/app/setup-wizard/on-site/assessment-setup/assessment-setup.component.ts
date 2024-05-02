import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faFileLines, faFilePen, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from '../../setup-wizard.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { IdbFacility } from 'src/app/models/facility';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { Subscription } from 'rxjs';

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

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private userIdbService: UserIdbService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    let user: IdbUser = this.userIdbService.user.getValue();
    if (!user) {
      this.setupWizardService.initializeDataForDev();
    }

    this.assessmentsSub = this.setupWizardService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    })


    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessment = this.assessments.find(_assessment => { return _assessment.guid == assessmentGUID });
      // let facilityExists: boolean = this.facilityIdbService.setSelectedFromGUID(facilityGUID);
      if(!this.assessment && this.assessments.length > 0){
        this.router.navigateByUrl('/assessment-setup/'+ this.assessments[0].guid);
      }
    });


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
