import { Component } from '@angular/core';
import { SetupWizardService } from './setup-wizard.service';

@Component({
  selector: 'app-setup-wizard',
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.css'
})
export class SetupWizardComponent {

  constructor(private setupWizardService: SetupWizardService){

  }

  ngOnDestroy(){
    this.setupWizardService.company.next(undefined);
    this.setupWizardService.facility.next(undefined);
    this.setupWizardService.project.next(undefined);
  }

}
