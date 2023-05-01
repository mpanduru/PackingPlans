import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent {
  @Input() name: string | undefined;
  @Input() country: string | undefined;
  @Input() photoPath: string | undefined;
  @Input() tags: any[] | undefined;
}
