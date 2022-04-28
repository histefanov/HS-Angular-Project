import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValueDirective } from './directives/equal-value/equal-value.directive';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
  declarations: [
    EqualValueDirective,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    EqualValueDirective,
    PostCardComponent
  ]
})
export class SharedModule { }
