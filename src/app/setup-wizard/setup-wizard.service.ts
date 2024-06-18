import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  setupContext: BehaviorSubject<SetupWizardContext>;
  sidebarOpen: BehaviorSubject<boolean>;
  displayAddNebsModal: BehaviorSubject<{
    assessmentId: string,
    energyOpportunityId: string
  }>;
  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.sidebarOpen = new BehaviorSubject<boolean>(true);
    this.displayAddNebsModal = new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>(undefined);

    let setupContext: SetupWizardContext = this.localStorageService.retrieve("setupContext");
    if (setupContext) {
      this.setupContext = new BehaviorSubject<SetupWizardContext>(setupContext);
    } else {
      this.setupContext = new BehaviorSubject<SetupWizardContext>('full');
    }
    //subscribe after initialization
    this.setupContext.subscribe(setupContext => {
      if (setupContext) {
        this.localStorageService.store('setupContext', setupContext);
      }
    });
  }
}


export type SetupWizardContext = 'preVisit' | 'postVisit' | 'onSite' | 'full';