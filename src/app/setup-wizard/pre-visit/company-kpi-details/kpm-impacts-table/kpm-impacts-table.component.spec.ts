import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpmImpactsTableComponent } from './kpm-impacts-table.component';

describe('KpmImpactsTableComponent', () => {
  let component: KpmImpactsTableComponent;
  let fixture: ComponentFixture<KpmImpactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpmImpactsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KpmImpactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
