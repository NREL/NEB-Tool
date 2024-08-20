import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricImpactFormComponent } from './performance-metric-impact-form.component';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { BehaviorSubject } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { PrimaryKpiBadgeModule } from 'src/app/shared/primary-kpi-badge/primary-kpi-badge.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { FormsModule } from '@angular/forms';

describe('PerformanceMetricImpactFormComponent', () => {
  let component: PerformanceMetricImpactFormComponent;
  let fixture: ComponentFixture<PerformanceMetricImpactFormComponent>;

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    getKeyPerformanceMetric: () => {
      return {
        baselineValue: 0,
        costPerValue: 0,
        baselineCost: 0,
        isCustom: false,
        kpiGuid: '',
        guid: '',   
        label: '',
        htmlLabel: '',
        value: 'TRIR',
        kpiValue: 'other',
        isQuantitative: true,    
      }
    }
  };

  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {
    keyPerformanceMetricImpacts: new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([]),
    getByGuid: () => {
      return getNewIdbKeyPerformanceMetricImpact('', '', '', '', '', 'TRIR', '', '', '')
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, PrimaryKpiBadgeModule, HelperPipesModule, FormsModule],
      declarations: [PerformanceMetricImpactFormComponent],
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricImpactFormComponent);
    component = fixture.componentInstance;
    component.impactGuid = '';
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', '', undefined, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
