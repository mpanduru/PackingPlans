import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() photoPath: string | undefined;
  @Input() information: string | undefined;
}