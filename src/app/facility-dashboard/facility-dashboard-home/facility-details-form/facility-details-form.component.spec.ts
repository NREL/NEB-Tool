import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailsFormComponent } from './facility-details-form.component';

describe('FacilityDetailsFormComponent', () => {
  let component: FacilityDetailsFormComponent;
  let fixture: ComponentFixture<FacilityDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacilityDetailsFormComponent]
    });
    fixture = TestBed.createComponent(FacilityDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
