import { Component } from '@angular/core';
import { IconDefinition, faDatabase, faFolderOpen, faGears, faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-dashboard-tabs',
  templateUrl: './user-dashboard-tabs.component.html',
  styleUrl: './user-dashboard-tabs.component.css'
})
export class UserDashboardTabsComponent {

  faFolderOpen: IconDefinition = faFolderOpen;
  faGears: IconDefinition = faGears;
  faDatabase: IconDefinition = faDatabase;
  faQuestion: IconDefinition = faQuestion;
}
