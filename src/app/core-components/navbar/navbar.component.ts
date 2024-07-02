import { Component } from '@angular/core';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { LoadingService } from '../loading/loading.service';
import { IconDefinition, faHome, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { environment } from 'src/environments/environment';
import { ImportBackupModalService } from '../import-backup-modal/import-backup-modal.service';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  faHome: IconDefinition = faHome;
  faDownload: IconDefinition =faDownload;
  faUpload: IconDefinition = faUpload;

  version: string = environment.version;
  showResetModal: boolean = false;
  showImportModal: boolean = false;

  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private sharedDataService: SharedDataService,
    private importBackupModalService: ImportBackupModalService,
    private backupDataService: BackupDataService
  ) {}

  backupData() {
    this.backupDataService.backupData();
    // to do: update lastBackup property for selectedUser
    // let selectedUser = this.userIdbService.user.getValue();
  }

  openImportDataModel() {
    console.log('button clicked')
    this.importBackupModalService.showImportModal.next(true);
    console.log(this.importBackupModalService.showImportModal.getValue());
  }

  resetDatabase() {
    this.closeResetDatabaseModal();
    this.loadingService.setLoadingMessage('Resetting Database... This may take a moment. The page will refresh after the database is reset. If this takes more than a minute, refresh the page.');
    this.loadingService.setLoadingStatus(true);
    this.userIdbService.deleteDatabase();
  }

  openResetDatabaseModal() {
    this.showResetModal = true;
  }

  closeResetDatabaseModal() {
    this.showResetModal = false;
  }

  openSidebar(){
    this.sharedDataService.sidebarOpen.next(true);
  }
}
