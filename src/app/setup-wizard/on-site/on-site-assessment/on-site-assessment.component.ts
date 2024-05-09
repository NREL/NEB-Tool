import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronRight, faFileLines, faFilePen, faListCheck, faPeopleGroup, faPlus, faScaleUnbalancedFlip, faScrewdriverWrench, faToolbox, faUser } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IdbFacility } from 'src/app/models/facility';
import { EquipmentType, EquipmentTypeOptions } from 'src/app/shared/constants/equipmentTypes';
import { IdbProject } from 'src/app/models/project';
import { Subscription } from 'rxjs';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
@Component({
  selector: 'app-on-site-assessment',
  templateUrl: './on-site-assessment.component.html',
  styleUrl: './on-site-assessment.component.css'
})
export class OnSiteAssessmentComponent {

  equipmentTypeOptions: Array<EquipmentType> = EquipmentTypeOptions;

  faFileLines: IconDefinition = faFileLines;
  faFilePen: IconDefinition = faFilePen;
  faListCheck: IconDefinition = faListCheck;
  faChevronRight: IconDefinition = faChevronRight;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faPeople: IconDefinition = faPeopleGroup;
  faUser: IconDefinition = faUser;
  faPlus: IconDefinition = faPlus;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  assessment: IdbAssessment;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  processEquipmentOptions: Array<ProcessEquipment>;
  contacts: Array<IdbContact>;
  displayContactModal: boolean = false;
  viewContact: IdbContact;
  constructor(private router: Router, private setupWizardService: SetupWizardService, private activatedRoute: ActivatedRoute) { }

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
        this.router.navigateByUrl('/setup-wizard/on-site-assessment/' + this.assessments[0].guid);
      } else if (!this.assessment) {
        this.router.navigateByUrl('/setup-wizard');
      }
    });
  }

  ngOnDestroy(){
    this.assessmentsSub.unsubscribe();
  }

  goToProjects() {
    this.router.navigateByUrl('/setup-wizard/project-setup/' + this.assessment.guid + '/projects');
  }

  saveChanges() {
    let assessmentIndex: number = this.assessments.findIndex(assessment => {
      return assessment.guid == this.assessment.guid;
    });
    this.assessments[assessmentIndex] = this.assessment;
    this.setupWizardService.assessments.next(this.assessments);
  }
 
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
