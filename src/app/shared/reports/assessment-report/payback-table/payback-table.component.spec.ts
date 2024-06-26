import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybackTableComponent } from './payback-table.component';

describe('PaybackTableComponent', () => {
  let component: PaybackTableComponent;
  let fixture: ComponentFixture<PaybackTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaybackTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaybackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
