import {Component, Input, OnInit} from '@angular/core';
import {TripService} from "../../services/tripService/trip.service";
import {Location} from '@angular/common';
import {ConfirmationDialogComponent} from "../confirmation-dialog-component/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../dialogService/dialog.service";
import {LocationService} from "../../services/locationService/location.service";
import {AuthService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-trip-actions',
  templateUrl: './trip-actions.component.html',
  styleUrls: ['./trip-actions.component.css']
})
export class TripActionsComponent implements OnInit {
  @Input() trip: any | undefined;
  tripLocation: any;
  editable = false;
  beforeEditTrip: any;
  locations: any[] = [];

  constructor(private authService: AuthService, private tripService: TripService, private location: Location, private dialog: MatDialog, public dialogService: DialogService, private locationService: LocationService) {
  }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe({
      next: locations => {
        this.locations = locations;
      },
      error: error => {
        console.log(error);
      }
    });
    this.locationService.getLocationByName(this.trip.location).subscribe({
      next: location => {
        this.tripLocation = location;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete this action?',
      width: '400px',
      height: '150px'
    });

    dialogRef.componentInstance?.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tripService.deleteTrip(this.trip.id).subscribe({
            next: response => {
              console.log(response);
              window.location.reload();
            },
            error: err => {
              console.log(err);
            }
          }
        );
      }
    });
  }

  onSeeActivitiesClick() {
    this.tripService.getTripActivities(this.trip.id).subscribe(
      data => {
        this.dialogService.openActivitiesDialog(data);
      }, err => {
        console.log(err);
      }
    )
  }

  onEdit() {
    this.beforeEditTrip = Object.assign({}, this.trip);
    this.editable = !this.editable;
  }

  cancelEdit() {
    console.log(this.beforeEditTrip);
    console.log(this.trip);
    this.trip.location = this.beforeEditTrip.location;
    this.trip.startDate = this.beforeEditTrip.startDate;
    this.trip.endDate = this.beforeEditTrip.endDate;
    console.log(this.trip);
    this.editable = !this.editable;
  }

  checkEdit() {
    this.tripService.editTrip(this.trip.id, this.trip.startDate, this.trip.endDate, this.trip.location).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
    this.editable = !this.editable;
    this.dialogService.closeDialog();
    this.dialogService.openTripActionsDialog(this.trip);
  }

  onShare() {
    this.dialogService.openShareDialog(this.trip.id);
  }

  onAllUsers() {
    this.authService.getAllUsers().subscribe({
      next: data => {
        this.dialogService.openAllUsersDialog(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
