import { Component } from '@angular/core';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { LoadingService } from '../loading/loading.service';
import { IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faHome: IconDefinition = faHome;


  version: string = environment.version;
  showResetModal: boolean = false;
  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private sharedDataService: SharedDataService) {

  }

  resetDatabase() {
    this.closeResetDatabaseModal();
    this.loadingService.setLoadingMessage('Resetting Database... This may take a moment. The page will refresh after the database is reset. If this takes more than a minute, refresh the page.');
    this.loadingService.setLoadingStatus(true);
    this.userIdbService.deleteDatabase();
  }

  openResetDatabaseModal() {
    this.showResetModal = true;
  }

  closeResetDatabaseModal() {
    this.showResetModal = false;
  }

  openSidebar(){
    this.sharedDataService.sidebarOpen.next(true);
  }
}
