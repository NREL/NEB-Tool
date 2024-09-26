import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPortfolioComponent } from './user-portfolio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LatestVisitsTableComponent } from './latest-visits-table/latest-visits-table.component';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { PortfolioSummaryCardComponent } from './portfolio-summary-card/portfolio-summary-card.component';

@NgModule({
  declarations: [
    UserPortfolioComponent,
    LatestVisitsTableComponent,
    PortfolioSummaryCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule
  ]
})
export class UserPortfolioModule { }
