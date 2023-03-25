import {Injectable} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '50%',
      height: '55%'
    });
  }

  public openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: '50%',
      height: '70%'
    })
  }

  public closeLoginDialog(): void {
    this.dialog.closeAll();
  }

  public closeRegisterDialog(): void {
    this.dialog.closeAll();
  }
}
