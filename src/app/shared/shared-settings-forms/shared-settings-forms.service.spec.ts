import { TestBed } from '@angular/core/testing';

import { SharedSettingsFormsService } from './shared-settings-forms.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('SharedSettingsFormsService', () => {
  let service: SharedSettingsFormsService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService } // Provide the imported DBConfig
      ]
    });
    service = TestBed.inject(SharedSettingsFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
