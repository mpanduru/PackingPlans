import {Component} from '@angular/core';
import {DialogService} from "../dialogService/dialog.service";
import {AuthService} from "../../services/authService/auth.service";
import {UserService} from "../../services/userService/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dialogService: DialogService, private authService: AuthService, private userService: UserService) {
  }

  openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }


  tryUser(): void {
    this.userService.getUserBoard().subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
