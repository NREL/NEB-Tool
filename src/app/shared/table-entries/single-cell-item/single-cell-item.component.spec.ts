import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCellItemComponent } from './single-cell-item.component';

describe('SingleCellItemComponent', () => {
  let component: SingleCellItemComponent;
  let fixture: ComponentFixture<SingleCellItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleCellItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCellItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
