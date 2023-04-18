import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})

export class LocationPageComponent implements OnInit {
  tags: any[] | undefined;
  allCards: any[] | undefined;
  filteredCards: any[] | undefined;

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
    ];

    this.allCards = [
      {
        title: "Paris",
        subtitle: "card1",
        tags: "beach please"
      },
      {
        title: "London",
        subtitle: "card2",
        tags: "mountain bike"
      },
      {
        title: "PaBuchrest",
        subtitle: "card3",
        tags: "road highway"
      },
      {
        title: "LonAltceva",
        subtitle: "card4",
        tags: "historical"
      }
    ];

    this.filteredCards = this.allCards;
  }

  searchCardsByName(name: string): void {
    if (this.allCards) {
      this.filteredCards = this.allCards.filter(card => card.title.toLowerCase().includes(name.toLowerCase()));
    }
  }
}
