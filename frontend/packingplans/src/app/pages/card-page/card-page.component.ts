import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
  @Input() location: any | undefined;

  ngOnInit() {
    this.location = {
      "name": "Paris",
      "imageUrl": "../../../assets/images/paris_image.jpg",
      "tags": ["fun", "romantic"],
      "description": "Paris is a beautiful place in France. You will love it there"
    }
  }
}
