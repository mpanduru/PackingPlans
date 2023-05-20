import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {Calendar, CalendarOptions, EventClickArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {DateClickArg, EventDragStopArg} from '@fullcalendar/interaction';
import {FullCalendarComponent} from '@fullcalendar/angular';

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
      "start": "2023-05-01",
      "backgroundColor": "#222136"
    },
    {
      "id": "3",
      "title": "Vacation2",
      "start": "2023-05-01",
      "backgroundColor": "#222136"
    },
    {
      "id": "4",
      "title": "Vacation3",
      "start": "2023-05-02",
      "backgroundColor": "#222136"
    }
  ];

  calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  ngOnInit() {
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      selectable: true,
      events: this.Events,
      dayMaxEvents: true,
      dateClick: this.handleDateClick.bind(this),
      // eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
  }
}
