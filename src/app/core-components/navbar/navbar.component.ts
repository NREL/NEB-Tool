import { Component } from '@angular/core';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  showResetModal: boolean = false;
  constructor(private userIdbService: UserIdbService) {

  }

  resetDatabase() {
    this.userIdbService.deleteDatabase();
  }

  openResetDatabaseModal(){
    this.showResetModal = true;
  }

  closeResetDatabaseModal(){
    this.showResetModal = false;
  }
}
