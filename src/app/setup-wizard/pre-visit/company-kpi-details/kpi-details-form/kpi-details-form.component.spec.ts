import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDetailsFormComponent } from './kpi-details-form.component';

describe('KpiDetailsFormComponent', () => {
  let component: KpiDetailsFormComponent;
  let fixture: ComponentFixture<KpiDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpiDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpiDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
