import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/features/blog/models/post';

@Component({
  selector: 'hs-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
