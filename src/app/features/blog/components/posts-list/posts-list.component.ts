import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'hs-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  loading: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 6;
  posts: Observable<Post[]>;
  pageSlice: Post[];
  disableNext: boolean = false;
  startIndex: number = 0;

  constructor(private blogService: BlogService) {
    this.posts = this.blogService.getPosts();
  }

  ngOnInit(): void {
    setTimeout(() => (this.OnPageChange()), 250);
  }

  OnPageChange() {
    // let endIndex = this.pageNumber * this.pageSize;
    // let startIndex = endIndex - this.pageSize;

    // if (endIndex > this.posts.length) {
    //   endIndex = this.posts.length;
    //   this.disableNext = true;
    // }

    // this.pageSlice = this.posts.slice(startIndex, endIndex);
    // this.loading = false;
  }

  pageUp() {
    this.startIndex = ++this.pageNumber * this.pageSize;
    this.OnPageChange();
  }

  pageDown() {
    this.startIndex = --this.pageNumber * this.pageSize;
    this.disableNext = false;
    this.OnPageChange();
  }

  delete(id: string | null) {
    this.blogService.delete(id as string);
  }

}
