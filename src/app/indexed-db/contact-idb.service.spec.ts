import { TestBed } from '@angular/core/testing';

import { ContactIdbService } from './contact-idb.service';

describe('ContactIdbService', () => {
  let service: ContactIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
