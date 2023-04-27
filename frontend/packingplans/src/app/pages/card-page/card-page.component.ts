import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationService} from "../../services/locationService/location.service";

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
  id: number | undefined;
  location: any | undefined;
  protected readonly Number = Number;

  constructor(private locationService: LocationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    console.log(this.id);

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
}
