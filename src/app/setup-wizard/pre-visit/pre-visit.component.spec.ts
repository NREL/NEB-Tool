import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreVisitComponent } from './pre-visit.component';

describe('PreVisitComponent', () => {
  let component: PreVisitComponent;
  let fixture: ComponentFixture<PreVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
