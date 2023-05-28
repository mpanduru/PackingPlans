import {Injectable} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {TripActionsComponent} from "../trip-actions/trip-actions.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private scrollToHomePage = new Subject<void>();
  scrollToHomePage$ = this.scrollToHomePage.asObservable();

  private scrollToNavbar = new Subject<void>();
  scrollToNavbar$ = this.scrollToNavbar.asObservable();

  constructor(private dialog: MatDialog) {
  }

  triggerScrollToHowItWorks() {
    this.scrollToHomePage.next();
  }

  triggerScrollToNavbar() {
    this.scrollToNavbar.next();
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

  public openTripActionsDialog(trip: any): void {
    let dialogRef = this.dialog.open(TripActionsComponent, {
      width: '25%',
      height: '55%'
    });
    let instance = dialogRef.componentInstance;
    instance.trip = trip;
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

}
