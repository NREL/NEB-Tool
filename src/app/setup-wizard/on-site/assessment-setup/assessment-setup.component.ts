import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronRight, faFileLines, faFilePen, faListCheck, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from '../../setup-wizard.service';
import { IdbFacility } from 'src/app/models/facility';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { IdbProject } from 'src/app/models/project';
import { Subscription } from 'rxjs';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';

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
  faChevronRight: IconDefinition = faChevronRight;
  faToolbox: IconDefinition = faToolbox;
  faUser: IconDefinition = faUser;

  assessment: IdbAssessment;

  projects: Array<IdbProject>;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  processEquipmentOptions: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  displayContactModal: boolean = false;
  viewContact: IdbContact;
  constructor(private router: Router, private setupWizardService: SetupWizardService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    let company: IdbCompany = this.setupWizardService.company.getValue();
    if (!company) {
      this.setupWizardService.initializeDataForDev();
    }
    let facility: IdbFacility = this.setupWizardService.facility.getValue();
    this.processEquipmentOptions = facility.processEquipment;
    this.contacts = this.setupWizardService.contacts.getValue();

    this.assessmentsSub = this.setupWizardService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });


    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessment = this.assessments.find(_assessment => { return _assessment.guid == assessmentGUID });
      if (!this.assessment && this.assessments.length > 0) {
        this.router.navigateByUrl('/setup-wizard/assessment-setup/' + this.assessments[0].guid);
      }else if(!this.assessment){
        this.router.navigateByUrl('/setup-wizard');
      }
    });


  }

  // goBack() {
  //   if (this.accordionIndex != 0) {
  //     this.accordionIndex--;
  //   } else {
  //     this.router.navigateByUrl('/setup-wizard/facility-setup');
  //   }
  // }

  goToProjects() {
    this.router.navigateByUrl('/setup-wizard/project-setup');
  }

  saveChanges() {
    this.setupWizardService.assessments.next([this.assessment]);
  }

  // setAccordionIndex(index: number) {
  //   this.accordionIndex = index;
  // }

  // goToNext() {
  //   this.accordionIndex++;
  // }

  // addProject() {
  //   let newProject: IdbProject = getNewIdbProject(this.assessment.userId, this.assessment.companyId, this.assessment.guid, this.assessment.guid);
  //   newProject.name = 'Project #' + (this.projects.length + 1);
  //   this.projects.push(newProject);
  // }  
  openContactModal(viewContact: IdbContact) {
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
    this.setContacts();
  }
  
  setContacts() {
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
