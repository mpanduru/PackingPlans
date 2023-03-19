import {Component} from '@angular/core';
import {SlideInterface} from "../carousel/slide";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  slides: SlideInterface[] = [
    {url: '../../../assets/images/carousel1.jpg', title: 'beach'},
    {url: '../../../assets/images/carousel2.jpg', title: 'boat'},
    {url: '../../../assets/images/carousel3.jpg', title: 'beach'},
    {url: '../../../assets/images/carousel4.jpg', title: 'boat'},
    {url: '../../../assets/images/carousel5.jpg', title: 'beach'}
  ];

  fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
      style({opacity: 0}),
      animate('1000ms', style({opacity: 1}))
    ]),
    transition(':leave', [
      animate('1000ms', style({opacity: 0}))
    ])
  ]);
}
