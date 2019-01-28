import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  InputErrorMessages,
  InputTypes,
} from '../shared-components/input/input.model';

@Component({
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  public restoreForm: FormGroup;
  public inputTypes = InputTypes;

  constructor() {}

  public ngOnInit() {
    this.restoreForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  public get emailErrorMsg() {
    let msg = '';
    if (this.restoreForm.hasError('email', ['email'])) {
      msg = InputErrorMessages.invalidEmail;
    } else if (this.restoreForm.hasError('required', ['email'])) {
      msg = InputErrorMessages.emptyInput;
    } else if (this.userNotFoundError) {
      msg = InputErrorMessages.noUserWithEmail;
    }

    return msg;
  }

  public get userNotFoundError(): boolean {
    return this.restoreForm.hasError('notFound');
  }
}
