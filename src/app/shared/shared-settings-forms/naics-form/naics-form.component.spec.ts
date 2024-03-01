import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaicsFormComponent } from './naics-form.component';

describe('NaicsFormComponent', () => {
  let component: NaicsFormComponent;
  let fixture: ComponentFixture<NaicsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NaicsFormComponent]
    });
    fixture = TestBed.createComponent(NaicsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
