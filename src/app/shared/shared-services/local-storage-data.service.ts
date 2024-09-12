import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {

  setupHelpPanelCollapsed: boolean;
  energyOppAccordionGuid: string;
  nebAccordionGuid: string;
  contactAccordionGuid: string
  energyEquipmentAccordionGuid: string;
  processEquipmentAccordionGuid: string;
  assessmentAccordionGuid: string;
  constructor(private localStorageService: LocalStorageService) {
    this.setupHelpPanelCollapsed = this.localStorageService.retrieve("setupHelpPanelCollapsed");
    if (this.setupHelpPanelCollapsed == undefined) {
      this.setSetupPanelCollapsed(false);
    }

    this.energyOppAccordionGuid = this.localStorageService.retrieve("energyOppAccordionGuid");
    this.nebAccordionGuid = this.localStorageService.retrieve("nebAccordionGuid");
    this.contactAccordionGuid = this.localStorageService.retrieve("contactAccordionGuid");
    this.energyEquipmentAccordionGuid = this.localStorageService.retrieve("energyEquipmentAccordionGuid");
    this.processEquipmentAccordionGuid = this.localStorageService.retrieve("processEquipmentAccordionGuid");
    this.assessmentAccordionGuid = this.localStorageService.retrieve("assessmentAccordionGuid");
  }

  setSetupPanelCollapsed(val: boolean) {
    this.setupHelpPanelCollapsed = val;
    this.localStorageService.store('setupHelpPanelCollapsed', this.setupHelpPanelCollapsed);
  }

  setEnergyOppAccordionGuid(energyOppAccordionGuid: string) {
    this.energyOppAccordionGuid = energyOppAccordionGuid;
    this.localStorageService.store('energyOppAccordionGuid', this.energyOppAccordionGuid);
  }

  setNebAccordionGuid(nebAccordionGuid: string) {
    this.nebAccordionGuid = nebAccordionGuid;
    this.localStorageService.store('nebAccordionGuid', this.nebAccordionGuid);
  }

  setContactAccordionGuid(contactAccordionGuid: string) {
    this.contactAccordionGuid = contactAccordionGuid;
    this.localStorageService.store('contactAccordionGuid', this.contactAccordionGuid);
  }

  setEnergyEquipmentAccordionGuid(energyEquipmentAccordionGuid: string) {
    this.energyEquipmentAccordionGuid = energyEquipmentAccordionGuid;
    this.localStorageService.store('energyEquipmentAccordionGuid', this.energyEquipmentAccordionGuid);
  }

  setProcessEquipmentAccordionGuid(processEquipmentAccordionGuid: string) {
    this.processEquipmentAccordionGuid = processEquipmentAccordionGuid;
    this.localStorageService.store('processEquipmentAccordionGuid', this.processEquipmentAccordionGuid);
  }

  setAssessmentAccordionGuid(assessmentAccordionGuid: string) {
    this.assessmentAccordionGuid = assessmentAccordionGuid;
    this.localStorageService.store('assessmentAccordionGuid', this.assessmentAccordionGuid);
  }
}
