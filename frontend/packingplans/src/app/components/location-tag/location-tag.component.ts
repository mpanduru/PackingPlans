import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-location-tag',
  templateUrl: './location-tag.component.html',
  styleUrls: ['./location-tag.component.css']
})
export class LocationTagComponent {
  @Input() tagName: string | undefined;
}
