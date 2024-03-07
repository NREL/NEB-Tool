import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent {

  user: IdbUser;
  userSub: Subscription;
  constructor(private userIdbService: UserIdbService) {
  }

  ngOnInit() {
    this.userSub = this.userIdbService.user.subscribe(_user => {
      this.user = _user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async saveChanges() {
    await this.userIdbService.asyncUpdate(this.user);
  }
}
