import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportBackupModalService {
  showImportModal: BehaviorSubject<boolean>;
  constructor() {
    this.showImportModal = new BehaviorSubject<boolean>(false);
   }
}
