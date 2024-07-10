import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryKpiBadgeComponent } from './primary-kpi-badge.component';

describe('PrimaryKpiBadgeComponent', () => {
  let component: PrimaryKpiBadgeComponent;
  let fixture: ComponentFixture<PrimaryKpiBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryKpiBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryKpiBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
