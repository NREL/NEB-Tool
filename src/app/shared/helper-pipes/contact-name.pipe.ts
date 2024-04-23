import { Pipe, PipeTransform } from '@angular/core';
import { IdbContact } from 'src/app/models/contact';

@Pipe({
  name: 'contactName'
})
export class ContactNamePipe implements PipeTransform {

  transform(contactId: string, contacts: Array<IdbContact>): string {
    let contact: IdbContact = contacts.find(_contact => {
      return _contact.guid == contactId;
    })
    if (contact) {
      return contact.name;
    }
    return '';
  }

}
