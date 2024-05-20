import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  setupContext: BehaviorSubject<SetupWizardContext>;
  highlighProjectGuid: BehaviorSubject<string>;
  highlighNebGuid: BehaviorSubject<string>;
  sidebarOpen: BehaviorSubject<boolean>;
  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.highlighNebGuid = new BehaviorSubject<string>(undefined);
    this.highlighProjectGuid = new BehaviorSubject<string>(undefined);
    this.sidebarOpen = new BehaviorSubject<boolean>(true);

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