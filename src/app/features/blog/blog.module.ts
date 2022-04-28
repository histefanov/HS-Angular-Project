import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsDashboardComponent } from './components/posts-dashboard/posts-dashboard.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { BlogRoutingModule } from './blog-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostsDashboardComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BlogRoutingModule,
    RouterModule,
  ]
})
export class BlogModule { }
