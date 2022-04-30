import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';
import { BlogService } from '../../blog/blog.service';
import { UserPost } from '../../blog/models/user-post';
import { ProfileUser } from '../models/user';

@Component({
  selector: 'hs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayName: string;
  user$: Observable<ProfileUser | null> = this.auth.currentUser$;
  posts: Observable<UserPost[]>;

  constructor(
    private auth: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private blogService: BlogService,
    private toast: HotToastService) { }

  ngOnInit(): void {
    this.posts = this.blogService.getUsersPosts(this.auth.currentUserId);
    console.log(this.posts);
  }

  uploadImage(event: any, { uid }: ProfileUser) {
    if (event.target.files[0].size / 1024 > 500) {
      alert('File is too large! Allowed size is up to 500KB');
      return;
    }

    this.imageUploadService.uploadImage(event.target.files[0], `avatars/${uid}`).pipe(
      this.toast.observe({
        loading: 'Uploading profile image...',
        success: 'Image uploaded successfully',
        error: 'There was an error in uploading the image',
      }),
      concatMap((photoURL) => this.auth.UpdateProfileData({ photoURL }))
    ).subscribe();
  }

  updateName() {
    this.auth.UpdateProfileData({ displayName: this.displayName }).then(() => {
      this.toast.success('You changed your display name successfully')
      this.displayName = '';
    }).catch(() => {
      this.toast.error('Something went wrong.');
    });
  }

  deletePost(id: string | undefined) {
    const confirmed = confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      this.blogService.delete(id as string | undefined);
    }
  }
}
