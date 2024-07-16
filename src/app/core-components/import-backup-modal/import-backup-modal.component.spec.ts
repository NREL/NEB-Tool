import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBackupModalComponent } from './import-backup-modal.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';

describe('ImportBackupModalComponent', () => {
  let component: ImportBackupModalComponent;
  let fixture: ComponentFixture<ImportBackupModalComponent>;

  beforeEach(async () => {
    let userDbService: Partial<UserIdbService> = {};
    let dbChangesService: Partial<DbChangesService> = {};
    let backupDataService: Partial<BackupDataService> = {};
    
    await TestBed.configureTestingModule({
      declarations: [ImportBackupModalComponent],
      providers: [
        { provide: UserIdbService, useValue: userDbService },
        { provide: BackupDataService, useValue: backupDataService},
        { provide: DbChangesService, useValue: dbChangesService}

      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportBackupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
