import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/features/blog/blog.service';
import { Post } from 'src/app/features/blog/models/post';

@Component({
  selector: 'hs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Observable<Post[]>

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.posts = this.blogService.getLatestPosts();
  }

}
