import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'hs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl!: string

  constructor(
    private authService: AuthenticationService,
    private router: Router, private route:
      ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl']
  }

  googleLoginHandler() {
    this.authService.loginWithGoogle().then(user => {
      this.redirect();
    });
  }

  facebookLoginHandler() {
    this.authService.loginWithFacebook().then(user => {
      this.redirect();
    });
  }

  loginHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const email = form.controls['email'].value;
    const password = form.controls['password'].value;

    this.authService.loginWithEmail(email, password)
      .then(user => {
        this.redirect();
      })
      .catch((err) => alert("Wrong user credentials."))
  }

  private redirect(): void {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl)
    } else {
      this.router.navigate(['/']);
    }
  }
}
