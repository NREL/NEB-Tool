import { Component } from '@angular/core';
import { IconDefinition, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-team-details-summary',
  templateUrl: './team-details-summary.component.html',
  styleUrl: './team-details-summary.component.css'
})
export class TeamDetailsSummaryComponent {

  faAddressBook: IconDefinition = faAddressBook;

  contacts: Array<IdbContact>;
  constructor(private setupWizardService: SetupWizardService) {
  }

  ngOnInit() {
    this.contacts = this.setupWizardService.contacts.getValue();
  }
}
