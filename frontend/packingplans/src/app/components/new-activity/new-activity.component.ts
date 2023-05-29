import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TripService} from "../../services/tripService/trip.service";
import {ActivityService} from "../../services/activityService/activity.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  trip: any | undefined;
  days: Date[] | undefined;
  activityName = '';
  activityDescription = '';
  activityStartTime: any | undefined;
  activityDay = new Date();


  constructor(private tripService: TripService,
              private activityService: ActivityService,
              private datePipe: DatePipe,
              public dialogRef: MatDialogRef<NewActivityComponent>,
              @Inject(MAT_DIALOG_DATA) public tripId: number,) {
  }

  ngOnInit() {
    this.tripService.getTripById(this.tripId).subscribe({
        next: data => {
          console.log(data);
          this.trip = data;
          this.enumerateDaysBetweenDates();
        }, error: err => {
          console.log(err);
        }
      }
    )
  }

  enumerateDaysBetweenDates() {
    let dates: Date[] = [];
    if (this.trip.startDate && this.trip.endDate) {
      let startDate = new Date(this.trip.startDate);
      let endDate = new Date(this.trip.endDate);

      while (startDate.getTime() <= endDate.getTime()) {
        let initDate = new Date(startDate);
        dates.push(initDate);
        startDate.setTime(startDate.getTime() + 24 * 60 * 60 * 1000); // adding one day
      }
    }

    this.days = dates;
  }

  onAdd() {
    let day: any = this.datePipe.transform(this.activityDay, 'yyyy-MM-dd');
    this.activityService.addActivity(this.activityName, this.activityDescription, this.activityStartTime, day, this.trip.id).subscribe(
      data => {
        console.log(data);
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }
}
