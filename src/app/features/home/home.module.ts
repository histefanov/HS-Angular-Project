import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsletterFormComponent } from './components/newsletter-form/newsletter-form.component';
import { ServicesComponent } from './components/services/services.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    NewsletterFormComponent,
    ServicesComponent,
    TrainersComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
