import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-trip-plan-page',
  templateUrl: './trip-plan-page.component.html',
  styleUrls: ['./trip-plan-page.component.css']
})
export class TripPlanPageComponent implements OnInit {
  selectedDateRange: DateRange<Date> | undefined;
  selectedDay: Date | null | undefined;
  days: Date[] | undefined;
  activities: any[] = [
    {
      "name": "test1",
      "description": "desc1",
      "startTime": "11:11"
    }
  ];
  hours: number[] = [];
  newActivityName = '';
  newActivityDescription = '';
  newActivityHour = '';
  protected readonly Date = Date;

  constructor(public datePipe: DatePipe) {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
  }

  ngOnInit() {
    this.selectedDateRange = new DateRange(new Date('2023-05-17T00:00:00'), new Date('2023-05-19T00:00:00'))
    this.selectedDay = this.selectedDateRange?.start;
    this.enumerateDaysBetweenDates();
  }

  onSelectedRangeChange(dateRange: DateRange<Date>) {
    this.selectedDateRange = dateRange;
    this.enumerateDaysBetweenDates();
  }

  addActivity() {
    if (this.newActivityName != '') {
      let activity = {
        "name": this.newActivityName,
        "description": this.newActivityDescription,
        "startTime": this.newActivityHour
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
}
