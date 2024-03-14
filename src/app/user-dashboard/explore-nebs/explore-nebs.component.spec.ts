import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNEBsComponent } from './explore-nebs.component';

describe('ExploreNEBsComponent', () => {
  let component: ExploreNEBsComponent;
  let fixture: ComponentFixture<ExploreNEBsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreNEBsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreNEBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
