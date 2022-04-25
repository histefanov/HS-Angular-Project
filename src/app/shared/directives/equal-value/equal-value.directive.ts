import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgForm, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngModel] [hsEqualValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualValueDirective,
      multi: true
    }
  ]
})
export class EqualValueDirective implements Validator, OnDestroy {

  @Input() hsEqualValue = "";
  @Input() name!: string;
  otherControl!: AbstractControl;
  subscription!: Subscription;
  currentControl!: AbstractControl

  constructor(
    private form: NgForm
  ) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const otherControl = this.form.controls[this.hsEqualValue];

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = otherControl.valueChanges!.subscribe(() => {
      control.updateValueAndValidity({ onlySelf: true })
    });

    return control.value !== otherControl?.value ? {
      equalValue: {
        [this.hsEqualValue]: otherControl?.value,
        [this.name]: control.value
      }
    } : null
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
