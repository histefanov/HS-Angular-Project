import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { EmailSubscription } from 'src/app/features/home/models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subCollection: AngularFirestoreCollection<EmailSubscription>
  subs: EmailSubscription[];

  constructor(private afs: AngularFirestore) {
    this.subCollection = this.afs.collection<EmailSubscription>('email-subscriptions');
  }

  addSubscription(email: string): boolean {
    this.subCollection
      .valueChanges()
      .pipe()
      .subscribe((data) => this.subs = data);

    if (this.subs && this.subs.filter((s) => s.email == email).length == 0) {
      this.subCollection.add({ email });
      return true;
    }

    return false;
  }
}