import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpmDetailsFormComponent } from './kpm-details-form.component';

describe('KpmDetailsFormComponent', () => {
  let component: KpmDetailsFormComponent;
  let fixture: ComponentFixture<KpmDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpmDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpmDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
