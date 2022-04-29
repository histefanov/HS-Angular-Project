import { Component, OnInit } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';
import { ProfileUser } from '../models/user';

@Component({
  selector: 'hs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$: Observable<ProfileUser | null> = this.auth.currentUser$;

  constructor(private auth: AuthenticationService, private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
    this.user$.subscribe((data) => console.log(data));
  }

  uploadImage(event: any, { uid }: ProfileUser) {
    if (event.target.files[0].size / 1024 > 500) {
      alert('File is too large! Allowed size is up to 500KB');
      return;
    }

    this.imageUploadService.uploadImage(event.target.files[0], `avatars/${uid}`).pipe(
      concatMap((photoURL) => this.auth.UpdateProfileData({ photoURL }))
    ).subscribe();
  }
}
