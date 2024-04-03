import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentIdbService } from '../indexed-db/assessment-idb.service';

@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrl: './assessment-dashboard.component.css'
})
export class AssessmentDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute, private assessmentIdbService: AssessmentIdbService,
    private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      let assessmentExists: boolean = this.assessmentIdbService.setSelectedFromGUID(assessmentGUID);
      if(!assessmentExists){
        this.router.navigateByUrl('/user');
      }
    });
  }
}
