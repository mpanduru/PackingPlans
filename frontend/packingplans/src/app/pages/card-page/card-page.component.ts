import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../../services/locationService/location.service";
import {DateRange} from "@angular/material/datepicker";
import {MapTypeStyle} from "@agm/core";
import MapStyleJson from "../../../assets/styles/mapstyle.json"
import {DatePipe} from "@angular/common";
import {TripService} from "../../services/tripService/trip.service";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
  id: number | undefined;
  location: any | undefined;
  selectedDateRange: DateRange<Date> | undefined;
  styles: MapTypeStyle[] = <MapTypeStyle[]>MapStyleJson;
  protected readonly Number = Number;

  constructor(private locationService: LocationService, private route: ActivatedRoute, private datepipe: DatePipe, private tripService: TripService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    if (this.id) {
      this.locationService.getLocationById(this.id).subscribe({
        next: location => {
          this.location = location;
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  newTrip() {
    if (this.selectedDateRange) {
      this.tripService.addTrip(this.datepipe.transform(this.selectedDateRange.start, 'yyyy-MM-dd'),
        this.datepipe.transform(this.selectedDateRange.end, 'yyyy-MM-dd'),
        this.location.name).subscribe(
        data => {
          console.log(data);
        }
      )
    }
  }

  onSelectedRangeChange(dateRange: DateRange<Date>) {
    this.selectedDateRange = dateRange;
  }

  logDate(): void {
    console.log(this.datepipe.transform(this.selectedDateRange?.start, 'yyyy-MM-dd'))
    console.log(this.datepipe.transform(this.selectedDateRange?.end, 'yyyy-MM-dd'))
  }
}
