import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../components/dialogService/dialog.service";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  Events: any[] = [
    {
      "id": "1",
      "title": "Vacation",
      "start": "2023-05-01",
      "end": "2023-05-10",
      "display": "background",
      "url": "https://google.com",
      "textColor": "white"
    },
    {
      "id": "2",
      "title": "Vacation1",
      "start": "2023-05-01"
    },
    {
      "id": "3",
      "title": "Vacation2",
      "start": "2023-05-01"
    },
    {
      "id": "4",
      "title": "Vacation3",
      "start": "2023-05-02",
      "startingHour": "10:00"
    },
    {
      "id": "5",
      "title": "Vacation4",
      "start": "2023-05-02",
      "startingHour": "09:00"
    }
  ];

  calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  constructor(private dialog: MatDialog, private dialogService: DialogService,) {
  }

  ngOnInit() {
    forwardRef(() => Calendar);

    this.calendarOptions = {
      timeZone: 'UTC',
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      selectable: false,
      events: this.Events,
      dayMaxEvents: true,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      },
      eventClick: this.handleEventClick.bind(this),
    };
  }

  handleEventClick(arg: EventClickArg) {
    if (arg.event.end != null) {
      console.log(arg);
      this.dialogService.openLoginDialog();
    }
  }
}
