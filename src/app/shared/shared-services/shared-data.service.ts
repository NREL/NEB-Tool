import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  sidebarOpen: BehaviorSubject<boolean>;
  createAssessmentModalOpen: BehaviorSubject<boolean>;
  constructor() {
    this.createAssessmentModalOpen = new BehaviorSubject<boolean>(false);
    this.sidebarOpen = new BehaviorSubject<boolean>(false);
  }
}
