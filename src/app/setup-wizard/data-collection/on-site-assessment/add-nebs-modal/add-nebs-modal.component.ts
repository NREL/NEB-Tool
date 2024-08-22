import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faCheck, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, faScaleUnbalancedFlip, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceMetric, KeyPerformanceMetricValue } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-add-nebs-modal',
  templateUrl: './add-nebs-modal.component.html',
  styleUrl: './add-nebs-modal.component.css'
})
export class AddNebsModalComponent {


  faWeightHanging: IconDefinition = faWeightHanging;
  faBullseye: IconDefinition = faBullseye;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faCheck: IconDefinition = faCheck;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faPlus: IconDefinition = faPlus;

  faChevronUp: IconDefinition = faChevronUp;
  faChevronDown: IconDefinition = faChevronDown;

  displayModal: boolean = false;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  assessment: IdbAssessment;
  energyOpportunity: IdbEnergyOpportunity;

  nebOptions: Array<NebOption>;
  numberSelected: number = 0;
  displayAllNebs: boolean = true;
  selectedNebs: Array<IdbNonEnergyBenefit>;
  nebSearchStr: string = '';
  orderByDir: 'asc' | 'desc' = 'asc';

  constructor(private setupWizardService: SetupWizardService, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService
  ) {
  }

  ngOnInit() {
    let modalData: { assessmentId: string, energyOpportunityId: string } = this.setupWizardService.displayAddNebsModal.getValue();
    this.assessment = this.assessmentIdbService.getByGuid(modalData.assessmentId);
    if (modalData.energyOpportunityId) {
      this.energyOpportunity = this.energyOpportunityIdbService.getByGuid(modalData.energyOpportunityId);
      this.selectedNebs = this.nonEnergyBenefitIdbService.getEnergyOpportunityNonEnergyBenefits(modalData.energyOpportunityId);
    } else {
      this.selectedNebs = this.nonEnergyBenefitIdbService.getAssessmentNonEnergyBenefits(this.assessment.guid);
    }

    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.setNebOptions();

    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  async addNebs() {
    let selectedNebs: Array<NebOption> = this.nebOptions.filter(option => {
      return option.selected
    });

    for (let i = 0; i < selectedNebs.length; i++) {
      let nebOption: NebOption = selectedNebs[i];
      let newIdbNonEnergyBenefit: IdbNonEnergyBenefit;
      let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.assessment.companyId);
      if (this.energyOpportunity) {
        newIdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.assessmentId, this.energyOpportunity.guid, nebOption, false);
        //add associated key performance metric impacts
        for (let x = 0; x < companyPerformanceMetrics.length; x++) {
          let metric: KeyPerformanceMetric = companyPerformanceMetrics[x];
          if (nebOption.KPM.indexOf(metric.value) != -1) {
            let performanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.guid, newIdbNonEnergyBenefit.guid, metric.value, this.energyOpportunity.assessmentId, metric.kpiGuid, metric.guid);
            await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.addWithObservable(performanceMetricImpact));
          }
        }
      } else {
        newIdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, nebOption, false);
        //add associated key performance metric impacts
        for (let x = 0; x < companyPerformanceMetrics.length; x++) {
          let metric: KeyPerformanceMetric = companyPerformanceMetrics[x];
          if (nebOption.KPM.indexOf(metric.value) != -1) {
            let performanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, undefined, newIdbNonEnergyBenefit.guid, metric.value, this.assessment.guid, metric.kpiGuid, metric.guid);
            await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.addWithObservable(performanceMetricImpact));
          }
        }
      }
      await firstValueFrom(this.nonEnergyBenefitIdbService.addWithObservable(newIdbNonEnergyBenefit));
    }
    await this.nonEnergyBenefitIdbService.setNonEnergyBenefits();
    await this.keyPerformanceMetricImpactsIdbService.setKeyPerformanceMetricImpacts();
    this.closeModal();
  }

  selectNeb(neb: NebOption) {
    neb.selected = !neb.selected;
    this.setNumberSelected();
  }

  setNumberSelected() {
    let numNebsSelected: number = 0;
    this.nebOptions.forEach(option => {
      if (option.selected) {
        numNebsSelected++
      }
    });
    this.numberSelected = numNebsSelected;
  }

  closeModal() {
    NebOptions.forEach(option => {
      option.selected = false;
    });
    this.setupWizardService.displayAddNebsModal.next(undefined);
  }


  setNebOptions() {
    let nebOptionsList: Array<NebOption> = new Array();
    let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.assessment.companyId);
    let allSelectedMetricValues: Array<KeyPerformanceMetricValue> = companyPerformanceMetrics.flatMap(metric => {
      return metric.value;
    });
    if (!this.displayAllNebs) {
      NebOptions.forEach(option => {
        if (allSelectedMetricValues.findIndex(value => { return option.KPM.includes(value) }) != -1) {
          nebOptionsList.push(option);
        }
      });
    } else {
      let selectedOptionValues = this.selectedNebs.map(option => {
        return option.nebOptionValue;
      })
      NebOptions.forEach(option => {
        if (!selectedOptionValues.includes(option.optionValue)) {
          nebOptionsList.push(option);
        }
      });
    }
    this.nebOptions = nebOptionsList;
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }

}
