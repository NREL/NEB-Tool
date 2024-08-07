import { Pipe, PipeTransform } from '@angular/core';
import { IdbContact } from 'src/app/models/contact';
import { ContactNameDisplayPipe } from './contact-name-display.pipe';

@Pipe({
  name: 'contactName',
  pure: false
})
export class ContactNamePipe implements PipeTransform {

  constructor(private contactDisplayPipe: ContactNameDisplayPipe) {}

  transform(contactGuid: string, contacts: Array<IdbContact>): string {
    let contact: IdbContact = contacts.find(contact => {
      return contact.guid == contactGuid;
    });
    return this.contactDisplayPipe.transform(contact);
  }

}
