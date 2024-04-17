import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, fa1, fa2, fa3, fa4, fa5, fa6, faCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setup-wizard-sidebar',
  templateUrl: './setup-wizard-sidebar.component.html',
  styleUrl: './setup-wizard-sidebar.component.css'
})
export class SetupWizardSidebarComponent {

  fa1: IconDefinition = fa1;
  fa2: IconDefinition = fa2;
  fa3: IconDefinition = fa3;
  fa4: IconDefinition = fa4;
  fa5: IconDefinition = fa5;
  fa6: IconDefinition = fa6;

  faCircle: IconDefinition = faCircle;
  faExclamationCircle: IconDefinition = faExclamationCircle;
  displaySidebar: boolean = true;
  setupContext: SetupWizardContext;
  setupContextSub: Subscription;
  constructor(private router: Router, private setupWizardService: SetupWizardService){

  }

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setDisplaySidebar();
      }
    });
    this.setDisplaySidebar();

    this.setupContextSub = this.setupWizardService.setupContext.subscribe(val => {
      this.setupContext = val;
    });
  }

  setDisplaySidebar(){
    this.displaySidebar = (this.router.url.includes('getting-started') == false);
  }
}
