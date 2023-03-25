import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  registerForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-]).{8,}$/)]],
    confirmpassword: ['', [Validators.required, this.passwordValidator]]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.controls.fullname.value || "",
      this.registerForm.controls.username.value || "",
      this.registerForm.controls.email.value || "",
      this.registerForm.controls.password.value || "").subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private passwordValidator(control: AbstractControl) {
    if (control.root.get('password')) {
      return control.root.get('password')?.value != control.value ?
        {passwordValidator: {value: control.value}} : null;
    }
    return null;
  }
}

@Component({
  selector: 'app-register-button',
  template: ''
})
export class RegisterButtonComponent {

  constructor(private dialog: MatDialog) {
    this.openRegisterDialog();
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '50%',
      height: '70%'
    });
  }

}
