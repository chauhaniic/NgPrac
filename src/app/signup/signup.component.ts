import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}
  signupForm: FormGroup;
  invalidNamesArr: string[] = ['hello', 'angular'];
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      user_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        this.invalidUserNameValidation.bind(this),
      ]),
      passwordGroup: new FormGroup(
        {
          user_password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
          ]),
          user_cpassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
          ]),
        },
        [this.matchPasswords.bind(this)]
      ),

      user_phone: new FormControl(null),
      user_notification: new FormControl('email'),
    });
    this.signupForm
      .get('user_notification')
      .valueChanges.subscribe((x) => this.setNotificationValidation(x));
  }
  onSignup() {
    console.log(this.signupForm.value);
  }
  invalidUserNameValidation(
    control: AbstractControl
  ): { [key: string]: boolean } {
    if (this.invalidNamesArr.indexOf(control.value) >= 0) {
      return { invalidName: true };
    }
    return null;
  }
  matchPasswords(control: AbstractControl): { [key: string]: boolean } {
    if (
      control.get('user_password').value != control.get('user_cpassword').value
    ) {
      return { passwordMatchError: true };
    }
    return null;
  }
  setNotificationValidation(value: string) {
    const phoneControl = this.signupForm.get('user_phone');
    const emailControl = this.signupForm.get('user_email');
    if (value == 'phone') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
      emailControl.setValidators(Validators.email);
    } else {
      emailControl.setValidators([Validators.required, Validators.email]);
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  }
  /*   setNotificationValidation(value: string) {
    const phoneControl = this.signupForm.get('user_phone');
    const emailControl = this.signupForm.get('user_email');
    if (value == 'phone') {
      phoneControl.setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
      emailControl.clearValidators();
    } else {
      emailControl.setValidators([Validators.required, Validators.email]);
      phoneControl.clearValidators();
    }
  } */
}
