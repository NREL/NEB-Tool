import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelWithTooltipComponent } from './label-with-tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('LabelWithTooltipComponent', () => {
  let component: LabelWithTooltipComponent;
  let fixture: ComponentFixture<LabelWithTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [LabelWithTooltipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelWithTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
