import {Component} from '@angular/core';
import {DialogService} from "../dialogService/dialog.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dialogService: DialogService) {
  }

  openLoginDialog(): void {
    this.dialogService.openLoginDialog();
  }
}
