import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {DialogService} from "../dialogService/dialog.service";
import {AuthService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  errorMessage = '';
  isSignUpFailed = false;
  registerForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-]).{8,}$/)]],
    confirmpassword: ['', [Validators.required, this.passwordValidator]]
  });

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService, private authService: AuthService) {
  }

  moveToLogin() {
    this.dialogService.closeRegisterDialog();
    this.dialogService.openLoginDialog();
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.controls.fullname.value || "",
      this.registerForm.controls.username.value || "",
      this.registerForm.controls.email.value || "",
      this.registerForm.controls.password.value || "").subscribe({
      next: data => {
        this.isSignUpFailed = false;
        this.dialogService.closeRegisterDialog();
      },
      error: err => {
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
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
