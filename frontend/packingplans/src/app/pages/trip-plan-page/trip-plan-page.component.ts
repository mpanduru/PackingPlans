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
  activities: string[] = ['activity 1', 'activity 2', 'activity 3'];
  protected readonly Date = Date;

  constructor(public datePipe: DatePipe) {
  }

  ngOnInit() {
    this.selectedDateRange = new DateRange(new Date('2023-05-17T00:00:00'), new Date('2023-05-19T00:00:00'))
    this.selectedDay = this.selectedDateRange?.start;
    this.enumerateDaysBetweenDates();
  }

  onSelectedRangeChange(dateRange: DateRange<Date>) {
    this.selectedDateRange = dateRange;
  }

  addActivity() {
    const newActivity = 'New Activity';
    this.activities.push(newActivity);
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
}
