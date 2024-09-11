import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {

  setupHelpPanelCollapsed: boolean;
  energyOppGuid: string;
  nebGuid: string;
  constructor(private localStorageService: LocalStorageService) {
    this.setupHelpPanelCollapsed = this.localStorageService.retrieve("setupHelpPanelCollapsed");
    if (this.setupHelpPanelCollapsed == undefined) {
      this.setSetupPanelCollapsed(false);
    }

    this.energyOppGuid = this.localStorageService.retrieve("energyOppGuid");
    this.nebGuid = this.localStorageService.retrieve("nebGuid");
  }

  setSetupPanelCollapsed(val: boolean) {
    this.setupHelpPanelCollapsed = val;
    this.localStorageService.store('setupHelpPanelCollapsed', this.setupHelpPanelCollapsed);
  }

  setEnergyOppGuid(energyOppGuid: string){
    this.energyOppGuid = energyOppGuid;
    this.localStorageService.store('energyOppGuid', this.energyOppGuid);
  }

  setNebGuid(nebGuid: string){
    this.nebGuid = nebGuid;
    this.localStorageService.store('nebGuid', this.nebGuid);
  }
}
