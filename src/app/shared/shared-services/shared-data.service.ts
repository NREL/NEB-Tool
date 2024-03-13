import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  sidebarOpen: BehaviorSubject<boolean>;
  constructor() {
    this.sidebarOpen = new BehaviorSubject<boolean>(false);
  }
}
