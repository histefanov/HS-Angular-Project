import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { GoogleAuthProvider, FacebookAuthProvider, UserInfo } from "firebase/auth";
import { concatMap, from, Observable, of, tap } from 'rxjs';
import { ProfileUser } from 'src/app/features/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState: any = null;
  currentUser$: Observable<ProfileUser | null>;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private toast: HotToastService) {
    this.afAuth.authState.subscribe(data => this.authState = data);
    this.currentUser$ = this.afAuth.authState as Observable<ProfileUser | null>;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
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

  async UpdateProfileData(profileData: Partial<UserInfo>) {
    const user = await this.afAuth.currentUser;

    if (!user) {
      this.router.navigate(['login']);
    }

    return of(user?.updateProfile(profileData));
  }

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['home']);
    } catch (err) {
      this.toast.error('A user with this email already exists.', {
        id: 'existing-user'
      });
    }
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
    } catch (error) {
      this.toast.error('Invalid credentials');
    }
  }
}
