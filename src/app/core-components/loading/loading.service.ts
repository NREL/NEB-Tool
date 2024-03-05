import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: BehaviorSubject<boolean>;
  loadingMessage: BehaviorSubject<string>
    
  constructor() {
    this.loading  = new BehaviorSubject<boolean>(false);
    this.loadingMessage = new BehaviorSubject<string>("Loading...");
  }

  getLoadingStatus(): Observable<boolean> {
    return this.loading;
  }

  setLoadingStatus(value: boolean) {
    this.loading.next(value);
  }

  getLoadingMessage(): Observable<string> {
    return this.loadingMessage;
  }

  setLoadingMessage(value: string) {
    this.loadingMessage.next(value);
  }
}
