import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faFileLines, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbProject } from 'src/app/models/project';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrl: './project-setup.component.css'
})
export class ProjectSetupComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faUser: IconDefinition = faUser;
  faFileLines: IconDefinition = faFileLines;
  assessment: IdbAssessment;

  projects: Array<IdbProject>;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  contacts: Array<IdbContact>;
  displayContactModal: boolean = false;
  viewContact: IdbContact;
  constructor(private router: Router, private setupWizardService: SetupWizardService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (!company) {
      this.setupWizardService.initializeDataForDev();
    }
    // let facility: IdbFacility = this.setupWizardService.facility.getValue();
    // this.processEquipmentOptions = facility.processEquipment;
    this.contacts = this.setupWizardService.contacts.getValue();

    this.assessmentsSub = this.setupWizardService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });


    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessment = this.assessments.find(_assessment => { return _assessment.guid == assessmentGUID });
      if (!this.assessment && this.assessments.length > 0) {
        this.router.navigateByUrl('/setup-wizard/assessment-setup/' + this.assessments[0].guid);
      } else if (!this.assessment) {
        this.router.navigateByUrl('/setup-wizard');
      }
    });
  }

  ngOnDestroy(){
    this.assessmentsSub.unsubscribe();
  }
}
