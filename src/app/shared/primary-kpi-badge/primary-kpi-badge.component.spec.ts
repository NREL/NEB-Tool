import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryKpiBadgeComponent } from './primary-kpi-badge.component';
import { KpiCategoryClassPipe } from './kpi-category-class.pipe';

describe('PrimaryKpiBadgeComponent', () => {
  let component: PrimaryKpiBadgeComponent;
  let fixture: ComponentFixture<PrimaryKpiBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryKpiBadgeComponent, KpiCategoryClassPipe]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryKpiBadgeComponent);
    component = fixture.componentInstance;
    component.kpiValue = 'strategicRelationshipImpact';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
