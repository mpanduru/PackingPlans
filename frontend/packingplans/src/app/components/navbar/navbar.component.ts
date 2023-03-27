import {Component, OnInit} from '@angular/core';
import {DialogService} from "../dialogService/dialog.service";
import {AuthService} from "../../services/authService/auth.service";
import {UserService} from "../../services/userService/user.service";
import {StorageService} from "../../services/storageService/storage.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  username?: string;

  constructor(private dialogService: DialogService, private authService: AuthService, private userService: UserService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }

  openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
