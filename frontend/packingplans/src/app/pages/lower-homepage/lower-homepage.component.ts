import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {DialogService} from "../../components/dialogService/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lower-homepage',
  templateUrl: './lower-homepage.component.html',
  styleUrls: ['./lower-homepage.component.css']
})
export class LowerHomepageComponent implements AfterViewInit {

  constructor(private dialogService: DialogService, private elementRef: ElementRef, private router: Router) {
  }

  ngAfterViewInit() {
    this.dialogService.scrollToHomePage$.subscribe(() => {
      this.scrollToHowItWorks();
    })
  }

  public scrollToHowItWorks() {
    const element = this.elementRef.nativeElement.querySelector('#how-it-works');
    element.scrollIntoView({behavior: 'smooth'});
  }

  scrollToNavbar() {
    this.router.navigate(['/home']);
    this.dialogService.triggerScrollToNavbar();
  }
}
