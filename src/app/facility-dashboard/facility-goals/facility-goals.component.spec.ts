import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityGoalsComponent } from './facility-goals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FacilityGoalsComponent', () => {
  let component: FacilityGoalsComponent;
  let fixture: ComponentFixture<FacilityGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FontAwesomeModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
