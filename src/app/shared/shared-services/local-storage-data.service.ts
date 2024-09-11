import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {

  setupHelpPanelCollapsed: boolean;
  constructor(private localStorageService: LocalStorageService) {
    this.setupHelpPanelCollapsed = this.localStorageService.retrieve("setupHelpPanelCollapsed");
    if (this.setupHelpPanelCollapsed == undefined) {
      this.setSetupPanelCollapsed(false);
    }
  }

  setSetupPanelCollapsed(val: boolean) {
    this.setupHelpPanelCollapsed = val;
    this.localStorageService.store('setupHelpPanelCollapsed', this.setupHelpPanelCollapsed);
  }
}
