import { Component, Input } from '@angular/core';
import { faContactBook, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EquipmentType, EquipmentTypeOptions, EquipmentTypes } from 'src/app/shared/constants/equipmentTypes';
import { EnergyUnitOptions, ProcessCoolingUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from 'src/app/shared/constants/unitOptions';
import { UtilityOption, UtilityOptions, UtilityType, UtilityTypes } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Component({
  selector: 'app-energy-equipment-form',
  templateUrl: './energy-equipment-form.component.html',
  styleUrl: './energy-equipment-form.component.css'
})
export class EnergyEquipmentFormComponent {
  @Input({ required: true })
  energyEquipmentGuid: string;

  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  equipmentTypes: Array<EquipmentType> = EquipmentTypes;
  equipmentTypeOptions: Array<{ equipmentType: EquipmentType, utilityTypes: Array<UtilityType> }> = EquipmentTypeOptions;
  utilityOptions: Array<UtilityOption> = UtilityOptions;

  fuelVolumeUnitOptions:Array<UnitOption> = [...VolumeLiquidOptions, ...VolumeGasOptions];
  fuelEnergyUnitOptions: Array<UnitOption> = EnergyUnitOptions;

  processCoolingUnitOptions: Array<UnitOption> = ProcessCoolingUnitOptions

  convertValue: ConvertValue = new ConvertValue();

  energyEquipment: IdbEnergyEquipment
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  contactSub: Subscription;
  viewContact: IdbContact;
  displayContactModal: boolean = false;
  constructor(private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService
  ) { }

  ngOnInit() {
    this.energyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    this.contactSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }

  async industrialSystemChange() {
    let _utilityTypes = this.equipmentTypeOptions.find(
      option => option.equipmentType === this.energyEquipment.equipmentType
    )?.utilityTypes || [];
    if (!(_utilityTypes.includes(this.energyEquipment.utilityType)) || this.energyEquipment.utilityType) {
      this.energyEquipment.utilityType = _utilityTypes[0]; // Set to first utility type
    }
    await this.utilityTypeChange();
  }

  async utilityTypeChange() {
    if (this.energyEquipment.equipmentType === 'Process Cooling') { // Process Cooling unit changes
      if (!this.processCoolingUnitOptions.map(option => option.value).includes(this.energyEquipment.sizeUnit)) {
        this.energyEquipment.sizeUnit = this.processCoolingUnitOptions[0].value;
        await this.updateEnergyCalculations();
      } else {
        await this.saveChanges();
      }
    } else {
      let _utilityOption = this.utilityOptions.find(option => option.utilityType === this.energyEquipment.utilityType);
      let _unitOptions = _utilityOption.powerUnitOptions;
      if (!_unitOptions.map(option => option.value).includes(this.energyEquipment.sizeUnit)) {
        this.energyEquipment.sizeUnit = _unitOptions[0].value;
        await this.updateEnergyCalculations();
      } else {
        await this.saveChanges();
      }
    }
  }

  async updateEnergyCalculations() {
    this.autoCalculateFuelPower();
    await this.calculateAnnualEnergyUse();
  }

  autoCalculateFuelPower() {
    if (this.energyEquipment.utilityType === 'Other Fuels' && this.energyEquipment.autoCalculate) {
      let result = this.energyEquipment.fuelConsumption * this.energyEquipment.fuelHHV;
      let unitConv = this.convertValue.convertValue(1, this.energyEquipment.fuelEnergyUnit).convertedValue/
        this.convertValue.convertValue(1, this.energyEquipment.sizeUnit).convertedValue /3600; // J/hr to W
      result = result * unitConv;
      this.energyEquipment.size = Number(result.toFixed(3)); // Round to 3 decimal places
    }
  }

  async calculateAnnualEnergyUse() {
    let unitConv = this.convertValue.convertValue(1, this.energyEquipment.sizeUnit).convertedValue * 3600; // Wh to J
    unitConv = unitConv / this.convertValue.convertValue(1, 'kWh').convertedValue; // J to kWh (for now)
    this.energyEquipment.annualEnergyUse = this.energyEquipment.size * this.energyEquipment.operatingHours *
      (this.energyEquipment.loadFactor / 100) / (this.energyEquipment.efficiency / 100) * this.energyEquipment.numberOfEquipment *
      unitConv;
    if (!this.energyEquipment.annualEnergyUse || this.energyEquipment.annualEnergyUse === Infinity) {
      this.energyEquipment.annualEnergyUse = 0;
    }
    await this.saveChanges();
  }

  async saveChanges() {
    await this.energyEquipmentIdbService.asyncUpdate(this.energyEquipment);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteEquipment() {
    await this.dbChangesService.deleteEnergyEquipment(this.energyEquipment);
  }

  openContactModal(viewContact: IdbContact) {
    this.viewContact = viewContact;
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.displayContactModal = false;
    this.viewContact = undefined;
  }
}
