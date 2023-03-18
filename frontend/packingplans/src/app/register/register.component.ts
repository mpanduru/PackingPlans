import {Component, NgModule} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
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
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-]).{8,}$/)]],
    confirmpassword: ['', [Validators.required, this.passwordValidator]]
  });

  private passwordValidator(control: AbstractControl) {
    if (control.root.get('password')){
      return control.root.get('password')?.value != control.value ?
        { passwordValidator: {value: control.value}} : null;
    }
    return null;
  }



  constructor(private formBuilder: FormBuilder) {
  }
}

@Component({
  selector: 'app-register-button',
  template: `
    <button mat-raised-button (click)="openLoginDialog()" class="rounded">Register</button>
  `,
})
export class RegisterButtonComponent {

  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '50%',
      height: '70%'
    });
  }

}
