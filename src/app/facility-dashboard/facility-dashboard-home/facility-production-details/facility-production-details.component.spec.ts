import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProductionDetailsComponent } from './facility-production-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FacilityProductionDetailsComponent', () => {
  let component: FacilityProductionDetailsComponent;
  let fixture: ComponentFixture<FacilityProductionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [FacilityProductionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityProductionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
