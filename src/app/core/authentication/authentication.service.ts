import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log(res);
  }

  async logout() {
    await this.afAuth.signOut();
  }

  async userIsLoggedIn() {
    const user = await this.afAuth.currentUser;
    return !!user;
  }
}
