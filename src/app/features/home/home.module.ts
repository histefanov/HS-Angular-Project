import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsletterFormComponent } from './components/newsletter-form/newsletter-form.component';
import { ServicesComponent } from './components/services/services.component';
import { TrainersComponent } from './components/trainers/trainers.component';



@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    NewsletterFormComponent,
    ServicesComponent,
    TrainersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
