import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'hs-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post | undefined

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.getPost();
    console.log(this);
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.blogService.getPostData(id).subscribe(data => this.post = data);
  }
}
