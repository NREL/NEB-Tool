import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbUser } from 'src/app/models/user';

@Component({
  selector: 'app-user-dashboard-home',
  templateUrl: './user-dashboard-home.component.html',
  styleUrls: ['./user-dashboard-home.component.css']
})
export class UserDashboardHomeComponent {


  user: IdbUser;
  userSub: Subscription;
  constructor(private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService,
    private router: Router) {

  }

  ngOnInit() {
    this.userSub = this.userIdbService.user.subscribe(_user => {
      this.user = _user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async addCompany() {
    let newCompany: IdbCompany = getNewIdbCompany(this.user.guid);
    newCompany = await firstValueFrom(this.companyIdbService.addWithObservable(newCompany));
    await this.companyIdbService.setCompanies();
  }
}
