import { Component } from '@angular/core';
import { IconDefinition, faChevronRight, faFolderOpen, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faFolderOpen: IconDefinition = faFolderOpen;

  user: IdbUser;
  constructor(private userIdbService: UserIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.user = this.userIdbService.user.getValue();
  }

  async saveChanges() {
    await this.userIdbService.asyncUpdate(this.user);
  }

  openWizardModal() {
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }
}
