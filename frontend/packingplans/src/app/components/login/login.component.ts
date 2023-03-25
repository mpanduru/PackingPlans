import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {DialogService} from "../dialogService/dialog.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService) {
  }

  moveToRegister() {
    this.dialogService.closeLoginDialog();
    this.dialogService.openRegisterDialog();
  }

  private passwordValidator(control: AbstractControl) {
    if (control.root.get('password')) {
      return control.root.get('password')?.value != control.value ?
        {passwordValidator: {value: control.value}} : null;
    }
    return null;
  }
}
