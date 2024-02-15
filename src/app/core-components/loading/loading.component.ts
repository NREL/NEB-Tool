import { Component } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  loading: boolean;
  loadingSub: Subscription;
  loadingMessage: string;
  loadingMessageSub: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingSub = this.loadingService.loading.subscribe((value) => {
      this.loading = value;
    });

    this.loadingMessageSub = this.loadingService.loadingMessage.subscribe((value) => {
      this.loadingMessage = value;
    });
  }

  ngOnDestory() {
    this.loadingSub.unsubscribe();
    this.loadingMessageSub.unsubscribe();
  }




}
