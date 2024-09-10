import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCircleQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HelpContext } from './HelpContext';

@Component({
  selector: 'app-setup-wizard-help-panel',
  templateUrl: './setup-wizard-help-panel.component.html',
  styleUrl: './setup-wizard-help-panel.component.css'
})
export class SetupWizardHelpPanelComponent {


  collapseHelpPanel: boolean = false;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  helpContext: HelpContext;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setHelpContext(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    this.setHelpContext(this.router.url);
  }

  toggleCollapseHelpPanel() {
    this.collapseHelpPanel = !this.collapseHelpPanel;
  }

  setHelpContext(url: string) {
    if (url.includes('company-setup')) {
      this.helpContext = 'company-setup';
    } else if (url.includes('company-contacts')) {
      this.helpContext = 'company-contacts';
    } else if (url.includes('company-kpi-select')) {
      this.helpContext = 'company-kpi-select';
    } else if (url.includes('company-kpi-detail')) {
      this.helpContext = 'company-kpi-detail';
    }else if (url.includes('facility-setup')) {
      this.helpContext = 'facility-setup';
    }else if (url.includes('energy-equipment')) {
      this.helpContext = 'energy-equipment';
    }else {
      this.helpContext = undefined;
    }
  }
}
