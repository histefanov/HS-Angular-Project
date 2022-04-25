import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(cred => {
      console.log(cred);
    })
  }

  register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
      console.log(cred);
    });
  }

  logout() {
    this.afAuth.signOut();
  }
}
