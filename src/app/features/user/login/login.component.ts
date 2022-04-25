import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'hs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticationService) { }

  loginHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const email = form.controls['email'].value;
    const password = form.controls['password'].value;

    this.authService.login(email, password);
  }
}
