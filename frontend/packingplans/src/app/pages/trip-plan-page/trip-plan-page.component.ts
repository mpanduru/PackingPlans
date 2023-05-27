import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../../services/locationService/location.service";
import {TripService} from "../../services/tripService/trip.service";
import {ActivityService} from "../../services/activityService/activity.service";

@Component({
  selector: 'app-trip-plan-page',
  templateUrl: './trip-plan-page.component.html',
  styleUrls: ['./trip-plan-page.component.css']
})
export class TripPlanPageComponent implements OnInit {
  locationName: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  selectedDateRange: DateRange<Date> | undefined;
  selectedDay: Date | null | undefined;
  days: Date[] | undefined;
  activities: any[] = [];
  hours: number[] = [];
  newActivityName = '';
  newActivityDescription = '';
  newActivityHour = '';
  protected readonly Date = Date;

  constructor(private locationService: LocationService, public datePipe: DatePipe, private route: ActivatedRoute, private tripService: TripService, private activityService: ActivityService) {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.locationName = params['locationName'];
      this.selectedDateRange = new DateRange<Date>(new Date(params['startDate']), new Date(params['endDate']));
    });

    this.selectedDay = this.selectedDateRange?.start;
    this.enumerateDaysBetweenDates();
    console.log(this.selectedDay);
  }

  onSelectedRangeChange(dateRange: DateRange<Date>) {
    this.selectedDateRange = dateRange;
    this.enumerateDaysBetweenDates();
  }

  addActivity() {
    if (this.newActivityName != '' && this.newActivityHour != '') {
      let activity = {
        "name": this.newActivityName,
        "description": this.newActivityDescription,
        "startTime": this.newActivityHour,
        "day": this.datePipe.transform(this.selectedDay, 'yyyy-MM-dd')
      }
      this.activities.push(activity);
      this.sortActivities();
      this.newActivityName = '';
      this.newActivityDescription = '';
      this.newActivityHour = '';
    }
  }

  enumerateDaysBetweenDates() {
    let dates = [];
    if (this.selectedDateRange?.start && this.selectedDateRange?.end) {
      let startDate = new Date(this.selectedDateRange.start);
      let endDate = new Date(this.selectedDateRange.end);

      while (startDate.getTime() <= endDate.getTime()) {
        let initDate = new Date(startDate);
        dates.push(initDate);
        startDate.setTime(startDate.getTime() + 24 * 60 * 60 * 1000); // adding one day
      }
    }

    this.days = dates;
  }

  deleteActivity(activity: any) {
    const index = this.activities.findIndex(a => a === activity);
    if (index !== -1) {
      this.activities.splice(index, 1);
    }
  }

  sortActivities() {
    this.activities.sort((a, b) => {
      const [aHour, aMinute] = a.startTime.split(':').map(Number);
      const [bHour, bMinute] = b.startTime.split(':').map(Number);

      if (aHour !== bHour) {
        return aHour - bHour; // Sort by hour
      } else {
        return aMinute - bMinute; // Sort by minute if hours are equal
      }
    });
  }

  addTrip() {
    if (this.selectedDateRange) {
      this.tripService.addTrip(this.datePipe.transform(this.selectedDateRange.start, 'yyyy-MM-dd'),
        this.datePipe.transform(this.selectedDateRange.end, 'yyyy-MM-dd'),
        this.locationName).subscribe(
        data => {
          console.log(data);
          this.addAllActivities(data.id);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  addAllActivities(tripId: number) {
    // @ts-ignore
    let startDay = this.datePipe.transform(this.selectedDateRange.start, 'yyyy-MM-dd')
    // @ts-ignore
    let endDay = this.datePipe.transform(this.selectedDateRange.end, 'yyyy-MM-dd')
    for (let activity of this.activities) {
      // @ts-ignore
      if (activity.day >= startDay && activity.day <= endDay)
        this.activityService.addActivity(activity.name, activity.description, activity.startTime, activity.day, tripId).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
