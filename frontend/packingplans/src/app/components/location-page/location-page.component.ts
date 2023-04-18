import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})

export class LocationPageComponent implements OnInit {
  tags: any[] | undefined;

  cards: any[] | undefined;

  ngOnInit() {
    this.tags = [
      {
        name: "Tag1"
      },
      {
        name: "Tag2"
      },
      {
        name: "Tag3"
      }
    ]

    this.cards = [
      {
        title: "Card1",
        subtitle: "card1",
        information: "location: Romania, city: Bucharest"
      },
      {
        title: "Card2",
        subtitle: "card2",
        information: "location: Romania, city: Bucharest"
      },
      {
        title: "Card3",
        subtitle: "card3",
        information: "location: Romania, city: Bucharest"
      },
      {
        title: "Card4",
        subtitle: "card4",
        information: "location: Romania, city: Bucharest"
      }
    ]
  }
}
