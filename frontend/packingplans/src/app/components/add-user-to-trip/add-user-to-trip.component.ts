import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/authService/auth.service";
import {TripService} from "../../services/tripService/trip.service";
import {DialogService} from "../dialogService/dialog.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-to-trip',
  templateUrl: './add-user-to-trip.component.html',
  styleUrls: ['./add-user-to-trip.component.css']
})
export class AddUserToTripComponent implements OnInit {
  users: any[] | undefined;
  username = '';

  constructor(private authService: AuthService, private tripService: TripService, private dialogService: DialogService,
              @Inject(MAT_DIALOG_DATA) public tripId: number) {
  }

  ngOnInit() {
    this.authService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onCheck(userId: number) {
    this.tripService.addUserToTrip(this.tripId, userId).subscribe({
      next: data => {
        console.log(data);
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getUserId() {
    const user = this.users?.find(user => user.username === this.username);
    if (user) {
      return user.id;
    }
    return 1;
  }
}
