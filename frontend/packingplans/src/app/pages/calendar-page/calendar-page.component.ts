import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../components/dialogService/dialog.service";
import {TripService} from "../../services/tripService/trip.service";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  trips: any[] | undefined;

  Events: any[] = [];

  calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  constructor(private dialog: MatDialog, private dialogService: DialogService, private tripService: TripService) {
  }

  ngOnInit() {
    forwardRef(() => Calendar);

    this.tripService.getAllTrips().subscribe({
      next: trips => {
        this.trips = trips;
        this.addTripsToCalendar();
        console.log(this.Events);
        this.calendarOptions = {
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
          },
          selectable: false,
          events: this.Events,
          dayMaxEvents: true,
          eventClick: this.handleEventClick.bind(this),
        };
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleEventClick(arg: EventClickArg) {
    if (arg.event.end != null) {
      console.log(arg);
      this.dialogService.openTripActionsDialog();
    }
  }

  addTripsToCalendar() {
    if (this.trips)
      for (const trip of this.trips) {
        let event = {
          "title": trip.location,
          "start": trip.startDate,
          "end": trip.endDate,
          "display": "background"
        }
        this.Events.push(event);
        for (const a of trip.activities) {
          let activity = {
            "title": a.name,
            "startingHour": a.startTime,
            "start": a.day
          }
          this.Events.push(activity);
        }
      }
  }
}
