import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { InputTypes, InputErrorMessages } from '../input/input.model';
import { JwtService } from '../jwt.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public inputTypes = InputTypes;

  public get emailErrorMsg() {
    let msg = '';
    if (this.signInForm.hasError('email', ['email'])) {
      msg = InputErrorMessages.invalidEmail;
    } else if (this.signInForm.hasError('required', ['email'])) {
      msg = InputErrorMessages.emptyInput;
    } else if (this.userNotFoundError) {
      msg = InputErrorMessages.noUserWithEmail;
    }

    return msg;
  }
  public get passErrorMsg() {
    let msg = '';
    if (this.signInForm.hasError('minlength', ['password'])) {
      msg = InputErrorMessages.invalidPass;
    } else if (this.signInForm.hasError('required', ['password'])) {
      msg = InputErrorMessages.emptyInput;
    } else if (this.userNotFoundError) {
      msg = InputErrorMessages.wrongPass;
    }

    return msg;
  }
  public get userNotFoundError(): boolean {
    return this.signInForm.hasError('notFound');
  }

  constructor(
    private _jwtService: JwtService,
    private _router: Router,
    private _route: ActivatedRoute,
    ) {}

  public ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormControl(false),
    });
  }

  public signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;
    this._jwtService.login(email, password).subscribe(
      () => {
      this._router.navigate(['/shop']);
    },
      (error) => {
      console.log(error);
      });

  }
}
