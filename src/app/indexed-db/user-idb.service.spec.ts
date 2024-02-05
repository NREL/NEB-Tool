import { TestBed } from '@angular/core/testing';

import { UserIdbService } from './user-idb.service';

describe('UserIdbService', () => {
  let service: UserIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
