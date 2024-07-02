import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.component.html',
  styleUrl: './visit-report.component.css'
})
export class VisitReportComponent {

  faChevronLeft: IconDefinition = faChevronLeft;
  faFolderOpen: IconDefinition = faFolderOpen;

  onSiteVisit: IdbOnSiteVisit;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
  }

  goNext() {
    this.router.navigateByUrl('/facility/' + this.onSiteVisit.facilityId);
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/review-data-collection');
  }
}
