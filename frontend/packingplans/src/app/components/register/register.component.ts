import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {DialogService} from "../dialogService/dialog.service";
import {AuthService} from "../../services/authService/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  errorMessage = '';
  isSignUpFailed = false;
  registerForm = this.formBuilder.group({
    fullname: ['', [Validators.required, Validators.pattern(/^.{3,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.pattern(/^.{3,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-]).{8,}$/)]],
    confirmpassword: ['', [Validators.required, this.passwordValidator]]
  });

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  moveToLogin() {
    this.dialogService.closeDialog();
    this.dialogService.openLoginDialog();
  }

  openSnackBar(): void {
    this.snackBar.open('Your account has been successfully created!', 'Close', {
      duration: 6000,
      verticalPosition: 'top'
    });
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.controls.fullname.value || "",
      this.registerForm.controls.username.value || "",
      this.registerForm.controls.email.value || "",
      this.registerForm.controls.password.value || "").subscribe({
      next: data => {
        this.isSignUpFailed = false;
        this.moveToLogin();
        this.openSnackBar();
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
