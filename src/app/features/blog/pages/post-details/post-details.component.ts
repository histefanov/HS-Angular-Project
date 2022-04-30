import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BlogService } from '../../blog.service';
import { Post } from '../../models/post';

@Component({
  selector: 'hs-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Post | undefined
  editing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    public auth: AuthenticationService,
    private toast: HotToastService) { }

  ngOnInit(): void {
    this.getPost();
  }

  get postId(): string | null {
    return this.route.snapshot.paramMap.get('id')
  }

  enterEditMode(): void {
    this.editing = true;
  }

  getPost() {
    return this.blogService.getPostData(this.postId).subscribe(data => this.post = data);
  }

  update() {
    const formData = {
      title: this.post?.title,
      content: this.post?.content
    }

    this.blogService.update(this.postId!, formData);
    this.editing = false;
  }

  delete() {
    const confirmed = confirm('Are you sure you want to delete this post?');

    if (confirmed) {
      this.blogService.delete(this.postId as string | undefined);
      this.router.navigate(['/blog']);
    }
  }

  copyUrl() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        this.toast.success('URL copied to clipboard!');
      }).catch((err) => {
        this.toast.error('Could not copy url :(');
      })

  }
}
