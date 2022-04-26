import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'hs-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.css']
})
export class PostsDashboardComponent implements OnInit {

  title: string;
  image: string | null = null;
  content: string;

  constructor(private authService: AuthenticationService, private blogService: BlogService) { }

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

    this.blogService.create(data as Post)
  }

}
