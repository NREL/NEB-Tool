import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricImpactFormComponent } from './performance-metric-impact-form.component';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { BehaviorSubject } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('PerformanceMetricImpactFormComponent', () => {
  let component: PerformanceMetricImpactFormComponent;
  let fixture: ComponentFixture<PerformanceMetricImpactFormComponent>;

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    getKeyPerformanceMetric: () => {
      return undefined
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [PerformanceMetricImpactFormComponent],
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricImpactFormComponent);
    component = fixture.componentInstance;
    component.performanceMetricImpact = {
      kpmValue: 'TRIR',
      modificationValue: undefined,
      costAdjustment: undefined
    };
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', '', undefined, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
