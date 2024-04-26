import { Pipe, PipeTransform } from '@angular/core';
import { ContactContext, IdbContact } from 'src/app/models/contact';

@Pipe({
  name: 'includesContact',
  pure: false
})
export class IncludesContactPipe implements PipeTransform {

  transform(guid: string, context: ContactContext, contact: IdbContact): boolean {
    if (context == 'processEquipment' && contact.processEquipmentIds.includes(guid)) {
      return true;
    } else if (context == 'assessment' && contact.assessmentIds.includes(guid)) {
      return true;
    } else if (context == 'facility' && contact.facilityIds.includes(guid)) {
      return true;
    } else if (context == 'company' && contact.companyId == guid) {
      return true;
    }
    return null;
  }
}
