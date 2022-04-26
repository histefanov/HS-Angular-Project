import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsDashboardComponent } from './components/posts-dashboard/posts-dashboard.component';

const routes: Routes = [
  {
    path: 'blog',
    component: PostsListComponent
  },
  {
    path: 'blog/:id',
    component: PostDetailsComponent
  },
  {
    path: 'blog/dashboard',
    component: PostsDashboardComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class BlogRoutingModule { }
