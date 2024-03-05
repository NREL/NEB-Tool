import { Component } from '@angular/core';
import { IconDefinition, faHome } from '@fortawesome/free-solid-svg-icons';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faHome: IconDefinition = faHome;


  constructor(private userIdbService: UserIdbService) {

  }

  resetDatabase() {
    this.userIdbService.deleteDatabase();
  }
}
