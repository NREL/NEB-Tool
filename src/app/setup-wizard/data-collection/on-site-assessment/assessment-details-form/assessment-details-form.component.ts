import { Component } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { Subscription } from 'rxjs';
import { ProcessEquipment } from 'src/app/shared/constants/processEquipment';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';

@Component({
  selector: 'app-assessment-details-form',
  templateUrl: './assessment-details-form.component.html',
  styleUrl: './assessment-details-form.component.css'
})
export class AssessmentDetailsFormComponent {
  
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  processEquipmentOptions: Array<ProcessEquipment>;
  isFormChange: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) { }

  ngOnInit() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    this.processEquipmentOptions = facility.processEquipment;

    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      if(!this.isFormChange){
        this.assessment = _assessment;
      }else{
        this.isFormChange = false;
      }
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }

  async saveChanges() {
    this.assessmentIdbService.asyncUpdate(this.assessment);
  }
}
