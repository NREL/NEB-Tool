import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactContext, IdbContact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  sidebarOpen: BehaviorSubject<boolean>;
  displayAddNebsModal: BehaviorSubject<{
    assessmentId: string,
    energyOpportunityId: string
  }>;

  displayContactModal: BehaviorSubject<{
    context: ContactContext,
    viewContact: IdbContact,
    contextGuid: string
  }>;
  constructor(  ) {
    this.sidebarOpen = new BehaviorSubject<boolean>(true);
    this.displayAddNebsModal = new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>(undefined);
    this.displayContactModal = new BehaviorSubject<{ context: ContactContext, viewContact: IdbContact, contextGuid: string }>(undefined);
  }
}