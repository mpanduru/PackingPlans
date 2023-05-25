import {Component, Input, OnInit} from '@angular/core';
import {TripService} from "../../services/tripService/trip.service";

@Component({
  selector: 'app-trip-actions',
  templateUrl: './trip-actions.component.html',
  styleUrls: ['./trip-actions.component.css']
})
export class TripActionsComponent implements OnInit {
  @Input() trip: any | undefined;

  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    console.log(this.trip);
  }

  onDeleteClick() {
    console.log(this.trip.id);
    this.tripService.deleteTrip(this.trip.id).subscribe({
        next: response => {
          console.log(response);
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }
}
