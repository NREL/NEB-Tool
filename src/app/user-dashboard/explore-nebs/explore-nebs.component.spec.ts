import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNEBsComponent } from './explore-nebs.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PrimaryKpiBadgeModule } from 'src/app/shared/primary-kpi-badge/primary-kpi-badge.module';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';

describe('ExploreNEBsComponent', () => {
  let component: ExploreNEBsComponent;
  let fixture: ComponentFixture<ExploreNEBsComponent>;
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperPipesModule, FontAwesomeModule, FormsModule, PrimaryKpiBadgeModule],
      declarations: [ExploreNEBsComponent],
      providers: [
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
      ]
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
