import {Component, NgModule} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  loginForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder) {
  }
}

@Component({
  selector: 'app-login-button',
  template: `
    <button mat-raised-button (click)="openLoginDialog()" class="rounded">Register</button>
  `,
})
export class RegisterButtonComponent {

  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '50%',
      height: '60%'
    });
  }

}
