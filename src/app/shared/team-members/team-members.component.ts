import { Component, Input, Output } from '@angular/core';
import { faContactBook, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { ContactContext, IdbContact } from 'src/app/models/contact';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent {
  @Input({ required: true })
  contextGuid: string;
  @Input({ required: true })
  contactContext: ContactContext;
  // @Input({ required: true })
  // selectedContact: IdbContact;
  // @Output('emitCancelContact')
  // emitCancelContact: EventEmitter<boolean> = new EventEmitter();
  @Input({ required: true })
  companyGuid: string;


  faContactBook: IconDefinition = faContactBook;
  faUser: IconDefinition = faUser;

  displayContactModal: boolean = false;
  viewContact: IdbContact;


  contacts: Array<IdbContact>;
  contactsSub: Subscription
  constructor(private contactIdbService: ContactIdbService){

  }

  ngOnInit(){
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy(){
    this.contactsSub.unsubscribe();
  }

  openContactModal(contact: IdbContact) {
    this.viewContact = contact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
  }
}
