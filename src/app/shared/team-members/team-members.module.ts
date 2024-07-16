import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersComponent } from './team-members.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { TableEntriesModule } from '../table-entries/table-entries.module';



@NgModule({
  declarations: [
    TeamMembersComponent,
    ContactModalComponent,
    ContactCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HelperPipesModule,
    TableEntriesModule
  ],
  exports: [
    TeamMembersComponent
  ]
})
export class TeamMembersModule { }
