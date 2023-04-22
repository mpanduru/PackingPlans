import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../services/locationService/location.service";
import {TagService} from "../../services/tagService/tag.service";

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


  constructor(private locationService: LocationService, private tagService: TagService) {
  }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe({
      next: cards => {
        this.allCards = cards;

        this.tagService.getAllTags().subscribe({
          next: tags => {
            this.tags = tags;
          }
        });

        this.searchFilteredCards = this.allCards;
        this.tagFilteredCards = this.allCards;
        this.refreshFilters();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  searchCardsByName(name: string): void {
    if (this.allCards) {
      this.searchFilteredCards = this.allCards.filter(card => card.name .toLowerCase().includes(name.toLowerCase()));
    }
    this.refreshFilters();
  }

  tagOnClick(tagName: string): void {
    if (this.isActive(tagName)) {
      this.removeTag(tagName);
      this.refreshTagFilters();
    } else {
      this.activateTag(tagName);
      this.refreshTagFilters();
    }
    this.refreshFilters();
  }

  private activateTag(tagName: string): void {
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
        return this.activeTags.every(tag => card.tagNames.includes(tag));
      });
    else
      this.tagFilteredCards = this.allCards;
  }
}
