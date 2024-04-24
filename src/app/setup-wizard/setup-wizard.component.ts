import { Component } from '@angular/core';
import { SetupWizardService } from './setup-wizard.service';

@Component({
  selector: 'app-setup-wizard',
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.css'
})
export class SetupWizardComponent {

  inGettingStarted: boolean;
  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnDestroy(){
    this.setupWizardService.company.next(undefined);
    this.setupWizardService.facility.next(undefined);
    this.setupWizardService.assessments.next([]);
    this.setupWizardService.contacts.next([]);
  }

}
