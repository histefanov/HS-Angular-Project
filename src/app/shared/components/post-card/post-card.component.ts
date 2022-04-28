import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BlogService } from 'src/app/features/blog/blog.service';
import { Post } from 'src/app/features/blog/models/post';

@Component({
  selector: 'hs-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;

  constructor(public auth: AuthenticationService, private blogService: BlogService) { }

  ngOnInit(): void {
  }

  delete(id: string | undefined) {
    const confirmed = confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      this.blogService.delete(id);
    }
  }
}
