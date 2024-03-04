import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDetailsFormComponent } from './additional-details-form.component';

describe('AdditionalDetailsFormComponent', () => {
  let component: AdditionalDetailsFormComponent;
  let fixture: ComponentFixture<AdditionalDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalDetailsFormComponent]
    });
    fixture = TestBed.createComponent(AdditionalDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
