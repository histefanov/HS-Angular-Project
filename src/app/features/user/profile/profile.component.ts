import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'hs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any> = this.auth.authState;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.user$);
  }

}
