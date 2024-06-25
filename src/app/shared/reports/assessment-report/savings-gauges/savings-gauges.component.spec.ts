import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsGaugesComponent } from './savings-gauges.component';

describe('SavingsGaugesComponent', () => {
  let component: SavingsGaugesComponent;
  let fixture: ComponentFixture<SavingsGaugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingsGaugesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavingsGaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
