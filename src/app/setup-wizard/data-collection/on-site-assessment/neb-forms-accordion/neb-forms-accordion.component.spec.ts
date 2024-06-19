import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebFormsAccordionComponent } from './neb-forms-accordion.component';

describe('NebFormsAccordionComponent', () => {
  let component: NebFormsAccordionComponent;
  let fixture: ComponentFixture<NebFormsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NebFormsAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NebFormsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
