import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbNonEnergyBenefit } from '../models/nonEnergyBenefit';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { KeyPerformanceMetric } from '../shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from '../shared/constants/nonEnergyBenefitOptions';

@Injectable({
  providedIn: 'root'
})
export class NonEnergyBenefitsIdbService {

  nonEnergyBenefits: BehaviorSubject<Array<IdbNonEnergyBenefit>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.nonEnergyBenefits = new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]);
  }

  async setNonEnergyBenefits() {
    let _nonEnergyBenefits: Array<IdbNonEnergyBenefit> = await firstValueFrom(this.getAll());
    this.nonEnergyBenefits.next(_nonEnergyBenefits);
  }

  getAll(): Observable<Array<IdbNonEnergyBenefit>> {
    return this.dbService.getAll('nonEnergyBenefit');
  }

  getById(id: number): Observable<IdbNonEnergyBenefit> {
    return this.dbService.getByKey('nonEnergyBenefit', id);
  }

  addWithObservable(nonEnergyBenefit: IdbNonEnergyBenefit): Observable<IdbNonEnergyBenefit> {
    return this.dbService.add('nonEnergyBenefit', nonEnergyBenefit);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('nonEnergyBenefit', id);
  }

  updateWithObservable(nonEnergyBenefit: IdbNonEnergyBenefit): Observable<IdbNonEnergyBenefit> {
    nonEnergyBenefit.modifiedDate = new Date();
    return this.dbService.update('nonEnergyBenefit', nonEnergyBenefit);
  }

  async asyncUpdate(nonEnergyBenefit: IdbNonEnergyBenefit) {
    nonEnergyBenefit = await firstValueFrom(this.updateWithObservable(nonEnergyBenefit));
    await this.setNonEnergyBenefits();
  }

  getByGuid(guid: string): IdbNonEnergyBenefit {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.getValue();
    return nonEnergyBenefits.find(neb => {
      return neb.guid == guid;
    })
  }

  getCompanyNonEnergyBenefits(companyGuid: string): Array<IdbNonEnergyBenefit> {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.getValue();
    return nonEnergyBenefits.filter(neb => {
      return neb.companyId == companyGuid;
    });
  }

  async updatePerformanceMetricBaseline(keyPerformanceIndicator: IdbKeyPerformanceIndicator, keyPerformanceMetric: KeyPerformanceMetric) {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.getCompanyNonEnergyBenefits(keyPerformanceIndicator.companyId);
    for (let i = 0; i < nonEnergyBenefits.length; i++) {
      let neb: IdbNonEnergyBenefit = nonEnergyBenefits[i];
      for (let p = 0; p < neb.performanceMetricImpacts.length; p++) {
        if (neb.performanceMetricImpacts[p].kpmValue == keyPerformanceMetric.value) {
          neb.performanceMetricImpacts[p].costAdjustment = (neb.performanceMetricImpacts[p].modificationValue * keyPerformanceMetric.costPerValue);
        }
      }
      await firstValueFrom(this.updateWithObservable(neb));
    }
    await this.setNonEnergyBenefits();
  }

  async addCompanyKpi(keyPerformanceIndicator: IdbKeyPerformanceIndicator) {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.getCompanyNonEnergyBenefits(keyPerformanceIndicator.companyId);
    for (let i = 0; i < nonEnergyBenefits.length; i++) {
      let neb: IdbNonEnergyBenefit = nonEnergyBenefits[i];
      let nebOption: NebOption = NebOptions.find(option => { return option.optionValue == neb.nebOptionValue });
      if (nebOption) {
        keyPerformanceIndicator.performanceMetrics.forEach(metric => {
          if (nebOption.KPM.indexOf(metric.value) != -1) {
            neb.performanceMetricImpacts.push({
              kpmValue: metric.value,
              modificationValue: undefined,
              costAdjustment: undefined
            });
          }
        });
      }
      await firstValueFrom(this.updateWithObservable(neb));
    }
    await this.setNonEnergyBenefits();
  }
}
