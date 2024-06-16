import { TestBed } from '@angular/core/testing';

import { SharedSettingsFormsService } from './shared-settings-forms.service';

describe('SharedSettingsFormsService', () => {
  let service: SharedSettingsFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSettingsFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
