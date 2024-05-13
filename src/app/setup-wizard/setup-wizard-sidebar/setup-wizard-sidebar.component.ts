import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faMaximize, faMinimize, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { Subscription } from 'rxjs';
import { IdbAssessment } from 'src/app/models/assessment';

@Component({
  selector: 'app-setup-wizard-sidebar',
  templateUrl: './setup-wizard-sidebar.component.html',
  styleUrl: './setup-wizard-sidebar.component.css'
})
export class SetupWizardSidebarComponent {


  faRotateLeft: IconDefinition = faRotateLeft;
  faMinimize: IconDefinition = faMinimize;
  faMaximize: IconDefinition = faMaximize;

  displaySidebar: boolean = true;
  setupContext: SetupWizardContext;
  setupContextSub: Subscription;
  displayStartOverModal: boolean;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>;
  sidebarOpenSub: Subscription;
  sidebarOpen: boolean = false;
  constructor(private router: Router, private setupWizardService: SetupWizardService
  ) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setDisplaySidebar();
      }
    });
    this.setDisplaySidebar();

    this.setupContextSub = this.setupWizardService.setupContext.subscribe(val => {
      this.setupContext = val;
    });

    this.assessmentsSub = this.setupWizardService.assessments.subscribe(val => {
      this.assessments = val;
    });

    this.sidebarOpenSub = this.setupWizardService.sidebarOpen.subscribe(val => {
      this.sidebarOpen = val;
    });
  }

  ngOnDestroy() {
    this.setupContextSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.sidebarOpenSub.unsubscribe();
  }

  setDisplaySidebar() {
    this.displaySidebar = (this.router.url.includes('getting-started') == false);
  }

  openStartOverModal() {
    this.displayStartOverModal = true;
  }

  closeStartOverModal() {
    this.displayStartOverModal = false;
  }

  confirmStartOver() {
    this.router.navigateByUrl('/setup-wizard/getting-started').then(() => {
      this.setupWizardService.company.next(undefined);
      this.setupWizardService.facility.next(undefined);
      this.setupWizardService.assessments.next([]);
      this.setupWizardService.contacts.next([]);
      this.setupWizardService.nonEnergyBenefits.next([]);
      this.setupWizardService.projects.next([]);
      this.closeStartOverModal();
    });
  }

  toggleSidebar() {
    this.setupWizardService.sidebarOpen.next(!this.sidebarOpen);
  }
}
