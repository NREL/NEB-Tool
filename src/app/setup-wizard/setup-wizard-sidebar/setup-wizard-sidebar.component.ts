import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faMaximize, faMinimize, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { Subscription } from 'rxjs';
import { IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

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

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  companySub: Subscription;
  company: IdbCompany;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorsSub: Subscription;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
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

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(val => {
      this.assessments = val;
    });

    this.sidebarOpenSub = this.setupWizardService.sidebarOpen.subscribe(val => {
      this.sidebarOpen = val;
    });

    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(val => {
      this.onSiteVisit = val;
    });

    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });

    this.keyPerformanceIndicatorsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
  }

  ngOnDestroy() {
    this.setupContextSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.sidebarOpenSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.companySub.unsubscribe();
    this.keyPerformanceIndicatorsSub.unsubscribe();
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
      this.closeStartOverModal();
    });
  }

  toggleSidebar() {
    this.setupWizardService.sidebarOpen.next(!this.sidebarOpen);
  }
}
