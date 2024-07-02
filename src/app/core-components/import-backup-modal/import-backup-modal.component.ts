import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { BackupDataService, BackupFile } from 'src/app/shared/shared-services/backup-data.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { LoadingService } from '../loading/loading.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { ImportBackupModalService } from './import-backup-modal.service';

@Component({
  selector: 'app-import-backup-modal',
  templateUrl: './import-backup-modal.component.html',
  styleUrl: './import-backup-modal.component.css'
})
export class ImportBackupModalComponent implements OnInit{
  

  showImportModalSub: Subscription;
  showImportModal: boolean;
  importFile: any;
  importType: string;
  importFileError: string;
  importForUser: boolean = true;
  currentUser: IdbUser;
  importName: string;
  overwriteData: boolean = true;

  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private sharedDataService: SharedDataService,
    private backupDataService: BackupDataService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private importBackupModalService: ImportBackupModalService
  ) {

  }

  ngOnInit(): void {
    this.showImportModalSub = this.importBackupModalService.showImportModal.subscribe(value => {
      this.showImportModal = value;
      if (this.showImportModal) {
        // Load current user
        this.importFile = undefined;
        this.importFileError = undefined;
        this.importName = undefined;
        this.currentUser = this.userIdbService.user.getValue();
        if (!this.currentUser) {
          this.overwriteData = false;
        }
      }
    })
  }

  ngOnDestroy() {
    this.showImportModalSub.unsubscribe();
  }

  cancelImportBackup() {
    this.importBackupModalService.showImportModal.next(false);
    this.importFile = undefined;
    this.importFileError = undefined;
  }

  
  setImportFile(event: EventTarget) {
    let files: FileList = (event as HTMLInputElement).files;
    if (files) {
      if (files.length !== 0) {
        let fr: FileReader = new FileReader();
        fr.readAsText(files[0]);
        fr.onloadend = (e) => {
          try {
            this.importFile = JSON.parse(JSON.stringify(fr.result));
            let testBackup = JSON.parse(this.importFile)
            if (!testBackup.origin || testBackup.origin != "JUSTIFI") {
              this.importFileError = "Selected file does not come from JUSTIFI and cannot be imported."
            } else {
              this.importForUser = (testBackup.backupFileType == "User");
              // TO DO SAVE AS FACILITY
              //facility
              if (!this.importForUser) {
              //   this.importType = "Facility";
              //   if (this.selectedAccount) {
              //     this.backupName = testBackup.facility.name;
              //     if (this.accountFacilities.length != 0) {
              //       let testFacility: IdbFacility = this.accountFacilities.find(facility => { return this.backupName == facility.name });
              //       if (testFacility) {
              //         this.overwriteFacility = testFacility;
              //       } else {
              //         this.overwriteFacility = this.accountFacilities[0];
              //       }
              //     }
              //     this.backupFileError = undefined;
              //   } else {
              //     this.backupFileError = "You are trying to import a facility without an account created or selected. Select an account to import this facility into."
              //   }
              }
              //account
              else if (this.importForUser) {
                this.importType = "User"
                this.importName = testBackup.user.guid;
                this.importFileError = undefined;
                // if (!this.inFacility) {
                //   this.backupType = "Account"
                //   this.backupName = testBackup.account.name;
                //   this.backupFileError = undefined;
                // } else {
                //   this.backupFileError = "You are trying to import an account in the facility management page. Please use the account management section to import accounts.";
                // }
              }
            }
          } catch (err) {
            console.log(err);
          }
        };
      }
    }
  }

  async importBackupFile() {
    this.showImportModal = false;
    this.loadingService.setLoadingStatus(true);
    this.loadingService.setLoadingMessage("Importing backup file...")
    try {
      let tmpBackupFile: BackupFile = JSON.parse(this.importFile);
      if (this.importForUser) {
        if (this.overwriteData) {
          await this.importExistingAccount(tmpBackupFile);
        } else {
          await this.importNewAccount(tmpBackupFile);
        }
      // } else {
      //   if (this.overwriteData) {
      //     await this.importExistingFacility(tmpBackupFile);
      //   } else {
      //     await this.importNewFacility(tmpBackupFile)
      //   }
      }
      this.loadingService.setLoadingStatus(false);
      this.cancelImportBackup();
      this.router.navigateByUrl('user').then(() => location.reload());
    } catch (err) {
      console.log(err);
      alert('Error importing backup');
      // this.toastNotificationService.showToast('Error importing backup', 'There was an error importing this data file.', 15000, false, 'alert-danger');
      this.loadingService.setLoadingStatus(false);
    }
  }

  async importNewAccount(importFile: BackupFile) {
    // this.deleteDataService.pauseDelete.next(true);
    let newUser: IdbUser = await this.backupDataService.importUserBackupFile(importFile);
    await this.dbChangesService.updateUser(newUser);
    await this.dbChangesService.selectUser(newUser, false);
    // this.deleteDataService.pauseDelete.next(false);
    // this.deleteDataService.gatherAndDelete();
  }

  async importExistingAccount(importFile: BackupFile) {
    // //delete existing account and data
    // this.deleteDataService.pauseDelete.next(true);
    // this.selectedAccount.deleteAccount = true;
    // await firstValueFrom(this.accountDbService.updateWithObservable(this.selectedAccount));
    // let accounts: Array<IdbAccount> = await firstValueFrom(this.accountDbService.getAll());
    // this.accountDbService.allAccounts.next(accounts);
    // single user for now
    // delete existing user
    await this.dbChangesService.deleteCurrentUser(this.currentUser);
    await this.importNewAccount(importFile);
    // this.deleteDataService.pauseDelete.next(false);
    // this.deleteDataService.gatherAndDelete();
  }

}
