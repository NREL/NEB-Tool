import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './user-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserDashboardTabsComponent } from './user-dashboard-tabs/user-dashboard-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [UserDashboardComponent, UserDashboardTabsComponent]
    });
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
