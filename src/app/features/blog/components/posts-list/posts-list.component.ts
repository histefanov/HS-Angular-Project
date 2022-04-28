import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'hs-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: Observable<Post[]>

  constructor(private blogService: BlogService, auth: AuthenticationService) { }

  ngOnInit(): void {
    this.posts = this.blogService.getPosts();
    console.log(this);
  }

  delete(id: string | null) {
    this.blogService.delete(id as string);
  }

}
