import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPortfolioComponent } from './user-portfolio.component';

describe('UserPortfolioComponent', () => {
  let component: UserPortfolioComponent;
  let fixture: ComponentFixture<UserPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
