import {Component} from '@angular/core';
import {StorageService} from "./services/storageService/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  title = 'packingPlans';
  // eventBusSub?: Subscription;
  private roles: string[] = [];

  constructor(
    private storageService: StorageService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
    // this.eventBusSub = this.eventBusService.on('logout', () => {
    //   this.logout();
    // });
  }
}
