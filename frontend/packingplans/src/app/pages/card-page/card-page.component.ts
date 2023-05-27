import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  planButtonPressed = false;
  selectedDateRange: DateRange<Date> | undefined;
  styles: MapTypeStyle[] = <MapTypeStyle[]>MapStyleJson;
  protected readonly Number = Number;

  constructor(private locationService: LocationService, private route: ActivatedRoute, private datepipe: DatePipe, private tripService: TripService, private _router: Router) {
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

  onSelectedRangeChange(dateRange: DateRange<Date>) {
    this.selectedDateRange = dateRange;
  }

  logDate(): void {
    console.log(this.datepipe.transform(this.selectedDateRange?.start, 'yyyy-MM-dd'))
    console.log(this.datepipe.transform(this.selectedDateRange?.end, 'yyyy-MM-dd'))
  }

  getStartDate() {
    if (this.selectedDateRange?.start) {
      return this.selectedDateRange.start;
    }
    return 1;
  }

  getEndDate() {
    if (this.selectedDateRange?.end) {
      return this.selectedDateRange.end;
    }
    return 1;
  }

  isDatesValid() {
    return this.getStartDate() != 1 && this.getEndDate() != 1;
  }

  getRouterLink() {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();

    return `/locations/${this.location.name}/trip/plan/${startDate}/${endDate}`;
  }
}
