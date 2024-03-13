import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardTabsComponent } from './user-dashboard-tabs.component';

describe('UserDashboardTabsComponent', () => {
  let component: UserDashboardTabsComponent;
  let fixture: ComponentFixture<UserDashboardTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboardTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboardTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
