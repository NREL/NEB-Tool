import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSummaryCardComponent } from './contact-summary-card.component';

describe('ContactSummaryCardComponent', () => {
  let component: ContactSummaryCardComponent;
  let fixture: ComponentFixture<ContactSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactSummaryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
