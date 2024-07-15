import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersComponent } from './team-members.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { ContactModalComponent } from './contact-modal/contact-modal.component';



@NgModule({
  declarations: [
    TeamMembersComponent,
    ContactModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HelperPipesModule
  ],
  exports: [
    TeamMembersComponent
  ]
})
export class TeamMembersModule { }
