import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsDashboardComponent } from './components/posts-dashboard/posts-dashboard.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { BlogRoutingModule } from './blog-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { PostCardComponent } from './components/post-card/post-card.component';


@NgModule({
  declarations: [
    PostsListComponent,
    PostDetailsComponent,
    PostsDashboardComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    RouterModule,
    MaterialModule
  ]
})
export class BlogModule { }
