import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardHomeComponent } from './user-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDashboardHomeComponent', () => {
  let component: UserDashboardHomeComponent;
  let fixture: ComponentFixture<UserDashboardHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserDashboardHomeComponent]
    });
    fixture = TestBed.createComponent(UserDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
