import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardHomeActionsComponent } from './user-dashboard-home-actions.component';

describe('UserDashboardHomeActionsComponent', () => {
  let component: UserDashboardHomeActionsComponent;
  let fixture: ComponentFixture<UserDashboardHomeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboardHomeActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboardHomeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
