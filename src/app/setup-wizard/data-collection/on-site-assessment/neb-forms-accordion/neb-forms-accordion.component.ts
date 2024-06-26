import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import * as _ from 'lodash';
import { IconDefinition, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-neb-forms-accordion',
  templateUrl: './neb-forms-accordion.component.html',
  styleUrl: './neb-forms-accordion.component.css'
})
export class NebFormsAccordionComponent {
  @Input()
  energyOpportunity: IdbEnergyOpportunity;
  @Input()
  assessment: IdbAssessment;

  faWeightHanging: IconDefinition = faWeightHanging;

  nebGuids: Array<string> = [];
  nonEnergyBenefitsSub: Subscription;
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  accordionIndex: number = 0;
  constructor(private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService) {

  }

  ngOnInit() {
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.nonEnergyBenefits = _nonEnergyBenefits;
      if (this.energyOpportunity) {
        this.setEnergyOpportunityNebGuids();
      } else if (this.assessment) {
        this.setAssessmentNebGuids();
      }
    });
  }

  ngOnDestroy() {
    this.nonEnergyBenefitsSub.unsubscribe();
  }

  setEnergyOpportunityNebGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.energyOpportunity && this.nonEnergyBenefits) {
      let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == this.energyOpportunity.guid
      });
      let tmpOpportunityNebs: Array<string> = energyOpportunityNebs.map(neb => {
        return neb.guid
      });
      if (tmpOpportunityNebs.length != this.nebGuids.length) {
        this.nebGuids = tmpOpportunityNebs;
      } else {
        let xor: Array<string> = _.xor(this.nebGuids, tmpOpportunityNebs)
        if (xor.length != 0) {
          this.nebGuids = tmpOpportunityNebs;
        }
      }
    } else {
      this.nebGuids = [];
    }

  }

  setAssessmentNebGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.assessment && this.nonEnergyBenefits) {
      let assessmentNebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId == undefined
      });
      let tmpAssessmentNebs: Array<string> = assessmentNebs.map(neb => {
        return neb.guid
      });
      if (tmpAssessmentNebs.length != this.nebGuids.length) {
        this.nebGuids = tmpAssessmentNebs;
      } else {
        let xor: Array<string> = _.xor(this.nebGuids, tmpAssessmentNebs)
        if (xor.length != 0) {
          this.nebGuids = tmpAssessmentNebs;
        }
      }
    } else {
      this.nebGuids = [];
    }
  }

  setAccordionIndex(index: number){
    this.accordionIndex = index;
  }
}
