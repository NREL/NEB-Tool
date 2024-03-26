import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGoalsComponent } from './company-goals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CompanyGoalsComponent', () => {
  let component: CompanyGoalsComponent;
  let fixture: ComponentFixture<CompanyGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
