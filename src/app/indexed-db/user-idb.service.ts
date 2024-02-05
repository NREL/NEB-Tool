import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class UserIdbService {

  user: BehaviorSubject<User>;
  constructor(private dbService: NgxIndexedDBService, private electronService: ElectronService) {
    this.user = new BehaviorSubject<User>(undefined);
  }

  getAll(): Observable<Array<User>> {
    return this.dbService.getAll('user');
  }

  getById(userId: number): Observable<User> {
    return this.dbService.getByKey('user', userId);
  }

  count() {
    return this.dbService.count('user');
  }

  addWithObservable(account: User): Observable<User> {
    return this.dbService.add('user', account);
  }

  updateWithObservable(user: User): Observable<User> {
    return this.dbService.update('user', user);
  }

  deleteUserWithObservable(userId: number): Observable<any> {
    return this.dbService.delete('user', userId);
  }

  // *WARNING* Can not be undone
  deleteDatabase() {
    try {
      this.dbService.deleteDatabase().subscribe(
        () => {
          console.log('database deleted..');
          this.finishDelete();
        },
        error => {
          console.log(error);
          this.finishDelete();
        }
      );
    } catch (err) {
      console.log('ERROR')
      console.log(err);
      this.finishDelete();
    }
  }

  finishDelete() {
    if (this.electronService.isElectron) {
      this.electronService.sendAppRelaunch();
    } else {
      location.reload()
    }
  }
}
