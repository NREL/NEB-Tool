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
  helpLabel: string;

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
      this.helpLabel = 'Company Setup Help';
    } else if (url.includes('company-contacts')) {
      this.helpContext = 'company-contacts';
      this.helpLabel = 'Stakeholder Help';
    } else if (url.includes('company-kpi-select')) {
      this.helpContext = 'company-kpi-select';
      this.helpLabel = 'KPI Select Help';
    } else if (url.includes('company-kpi-detail')) {
      this.helpContext = 'company-kpi-detail';
      this.helpLabel = 'KPI Details Help';
    }else if (url.includes('facility-setup')) {
      this.helpContext = 'facility-setup';
      this.helpLabel = 'Facility Setup Help';
    }else if (url.includes('energy-equipment')) {
      this.helpContext = 'energy-equipment';
      this.helpLabel = 'Industrial System Inventory Help';
    }else if (url.includes('end-uses')) {
      this.helpContext = 'end-uses';
      this.helpLabel = 'End Uses Help';
    }else if (url.includes('pre-assessment')) {
      this.helpContext = 'pre-assessment';
      this.helpLabel = 'Pre-Assessment Help';
    }else if (url.includes('review-pre-visit')) {
      this.helpContext = 'review-pre-visit';
      this.helpLabel = 'Review Pre-Visit Help';
    }   
    else {
      this.helpContext = undefined;
    }
  }
}
