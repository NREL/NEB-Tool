import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunityNebsTableComponent } from './energy-opportunity-nebs-table.component';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { BehaviorSubject } from 'rxjs';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityNebsListPipe } from './energy-opportunity-nebs-list.pipe';
import { getNewIdbAssessment } from 'src/app/models/assessment';

describe('EnergyOpportunityNebsTableComponent', () => {
  let component: EnergyOpportunityNebsTableComponent;
  let fixture: ComponentFixture<EnergyOpportunityNebsTableComponent>;

  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };

  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyOpportunityNebsTableComponent, EnergyOpportunityNebsListPipe],
      providers: [
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyOpportunityNebsTableComponent);
    component = fixture.componentInstance;
    component.assessment = getNewIdbAssessment('', '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
