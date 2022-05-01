import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { PostsDashboardComponent } from './features/blog/components/posts-dashboard/posts-dashboard.component';
import { PostsListComponent } from './features/blog/components/posts-list/posts-list.component';
import { PostDetailsComponent } from './features/blog/pages/post-details/post-details.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/user/login/login.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { RegisterComponent } from './features/user/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'home',
    redirectTo: ''
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'blog',
    component: PostsListComponent,
  },
  {
    path: 'blog/dashboard',
    pathMatch: 'full',
    component: PostsDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog/:id',
    component: PostDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
