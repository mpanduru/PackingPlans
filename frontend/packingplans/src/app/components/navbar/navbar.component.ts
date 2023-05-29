import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {DialogService} from "../dialogService/dialog.service";
import {AuthService} from "../../services/authService/auth.service";
import {UserService} from "../../services/userService/user.service";
import {StorageService} from "../../services/storageService/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;
  username?: string;

  constructor(private dialogService: DialogService, private authService: AuthService, private userService: UserService, private storageService: StorageService, private router: Router, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }

  ngAfterViewInit() {
    this.dialogService.scrollToNavbar$.subscribe(() => {
      this.scrollToNavbar();
    })
  }

  scrollToHowItWorks() {
    this.router.navigate(['/home']);
    this.dialogService.triggerScrollToHowItWorks();
  }

  public scrollToNavbar() {
    const element = this.elementRef.nativeElement.querySelector('#navbar');
    element.scrollIntoView({behavior: 'smooth'});
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
