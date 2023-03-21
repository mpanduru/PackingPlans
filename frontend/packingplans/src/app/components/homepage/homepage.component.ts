import {Component} from '@angular/core';
import {SlideInterface} from "../carousel/slide";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  slides: SlideInterface[] = [
    {url: '../../../assets/images/carousel1.jpg', title: 'hot air balloons'},
    {url: '../../../assets/images/carousel2.jpg', title: 'hiking'},
    {url: '../../../assets/images/carousel3.jpg', title: 'Tokyo'},
    {url: '../../../assets/images/carousel4.jpg', title: 'beach'},
    {url: '../../../assets/images/carousel5.jpg', title: 'Paris'}
  ];

}
