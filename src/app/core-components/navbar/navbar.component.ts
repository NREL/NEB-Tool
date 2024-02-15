import { Component } from '@angular/core';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  showResetModal: boolean = false;
  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService) {

  }

  resetDatabase() {
    this.closeResetDatabaseModal();
    this.loadingService.setLoadingMessage('Resetting Database...');
    this.loadingService.setLoadingStatus(true);
    // this.userIdbService.deleteDatabase();
  }

  openResetDatabaseModal() {
    this.showResetModal = true;
  }

  closeResetDatabaseModal() {
    this.showResetModal = false;
  }
}
