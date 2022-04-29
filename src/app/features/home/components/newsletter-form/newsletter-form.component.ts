import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { SubscriptionService } from 'src/app/core/services/subscriptions.service';

@Component({
  selector: 'hs-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent implements OnInit {
  email: string;

  constructor(
    private subscriptionService: SubscriptionService,
    private toast: HotToastService) { }

  ngOnInit(): void {
  }

  signUp() {
    const isSuccessful = this.subscriptionService.addSubscription(this.email);

    if (!isSuccessful) {
      this.toast.error('Email is already subscribed', {
        id: 'error'
      });
    } else {
      this.toast.success('Thank you for subscribing!', {
        id: 'success'
      })
      this.email = '';
    }
  }
}
