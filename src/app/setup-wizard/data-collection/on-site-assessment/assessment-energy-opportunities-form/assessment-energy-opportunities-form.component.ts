import { Component } from '@angular/core';
import { IconDefinition, faFileLines, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity, getNewIdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Component({
  selector: 'app-assessment-energy-opportunities-form',
  templateUrl: './assessment-energy-opportunities-form.component.html',
  styleUrl: './assessment-energy-opportunities-form.component.css'
})
export class AssessmentEnergyOpportunitiesFormComponent {
  faFileLines: IconDefinition = faFileLines;
  faPlus: IconDefinition = faPlus;

  energyOpportuntiesSub: Subscription;
  energyOpportunities: Array<IdbEnergyOpportunity>;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  assessmentEnergyOpportunityGuids: Array<string> = [];

  accordionIndex: number = 0;
  constructor(
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
      this.setAssessmentEnergyOpportunityGuids();
    });

    this.energyOpportuntiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(_energyOpportunities => {
      this.energyOpportunities = _energyOpportunities;
      this.setAssessmentEnergyOpportunityGuids();
    });
  }

  ngOnDestroy(){
    this.energyOpportuntiesSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }

  setAssessmentEnergyOpportunityGuids() {
    //only want to update opportunity list if changes made
    //otherwise forms get re-init when the list updates
    if (this.assessment && this.energyOpportunities) {
      let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid
      });
      let tmpAssessmentOpportunities: Array<string> = assessmentEnergyOpportunities.map(opp => {
        return opp.guid
      });
      if (tmpAssessmentOpportunities.length != this.assessmentEnergyOpportunityGuids.length) {
        this.assessmentEnergyOpportunityGuids = tmpAssessmentOpportunities;
      } else {
        let notEqual: boolean = false;
        for(let i = 0; i < this.assessmentEnergyOpportunityGuids.length; i++){
          if(tmpAssessmentOpportunities[i] != this.assessmentEnergyOpportunityGuids[i]){
            notEqual = true;
          }
        }
        this.assessmentEnergyOpportunityGuids = tmpAssessmentOpportunities;
      }
    } else {
      this.assessmentEnergyOpportunityGuids = [];
    }
  }

  async addEnergyOpportunity() {
    let newOpportunity: IdbEnergyOpportunity = getNewIdbEnergyOpportunity(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid);
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.filter(prj => {
      return prj.assessmentId == this.assessment.guid;
    });
    newOpportunity.name = 'Energy Opportunity #' + (assessmentEnergyOpportunities.length + 1);
    await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newOpportunity));
    await this.energyOpportunityIdbService.setEnergyOpportunities();
  }

  setAccordionIndex(num: number){
    this.accordionIndex = num;
  }
}
