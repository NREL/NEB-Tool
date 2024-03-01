import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryContactFormComponent } from './primary-contact-form.component';

describe('PrimaryContactFormComponent', () => {
  let component: PrimaryContactFormComponent;
  let fixture: ComponentFixture<PrimaryContactFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryContactFormComponent]
    });
    fixture = TestBed.createComponent(PrimaryContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
