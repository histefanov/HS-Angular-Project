import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'hs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  registerHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const email = form.controls['email'].value;
    const password = form.controls['password'].value;

    this.authService.register(email, password)
  }
}
