import { TestBed } from '@angular/core/testing';

import { SetupWizardService } from './setup-wizard.service';
import { UserIdbService } from '../indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from '../models/user';
import { BehaviorSubject } from 'rxjs';

describe('SetupWizardService', () => {
  let service: SetupWizardService;

  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserIdbService, useValue: userIdbService }
      ]
    });
    service = TestBed.inject(SetupWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
