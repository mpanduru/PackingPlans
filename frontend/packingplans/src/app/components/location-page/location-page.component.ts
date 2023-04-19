import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.css']
})

export class LocationPageComponent implements OnInit {
  tags: any[] | undefined;
  allCards: any[] | undefined;
  searchFilteredCards: any[] | undefined;
  tagFilteredCards: any[] | undefined;
  filteredCards: any[] | undefined;
  activeTags: string[] = [];

  ngOnInit() {
    this.tags = [
      {
        name: "mountain"
      },
      {
        name: "beach"
      },
      {
        name: "bike"
      }
    ];

    this.allCards = [
      {
        title: "Paris",
        subtitle: "card1",
        tags: ["beach", "bike"]
      },
      {
        title: "London",
        subtitle: "card2",
        tags: ["mountain", "bike"]
      },
      {
        title: "PaBuchrest",
        subtitle: "card3",
        tags: ["road", "highway"]
      },
      {
        title: "LonAltceva",
        subtitle: "card4",
        tags: ["historical"]
      }
    ];

    this.searchFilteredCards = this.allCards;
    this.tagFilteredCards = this.allCards;
    this.refreshFilters();
  }

  searchCardsByName(name: string): void {
    if (this.allCards) {
      this.searchFilteredCards = this.allCards.filter(card => card.title.toLowerCase().includes(name.toLowerCase()));
    }
    this.refreshFilters();
  }

  tagOnClick(tagName: string): void {
    if (this.isActive(tagName)) {
      this.removeTag(tagName);
      this.refreshTagFilters();
    } else {
      this.addTag(tagName);
      this.refreshTagFilters();
    }
    this.refreshFilters();
  }

  private addTag(tagName: string): void {
    this.activeTags.push(tagName);
  }

  private removeTag(tagName: string): void {
    const index = this.activeTags.indexOf(tagName);
    if (index != -1)
      this.activeTags.splice(index, 1);
  }

  private isActive(tagName: string): boolean {
    return this.activeTags.includes(tagName);
  }

  private refreshFilters(): void {
    this.filteredCards = this.searchFilteredCards?.filter(card => this.tagFilteredCards?.includes(card));
  }

  private refreshTagFilters(): void {
    if (this.activeTags.length != 0)
      this.tagFilteredCards = this.allCards?.filter(card => {
        return this.activeTags.every(tag => card.tags.includes(tag));
      });
    else
      this.tagFilteredCards = this.allCards;
  }
}
