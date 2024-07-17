import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, first, firstValueFrom } from 'rxjs';
import { IdbUser, getNewIdbUser } from '../models/user';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ElectronService } from '../electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class UserIdbService {

  //as of now, just one user
  user: BehaviorSubject<IdbUser>;
  constructor(private dbService: NgxIndexedDBService, private electronService: ElectronService) {
    this.user = new BehaviorSubject<IdbUser>(undefined);
  }

  async initializeData() {
    //should only have one user for now. Id for user = 1 from IDB;
    let _user: IdbUser = await firstValueFrom(this.getById(1));
    if (!_user) {
      //if no user initialize one
      _user = getNewIdbUser();
      _user = await firstValueFrom(this.addWithObservable(_user));
    }
    this.user.next(_user)
  }

  getAll(): Observable<Array<IdbUser>> {
    return this.dbService.getAll('user');
  }

  getById(userId: number): Observable<IdbUser> {
    return this.dbService.getByKey('user', userId);
  }

  count() {
    return this.dbService.count('user');
  }

  addWithObservable(user: IdbUser): Observable<IdbUser> {
    return this.dbService.add('user', user);
  }

  updateWithObservable(user: IdbUser): Observable<IdbUser> {
    user.modifiedDate = new Date();
    return this.dbService.update('user', user);
  }

  async asyncUpdate(_user: IdbUser): Promise<IdbUser> {
    _user = await firstValueFrom(this.updateWithObservable(_user));
    this.user.next(_user);
    return this.user.getValue();
  }

  deleteUserWithObservable(userId: number): Observable<any> {
    return this.dbService.delete('user', userId);
  }

  // *WARNING* Can not be undone
  async deleteDatabase() {
    try {
      this.dbService.deleteDatabase().subscribe(() => {
        console.log('database deleted..');
        this.finishDelete();
      });
    } catch (err) {
      console.log('ERROR')
      console.log(err);
      this.finishDelete();
    }
  }

  finishDelete() {
    //Refresh application on delete
    if (this.electronService.isElectron) {
      this.electronService.sendAppRelaunch();
    } else {
      location.reload()
    }
  }
}
