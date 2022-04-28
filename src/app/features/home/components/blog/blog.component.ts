import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/features/blog/blog.service';
import { Post } from 'src/app/features/blog/models/post';

@Component({
  selector: 'hs-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Observable<Post[]>

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.posts = this.blogService.getLatestPosts();
  }

}
