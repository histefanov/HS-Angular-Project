import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValueDirective } from './directives/equal-value/equal-value.directive';

@NgModule({
  declarations: [
    EqualValueDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualValueDirective
  ]
})
export class SharedModule { }
