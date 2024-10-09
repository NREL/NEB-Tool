import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { IconDefinition, faFileLines, faPlus, faSearchPlus, faTrash, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { EnergyOpportunityType, FanOpportunities } from 'src/app/shared/constants/energyOpportunityOptions';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { firstValueFrom, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';

@Component({
  selector: 'app-energy-opportunity-setup-form',
  templateUrl: './energy-opportunity-setup-form.component.html',
  styleUrl: './energy-opportunity-setup-form.component.css'
})
export class EnergyOpportunitySetupFormComponent {
  @Input({ required: true })
  energyOpportunityGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();


  energyOpportunity: IdbEnergyOpportunity;

  faFileLines: IconDefinition = faFileLines;
  faTrash: IconDefinition = faTrash;
  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;

  opportunityTypes: Array<EnergyOpportunityType> = [{ value: 'other', label: 'Other' }];
  displayDeleteModal: boolean = false;
  showAddNebDropdown: boolean = false;

  companySub: Subscription;
  companyEnergyUnit: string;

  assessmentSub: Subscription;
  assessmentEnergyUses: Array<UtilityEnergyUse>;

  constructor(
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private dbChangesService: DbChangesService,
    private setupWizardService: SetupWizardService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private companyIdbService: CompanyIdbService,
    private assessmentIdbService: AssessmentIdbService,
  ) {
  }

  ngOnInit() {
    this.energyOpportunity = this.energyOpportunityIdbService.getByGuid(this.energyOpportunityGuid);
    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      this.companyEnergyUnit = company.companyEnergyUnit;
    });
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessmentEnergyUses = assessment.utilityEnergyUses;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.emitInitialized.emit(true);
  }

  async deleteEnergyOpportunity() {
    await this.dbChangesService.deleteEnergyOpportunity(this.energyOpportunity)
    this.closeDeleteModal();
  }

  async changeUtilityType() {
    let energyUse = this.assessmentEnergyUses.find(use => 
      use.utilityType === this.energyOpportunity.utilityType);
      let selectedUtilityOption = UtilityOptions.find(
        _option => _option.utilityType == this.energyOpportunity.utilityType);
    let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
        _unitOption => _unitOption.value == energyUse.energyUnit);
    if (selectedUtilityOption.isStandardEnergyUnit 
        && selectedUnitOption.isStandard !== false) { // Standard unit
        this.energyOpportunity.energyUnit = energyUse.energyUnit;
    } else { // Non-standard unit
        this.energyOpportunity.energyUnit = energyUse.energyUnitStandard;
    }
    await this.saveEnergyOpportunity();
  }

  async saveEnergyOpportunity() {
    await this.energyOpportunityIdbService.asyncUpdate(this.energyOpportunity);
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  showSuggestedNEBs() {
    this.showAddNebDropdown = false;
    this.setupWizardService.displayAddNebsModal.next({
      assessmentId: this.energyOpportunity.assessmentId,
      energyOpportunityId: this.energyOpportunity.guid
    });
  }

  async addNEB() {
    this.showAddNebDropdown = false;
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.assessmentId, this.energyOpportunity.guid, undefined, true);
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  toggleAddNebDropdown() {
    this.showAddNebDropdown = !this.showAddNebDropdown;
  }

}
