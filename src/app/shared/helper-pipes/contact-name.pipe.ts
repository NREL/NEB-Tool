import { Pipe, PipeTransform } from '@angular/core';
import { IdbContact } from 'src/app/models/contact';

@Pipe({
  name: 'contactName',
  pure: false
})
export class ContactNamePipe implements PipeTransform {

  transform(contactGuid: string, contacts: Array<IdbContact>): string {
    let contact: IdbContact = contacts.find(contact => {
      return contact.guid == contactGuid;
    });
    if(contact){
      return contact.name
    }
    return '';
  }

}
