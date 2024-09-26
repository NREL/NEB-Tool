import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPortfolioComponent } from './user-portfolio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    UserPortfolioComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class UserPortfolioModule { }
