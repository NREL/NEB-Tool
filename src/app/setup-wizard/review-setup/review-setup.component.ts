import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-setup',
  templateUrl: './review-setup.component.html',
  styleUrl: './review-setup.component.css'
})
export class ReviewSetupComponent {

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {
  }

  goBack() {
    
  }

  async submit() {
    //TODO navigation from review setup..
  }
}
