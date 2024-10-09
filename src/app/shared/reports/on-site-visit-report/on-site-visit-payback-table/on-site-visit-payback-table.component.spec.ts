import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitPaybackTableComponent } from './on-site-visit-payback-table.component';

describe('OnSiteVisitPaybackTableComponent', () => {
  let component: OnSiteVisitPaybackTableComponent;
  let fixture: ComponentFixture<OnSiteVisitPaybackTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnSiteVisitPaybackTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnSiteVisitPaybackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
