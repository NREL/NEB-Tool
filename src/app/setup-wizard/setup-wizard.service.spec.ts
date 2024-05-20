import { TestBed } from '@angular/core/testing';

import { SetupWizardService } from './setup-wizard.service';
import { LocalStorageService } from 'ngx-webstorage';

describe('SetupWizardService', () => {
  let service: SetupWizardService;
  let localStorageService: Partial<LocalStorageService> = {
    retrieve: () => { return undefined },
    store: () => { return undefined },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageService }
      ]
    });
    service = TestBed.inject(SetupWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
