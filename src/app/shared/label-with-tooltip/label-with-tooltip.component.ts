import { Component, Input } from '@angular/core';
import { LabelTooltips } from './LabelTooltips';
import { faQuestionCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
declare var bootstrap: any;

@Component({
  selector: 'app-label-with-tooltip',
  templateUrl: './label-with-tooltip.component.html',
  styleUrl: './label-with-tooltip.component.css'
})
export class LabelWithTooltipComponent {
  @Input({required: true})
  field: string;
  @Input()
  label: string;
  @Input({required: true})
  labelId: string;

  @Input()
  isRequired: boolean;
  @Input()
  isBold: boolean;
  @Input()
  isSemiBold: boolean;
  @Input()
  isFloatRight: boolean;

  faQuestionCircle: IconDefinition = faQuestionCircle;

  helpTooltip: { tooltip: string };
  showTooltipHover: boolean = false;
  showTooltipClick: boolean = false;
  tooltipList: Array<any>;
  constructor() { }

  ngOnInit(): void {
    this.helpTooltip = LabelTooltips[this.field];
    if(!this.helpTooltip){
      this.helpTooltip = {
        tooltip: 'Help Text Missing. Sorry :/'
      }
    }
  }

  ngAfterViewInit(){
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    this.tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    }) 
  }

  ngOnDestroy(){
    for (const tooltip of this.tooltipList) {
      tooltip.dispose();
    }
    this.tooltipList = new Array<any>();
  }
  
  hideTooltipHover() {
    this.showTooltipHover = false;
  }

  displayTooltipHover() {
    this.showTooltipHover = true;
  }

  toggleClickTooltip(){
    this.showTooltipClick = !this.showTooltipClick;
  }
}
