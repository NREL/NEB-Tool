import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationFormComponent } from './general-information-form.component';

describe('GeneralInformationFormComponent', () => {
  let component: GeneralInformationFormComponent;
  let fixture: ComponentFixture<GeneralInformationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInformationFormComponent]
    });
    fixture = TestBed.createComponent(GeneralInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
