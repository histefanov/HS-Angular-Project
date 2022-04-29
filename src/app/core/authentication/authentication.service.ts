import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, FacebookAuthProvider, User } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  get currentUser$(): Observable<any> {
    return this.afAuth.authState;
  }

  loginWithGoogle() {
    return this.authLogin(new GoogleAuthProvider());
  }

  loginWithFacebook() {
    return this.authLogin(new FacebookAuthProvider());
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
    this.router.navigate(['home']);
  }

  async logout() {
    await this.afAuth.signOut();
  }

  async userIsLoggedIn() {
    const user = await this.afAuth.currentUser;
    return !!user;
  }

  private async authLogin(provider: GoogleAuthProvider | FacebookAuthProvider) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
      console.log('success!');
    } catch (error) {
      console.log('error');
    }
  }
}
