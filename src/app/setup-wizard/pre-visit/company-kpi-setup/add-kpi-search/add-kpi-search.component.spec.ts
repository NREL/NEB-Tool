import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKpiSearchComponent } from './add-kpi-search.component';

describe('AddKpiSearchComponent', () => {
  let component: AddKpiSearchComponent;
  let fixture: ComponentFixture<AddKpiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKpiSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKpiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
