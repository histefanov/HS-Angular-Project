import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'hs-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css'],
  viewProviders: [MatExpansionPanel]
})
export class PostsDashboardComponent implements OnInit {

  title: string;
  image: string | null = null;
  content: string;

  btnText: string = "Create Post";

  uploadPercent: Observable<number | undefined>;
  downloadURL: Observable<string>;

  constructor(
    private authService: AuthenticationService,
    private blogService: BlogService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  createPost() {
    const data = {
      author: this.authService.authState.displayName || this.authService.authState.email,
      authorId: this.authService.currentUserId,
      title: this.title,
      content: this.content,
      image: this.image,
      published: new Date()
    }

    this.blogService.create(data as Post);

    this.title = '';
    this.content = '';
    this.btnText = 'Success!';
    setTimeout(() => (this.btnText = 'Create Post'), 2000);
  }

  async uploadImage(event: any) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;

    if (file.type.split('/')[0] !== 'image') {
      return alert('Only image files (.jpg, .png, etc.) are accepted');
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();

      await task;
      this.downloadURL = ref.getDownloadURL();
      this.downloadURL.subscribe(url => this.image = url);
    }
  }
}
