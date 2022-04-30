import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'hs-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  loading: boolean = true;
  pageNumber: number = 1;
  pageSize: number = 6;
  posts: Post[];
  pageSlice: Post[];
  disableNext: boolean = false;

  constructor(private blogService: BlogService) {
    this.blogService.getPosts().subscribe((data) => this.posts = data);
  }

  ngOnInit(): void {
    setTimeout(() => (this.OnPageChange()), 250);
  }

  OnPageChange() {
    let endIndex = this.pageNumber * this.pageSize;
    let startIndex = endIndex - this.pageSize;

    if (endIndex > this.posts.length) {
      endIndex = this.posts.length;
      this.disableNext = true;
    }

    this.pageSlice = this.posts.slice(startIndex, endIndex);
    this.loading = false;
  }

  pageUp() {
    this.pageNumber++;
    this.OnPageChange();
  }

  pageDown() {
    this.pageNumber--;
    this.disableNext = false;
    this.OnPageChange();
  }

  delete(id: string | null) {
    this.blogService.delete(id as string);
  }

}
